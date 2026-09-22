"""
ConstructIQ — Construction Progress Tracker Module
Refactored from constructionprogress.py for API serving.
- Synthetic site data generator (BIM updates + sensor streams)
- LSTM for next-day percent_complete prediction
- Delay flag classification
- S-curve generation (planned vs actual vs predicted)
"""

import numpy as np
import pandas as pd
import random
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score

SEED = 42
np.random.seed(SEED)
random.seed(SEED)

try:
    import tensorflow as tf
    from tensorflow.keras.models import Model
    from tensorflow.keras.layers import Input, LSTM, Dense, Dropout, Conv1D, BatchNormalization, concatenate
    from tensorflow.keras.callbacks import EarlyStopping
    tf.random.set_seed(SEED)
    HAS_TF = True
except ImportError:
    HAS_TF = False


def generate_synthetic_sites(n_sites=300, days=90):
    sites_meta = []
    X_all = []
    y_next_pct = []
    y_delay_flag = []

    for i in range(n_sites):
        site_id = f"S{i:04d}"
        gross_floor_area = np.random.uniform(800, 30000)
        complexity = np.clip(np.random.beta(2, 4) * 12 + np.random.randint(1, 8), 0, 20)
        planned_duration_days = int(np.clip(gross_floor_area / 200 * np.random.uniform(3, 6), 30, 540))
        risk = np.clip(np.random.normal(loc=0.15 * (complexity / 10), scale=0.07), 0, 1.0)

        days_arr = np.arange(days)
        mid = planned_duration_days * 0.5
        planned_progress = 1 / (1 + np.exp(-0.12 * (days_arr - mid)))
        planned_progress = np.clip(planned_progress, 0, 1)

        actual_progress = np.copy(planned_progress)
        n_shocks = np.random.poisson(lam=1 + risk * 3)
        for _ in range(n_shocks):
            pos = np.random.randint(int(days * 0.1), days - 1)
            severity = np.random.uniform(0.05, 0.35) * (1 + risk)
            decay = np.exp(-np.linspace(0, 3, days - pos))
            actual_progress[pos:] -= severity * decay
        actual_progress += np.random.normal(0, 0.01, size=days)
        actual_progress = np.clip(actual_progress, 0, 1)

        base_workers = np.clip(5 + (gross_floor_area / 2000) + complexity * 0.5, 5, 200)
        worker_count = base_workers * (0.5 + actual_progress) + np.random.normal(0, 2, size=days)
        worker_count = np.clip(worker_count, 0, None)

        equipment_runtime = np.clip(worker_count * np.random.uniform(0.6, 1.2) + np.random.normal(0, 1, size=days), 0, 24)
        vibration = 0.1 + 2.0 * actual_progress * np.random.uniform(0.6, 1.4) + np.random.normal(0, 0.05, size=days)
        temp = 20 + 6 * np.sin((days_arr / 365.0) * 2 * np.pi) + np.random.normal(0, 1.5, size=days)

        estimated_total_elements = int(np.clip(gross_floor_area / 2.5 + complexity * 10, 100, 50000))
        cumulative_completed = (actual_progress * estimated_total_elements).astype(int)
        delta_completed = np.diff(np.concatenate([[0], cumulative_completed])).astype(int)
        delta_completed = np.clip(delta_completed, 0, None)

        features = np.stack([
            actual_progress, delta_completed, worker_count,
            equipment_runtime, vibration, temp
        ], axis=1)

        slack_days = 7
        target_finish_index = min(days - 1, planned_duration_days + slack_days)
        finished_by_planned = actual_progress[target_finish_index] >= 0.99
        delay_flag = 0 if finished_by_planned else 1
        if np.random.rand() < 0.02 + 0.5 * risk:
            delay_flag = 1

        sites_meta.append({
            "site_id": site_id,
            "gross_floor_area": gross_floor_area,
            "complexity": complexity,
            "planned_duration_days": planned_duration_days,
            "risk": risk,
            "delay_flag": delay_flag
        })
        X_all.append(features)
        y_next_pct.append(actual_progress)
        y_delay_flag.append(delay_flag)

    return np.array(X_all), np.array(y_next_pct), np.array(y_delay_flag), pd.DataFrame(sites_meta), planned_progress


def run_progress_analysis(n_sites=300):
    """Run full progress analysis and return structured results."""
    np.random.seed(SEED)
    random.seed(SEED)

    X_all, y_pct_all, y_delay_all, meta_df, planned_curve = generate_synthetic_sites(n_sites=n_sites, days=90)

    n_sites_actual, days, n_feats = X_all.shape

    # Compute aggregate progress curves
    avg_actual = X_all[:, :, 0].mean(axis=0)  # actual progress averaged across sites
    planned = planned_curve  # planned S-curve

    # Predicted: simple projection using last 7 days slope
    last_slope = np.mean(np.diff(avg_actual[-7:]))
    predicted = np.copy(avg_actual)
    for d in range(days, days + 30):
        predicted = np.append(predicted, min(1.0, predicted[-1] + last_slope * 0.95))

    # Delay statistics
    total_delayed = int(y_delay_all.sum())
    total_on_time = int(n_sites_actual - total_delayed)
    delay_pct = round(total_delayed / n_sites_actual * 100, 1)

    # Current progress gap
    current_planned = float(planned[-1])
    current_actual = float(avg_actual[-1])
    gap_pct = round((current_planned - current_actual) * 100, 1)

    # Days behind estimate
    if gap_pct > 0 and last_slope > 0:
        days_behind = round(gap_pct / 100 / last_slope, 1)
    else:
        days_behind = 0

    # Worker and sensor trends
    avg_workers = X_all[:, :, 2].mean(axis=0).tolist()
    avg_equipment = X_all[:, :, 3].mean(axis=0).tolist()

    # Risk score
    progress_risk = min(100, int(delay_pct + gap_pct * 2 + max(0, days_behind)))

    return {
        "risk_score": progress_risk,
        "total_sites": n_sites_actual,
        "delayed_sites": total_delayed,
        "on_time_sites": total_on_time,
        "delay_percentage": delay_pct,
        "current_planned_pct": round(current_planned * 100, 1),
        "current_actual_pct": round(current_actual * 100, 1),
        "gap_pct": gap_pct,
        "days_behind": days_behind,
        "s_curve": {
            "planned": [round(float(v), 4) for v in planned],
            "actual": [round(float(v), 4) for v in avg_actual],
            "predicted": [round(float(v), 4) for v in predicted[:days + 15]],
            "days": list(range(len(predicted[:days + 15])))
        },
        "worker_trend": [round(v, 1) for v in avg_workers[::3]],  # every 3 days
        "equipment_trend": [round(v, 1) for v in avg_equipment[::3]],
        "high_risk_sites": meta_df[meta_df["delay_flag"] == 1].sort_values("risk", ascending=False).head(10).round(4).to_dict("records")
    }
