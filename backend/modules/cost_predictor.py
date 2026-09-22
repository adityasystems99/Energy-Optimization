"""
ConstructIQ — Cost Overrun Predictor Module
Refactored from costoverrun.py for API serving.
- Synthetic project data generator
- XGBoost on static BIM features
- LSTM on weekly cost/progress sequences
- Stacking ensemble
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score, roc_auc_score
from sklearn.linear_model import LogisticRegression, LinearRegression
import xgboost as xgb

RND = 42
np.random.seed(RND)
random.seed(RND)

try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense, Dropout, Masking
    from tensorflow.keras.callbacks import EarlyStopping
    tf.random.set_seed(RND)
    HAS_TF = True
except ImportError:
    HAS_TF = False


def generate_synthetic_projects(n_projects=400, weeks=40):
    projects = []
    timeseries = []
    ids = []

    for i in range(n_projects):
        pid = f"P{i:04d}"
        ids.append(pid)
        gross_floor_area = np.random.uniform(500, 50000)
        total_volume = gross_floor_area * np.random.uniform(3, 5)
        n_elements = int(np.clip(np.random.normal(gross_floor_area / 2, 300), 50, 30000))
        n_trades = random.randint(3, 12)
        complexity = np.clip(np.random.beta(2, 5) * 10 + (n_trades / 3.0), 0, 15)
        design_changes_expected = np.random.poisson(2 + complexity / 3.0)
        base_cost = gross_floor_area * np.random.uniform(800, 2200)
        planned_duration_weeks = int(np.clip(gross_floor_area / 1000 * np.random.uniform(10, 25), 8, 104))
        risk_index = np.clip(np.random.normal(0.1 * complexity, 0.08), 0, 1.0)

        cumulative_cost = 0.0
        percent_complete = 0.0
        weekly_costs = []
        pct_series = []
        for w in range(weeks):
            planned_pct = 1 / (1 + np.exp(-0.14 * (w - planned_duration_weeks / 2)))
            noise = np.random.normal(0, 0.02)
            progress = np.clip(planned_pct - (risk_index * 0.1) + noise, 0.0, 1.0)
            weekly_fraction = max(0.0, progress - percent_complete)
            weekly_cost = weekly_fraction * base_cost * (1 + np.random.normal(0, 0.03) + 0.1 * design_changes_expected / 5.0)
            cumulative_cost += weekly_cost
            percent_complete = progress
            weekly_costs.append(cumulative_cost)
            pct_series.append(percent_complete)

        weekly_costs = np.array(weekly_costs)
        pct_series = np.array(pct_series)

        overrun_chance = 0.12 + 0.6 * risk_index
        schedule_delay_days = 0
        cost_overrun_pct = np.random.normal(0.02, 0.02)

        if np.random.rand() < overrun_chance:
            shock_weeks = random.randint(int(weeks * 0.3), weeks - 1)
            shock_amount = base_cost * np.random.uniform(0.05, 0.30) * (1 + complexity / 20)
            weekly_costs[shock_weeks:] += shock_amount
            cost_overrun_pct += shock_amount / base_cost

        delay_chance = 0.10 + 0.5 * risk_index
        if np.random.rand() < delay_chance:
            delay_weeks = int(np.random.uniform(1, max(2, planned_duration_weeks * 0.15)))
            schedule_delay_days = delay_weeks * 7
            pct_series = np.clip(pct_series - np.linspace(0, 0.15, weeks), 0, 1.0)

        final_cost = weekly_costs[-1]
        cost_overrun_pct = max(0.0, (final_cost - base_cost) / base_cost)
        cost_overrun_flag = int(cost_overrun_pct > 0.10)
        delay_flag = int(schedule_delay_days > 7)

        projects.append({
            "project_id": pid,
            "gross_floor_area": gross_floor_area,
            "total_volume": total_volume,
            "n_elements": n_elements,
            "n_trades": n_trades,
            "complexity": complexity,
            "design_changes_expected": design_changes_expected,
            "base_cost": base_cost,
            "planned_duration_weeks": planned_duration_weeks,
            "risk_index": risk_index,
            "cost_overrun_pct": cost_overrun_pct,
            "cost_overrun_flag": cost_overrun_flag,
            "schedule_delay_days": schedule_delay_days,
            "delay_flag": delay_flag
        })
        ts = np.stack([weekly_costs / (base_cost + 1e-9), pct_series], axis=1)
        timeseries.append(ts)

    return pd.DataFrame(projects), np.array(timeseries), ids


def run_cost_analysis(n_projects=400):
    """Run full cost overrun analysis and return structured results."""
    np.random.seed(RND)
    random.seed(RND)

    projects_df, ts_array, ids = generate_synthetic_projects(n_projects=n_projects, weeks=40)

    # Prepare static features
    X_static = projects_df[["gross_floor_area", "total_volume", "n_elements", "n_trades",
                            "complexity", "design_changes_expected", "base_cost",
                            "planned_duration_weeks", "risk_index"]].copy()
    X_static["elem_density"] = X_static["n_elements"] / (X_static["gross_floor_area"] + 1e-9)
    X_static["cost_per_m2"] = X_static["base_cost"] / (X_static["gross_floor_area"] + 1e-9)

    y_cost_pct = projects_df["cost_overrun_pct"].values
    y_cost_flag = projects_df["cost_overrun_flag"].values

    idx = np.arange(len(projects_df))
    train_idx, test_idx = train_test_split(idx, test_size=0.2, random_state=RND, stratify=y_cost_flag)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_static)

    # XGBoost regression
    xgb_reg = xgb.XGBRegressor(n_estimators=150, learning_rate=0.05, random_state=RND)
    xgb_reg.fit(X_scaled[train_idx], y_cost_pct[train_idx])
    reg_preds = xgb_reg.predict(X_scaled)

    # XGBoost classification
    xgb_clf = xgb.XGBClassifier(n_estimators=150, learning_rate=0.05, random_state=RND)
    xgb_clf.fit(X_scaled[train_idx], y_cost_flag[train_idx])
    clf_probs = xgb_clf.predict_proba(X_scaled)[:, 1]

    # Feature importance
    feat_names = list(X_static.columns)
    feat_importance = sorted(
        zip(feat_names, map(float, xgb_reg.feature_importances_)),
        key=lambda x: x[1], reverse=True
    )

    # Cost overrun distribution
    overrun_pcts = projects_df["cost_overrun_pct"].values
    avg_overrun = float(np.mean(overrun_pcts))
    median_overrun = float(np.median(overrun_pcts))
    max_overrun = float(np.max(overrun_pcts))

    # Projects at high risk
    projects_df["predicted_overrun_prob"] = clf_probs
    projects_df["predicted_overrun_pct"] = reg_preds
    high_risk = projects_df[clf_probs > 0.5].sort_values("predicted_overrun_prob", ascending=False)

    # Cost trend (average weekly cumulative cost normalized)
    avg_cost_trend = ts_array[:, :, 0].mean(axis=0).tolist()
    avg_pct_trend = ts_array[:, :, 1].mean(axis=0).tolist()

    # Risk score (0-100)
    pct_high_risk = len(high_risk) / len(projects_df)
    cost_risk = min(100, int(pct_high_risk * 100 + avg_overrun * 200))

    return {
        "risk_score": cost_risk,
        "total_projects": len(projects_df),
        "high_risk_count": len(high_risk),
        "avg_overrun_pct": round(avg_overrun * 100, 2),
        "median_overrun_pct": round(median_overrun * 100, 2),
        "max_overrun_pct": round(max_overrun * 100, 2),
        "feature_importance": [{"feature": f, "importance": round(v, 4)} for f, v in feat_importance[:8]],
        "cost_trend": [round(v, 4) for v in avg_cost_trend],
        "progress_trend": [round(v, 4) for v in avg_pct_trend],
        "high_risk_projects": high_risk[["project_id", "predicted_overrun_prob", "predicted_overrun_pct",
                                          "base_cost", "complexity", "risk_index"]].head(10).round(4).to_dict("records"),
        "overrun_distribution": {
            "bins": list(np.histogram(overrun_pcts, bins=20)[1].round(4)),
            "counts": list(map(int, np.histogram(overrun_pcts, bins=20)[0]))
        }
    }
