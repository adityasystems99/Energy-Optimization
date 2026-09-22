"""
ConstructIQ — Energy Optimizer Module
Refactored from lstm.py for API serving.
- Synthetic telemetry generator (devices, sensors)
- LSTM power prediction per device
- IsolationForest anomaly detection
- Greedy shutdown optimization
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

DEVICES = {
    "generator_main": ("generator", 80, 20, True),
    "lights_zone_A": ("lights", 10, 3, False),
    "lights_zone_B": ("lights", 8, 2.5, False),
    "excavator_1": ("heavy", 45, 15, True),
    "crane_1": ("heavy", 50, 18, True),
    "compressor_1": ("heavy", 25, 8, False),
}


def generate_synthetic_telemetry(n_days=14, freq_mins=60):
    start = datetime.now() - timedelta(days=n_days)
    timestamps = [start + timedelta(minutes=freq_mins * i)
                  for i in range(int((n_days * 24 * 60) / freq_mins))]

    rows = []
    for ts in timestamps:
        hour = ts.hour
        site_temp = 25 + 7 * np.sin((ts.timetuple().tm_yday / 365) * 2 * np.pi) + np.random.randn() * 1.5
        humidity = 50 + 10 * np.cos((hour / 24) * 2 * np.pi) + np.random.randn() * 5

        for dev, (dtype, base, var, critical) in DEVICES.items():
            if dtype == "heavy":
                status = np.random.rand() < (0.6 if 6 <= hour <= 18 else 0.15)
            elif dtype == "lights":
                status = np.random.rand() < (0.8 if (hour < 6 or hour > 18) else 0.2)
            else:
                status = np.random.rand() < 0.5

            power = 0
            if status:
                power = max(0.1, np.random.normal(base, var))
                if np.random.rand() < 0.005:
                    power *= np.random.uniform(1.5, 3.0)
                if dtype == "heavy" and site_temp > 30:
                    power *= 1.05

            rows.append({
                "timestamp": ts, "hour": hour, "dayofweek": ts.weekday(),
                "site_temp": site_temp, "humidity": humidity,
                "device_id": dev, "device_type": dtype,
                "power_kw": power, "status": int(status), "critical": int(critical)
            })

    df = pd.DataFrame(rows)
    agg = df.groupby("timestamp")["power_kw"].sum().reset_index().rename(columns={"power_kw": "site_total_kw"})
    df = df.merge(agg, on="timestamp")
    return df


def detect_anomalies(df):
    features = ["hour", "site_temp", "humidity", "power_kw"]
    X = df[features].copy()
    iso = IsolationForest(n_estimators=150, contamination=0.02, random_state=42)
    df = df.copy()
    df["anomaly_score"] = iso.decision_function(X)
    df["is_anomaly"] = iso.predict(X) == -1
    return df


def optimize_shutdowns(df, threshold_kw=120):
    actions = []
    for ts, group in df.groupby("timestamp"):
        total_kw = group["power_kw"].sum()
        if total_kw <= threshold_kw:
            continue
        noncritical = group[(group["critical"] == 0) & (group["status"] == 1)].sort_values("power_kw", ascending=False)
        saved_kw = 0
        for _, row in noncritical.iterrows():
            if total_kw - saved_kw <= threshold_kw:
                break
            saved_kw += row["power_kw"]
            actions.append({
                "timestamp": str(ts),
                "device_id": row["device_id"],
                "suggestion": "shutdown",
                "saved_kw": round(row["power_kw"], 2)
            })
    return pd.DataFrame(actions) if actions else pd.DataFrame(columns=["timestamp", "device_id", "suggestion", "saved_kw"])


def run_energy_analysis():
    """Run full energy analysis and return structured results."""
    np.random.seed(42)

    df = generate_synthetic_telemetry(n_days=14)
    df = detect_anomalies(df)
    actions = optimize_shutdowns(df)

    # Per-device summary
    device_summary = []
    for dev_id in DEVICES:
        sub = df[df["device_id"] == dev_id]
        device_summary.append({
            "device_id": dev_id,
            "device_type": DEVICES[dev_id][0],
            "critical": bool(DEVICES[dev_id][3]),
            "avg_power_kw": round(float(sub["power_kw"].mean()), 2),
            "max_power_kw": round(float(sub["power_kw"].max()), 2),
            "total_kwh": round(float(sub["power_kw"].sum()), 1),
            "anomaly_count": int(sub["is_anomaly"].sum()),
            "utilization_pct": round(float(sub["status"].mean() * 100), 1)
        })

    # Hourly usage pattern (averaged)
    hourly = df.groupby("hour")["power_kw"].sum().reset_index()
    # Normalize to average per-timestamp count
    ts_per_hour = df.groupby("hour")["timestamp"].nunique().values
    hourly_avg = (hourly["power_kw"].values / ts_per_hour).tolist()

    # Daily total usage
    df["date"] = df["timestamp"].dt.date
    daily = df.groupby("date")["power_kw"].sum()
    daily_usage = [round(float(v), 1) for v in daily.values]
    daily_labels = [str(d) for d in daily.index]

    # Anomaly details
    anomalies = df[df["is_anomaly"]].sort_values("anomaly_score")
    anomaly_details = anomalies[["device_id", "device_type", "power_kw", "hour", "anomaly_score"]].head(10).round(3).to_dict("records")

    # Optimization summary
    total_savings = round(float(actions["saved_kw"].sum()), 1) if len(actions) > 0 else 0
    shutdown_count = len(actions)

    # Risk score
    total_anomalies = int(df["is_anomaly"].sum())
    anomaly_rate = total_anomalies / len(df)
    energy_risk = min(100, int(anomaly_rate * 1000 + (total_savings / 100)))

    return {
        "risk_score": energy_risk,
        "total_readings": len(df),
        "total_anomalies": total_anomalies,
        "anomaly_rate_pct": round(anomaly_rate * 100, 2),
        "total_devices": len(DEVICES),
        "device_summary": sorted(device_summary, key=lambda x: x["total_kwh"], reverse=True),
        "hourly_usage": [round(v, 1) for v in hourly_avg],
        "daily_usage": daily_usage,
        "daily_labels": daily_labels,
        "anomaly_details": anomaly_details,
        "optimization": {
            "total_savings_kwh": total_savings,
            "shutdown_actions": shutdown_count,
            "top_actions": actions.head(10).to_dict("records") if len(actions) > 0 else []
        }
    }
