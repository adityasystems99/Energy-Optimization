"""
ConstructIQ — BIM Model Validator Module
Refactored from BIMmodelvalidator.py for API serving.
- Synthetic BIM generator
- AABB clash detection
- Feature engineering
- RandomForest classifier (static features)
- LSTM on edit-history (fault prediction)
- IsolationForest anomaly detection
- Unified scoring & action recommendations
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score

RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)
random.seed(RANDOM_SEED)

# Try importing TF; fall back gracefully
try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense, Dropout, Masking
    from tensorflow.keras.callbacks import EarlyStopping
    tf.random.set_seed(RANDOM_SEED)
    HAS_TF = True
except ImportError:
    HAS_TF = False


def generate_synthetic_bim(n_components=800, max_edits=12, project_days=120):
    types = ["wall", "column", "beam", "duct", "pipe", "window", "door", "slab"]
    materials = ["concrete", "steel", "wood", "glass", "gyp", "insulation"]
    trades = ["structural", "MEP", "architectural"]
    components = []
    start_time = datetime.now() - timedelta(days=project_days)

    def rand_box():
        x1 = random.uniform(0, 90)
        y1 = random.uniform(0, 90)
        z1 = random.uniform(0, 20)
        dx = random.uniform(0.5, 8.0)
        dy = random.uniform(0.5, 8.0)
        dz = random.uniform(0.2, 4.0)
        return (x1, y1, z1, x1 + dx, y1 + dy, z1 + dz)

    for i in range(n_components):
        ctype = random.choice(types)
        material = random.choice(materials)
        trade = random.choice(trades)
        level = random.randint(0, 10)
        bbox = rand_box()
        zshift = level * 2.8
        bbox = (bbox[0], bbox[1], bbox[2] + zshift, bbox[3], bbox[4], bbox[5] + zshift)
        creation = start_time + timedelta(days=random.uniform(0, project_days))
        n_edits = random.randint(1, max_edits)
        edits = []
        for e in range(n_edits):
            ts = creation + timedelta(days=random.uniform(0, project_days - (creation - start_time).days))
            status = random.choices([1, 2, 0], weights=[0.8, 0.15, 0.05])[0]
            thickness = random.uniform(0.1, 1.0) if ctype in ("wall", "slab") else random.uniform(0.05, 0.5)
            offset = random.uniform(-0.3, 0.3)
            edits.append({"ts": ts, "status": status, "thickness": thickness, "offset": offset})
        components.append({
            "component_id": f"C{i:04d}",
            "type": ctype, "material": material, "trade": trade,
            "level": level, "bbox": bbox, "creation": creation,
            "edits": sorted(edits, key=lambda x: x["ts"])
        })

    n_faults = int(0.12 * n_components)
    faulty_indices = random.sample(range(n_components), n_faults)
    labels = np.zeros(n_components, dtype=int)
    fault_reasons = [None] * n_components

    for idx in faulty_indices[:int(0.5 * n_faults)]:
        other = random.choice([j for j in range(n_components) if j != idx])
        ax = components[idx]
        bx = components[other]
        b = bx["bbox"]
        ax_w = ax["bbox"][3] - ax["bbox"][0]
        ax_h = ax["bbox"][4] - ax["bbox"][1]
        ax_d = ax["bbox"][5] - ax["bbox"][2]
        cx = (b[0] + b[3]) / 2 + random.uniform(-0.5, 0.5)
        cy = (b[1] + b[4]) / 2 + random.uniform(-0.5, 0.5)
        cz = (b[2] + b[5]) / 2 + random.uniform(-0.5, 0.5)
        components[idx]["bbox"] = (cx - ax_w / 2, cy - ax_h / 2, cz - ax_d / 2,
                                   cx + ax_w / 2, cy + ax_h / 2, cz + ax_d / 2)
        labels[idx] = 1
        fault_reasons[idx] = "injected_clash"

    for idx in faulty_indices[int(0.5 * n_faults):int(0.8 * n_faults)]:
        components[idx]["level"] = components[idx]["level"] + random.choice([-2, -1, 1, 2])
        labels[idx] = 1
        fault_reasons[idx] = "level_mismatch"

    for idx in faulty_indices[int(0.8 * n_faults):]:
        if components[idx]["type"] in ("window", "door"):
            labels[idx] = 1
            fault_reasons[idx] = "unsupported_opening"

    for i, comp in enumerate(components):
        comp["faulty"] = int(labels[i])
        comp["fault_reason"] = fault_reasons[i]

    return components


def aabb_overlap(a, b):
    return (a[0] < b[3]) and (a[3] > b[0]) and \
           (a[1] < b[4]) and (a[4] > b[1]) and \
           (a[2] < b[5]) and (a[5] > b[2])


def detect_all_clashes(components):
    clashes = []
    n = len(components)
    for i in range(n):
        a = components[i]["bbox"]
        for j in range(i + 1, n):
            b = components[j]["bbox"]
            if aabb_overlap(a, b):
                clashes.append((components[i]["component_id"], components[j]["component_id"]))
    return clashes


def components_to_dataframe(components):
    rows = []
    for comp in components:
        xmin, ymin, zmin, xmax, ymax, zmax = comp["bbox"]
        vol = max(0, (xmax - xmin) * (ymax - ymin) * (zmax - zmin))
        n_edits = len(comp["edits"])
        avg_thickness = np.mean([e["thickness"] for e in comp["edits"]]) if n_edits > 0 else 0.0
        avg_offset = np.mean([e["offset"] for e in comp["edits"]]) if n_edits > 0 else 0.0
        rows.append({
            "component_id": comp["component_id"],
            "type": comp["type"], "material": comp["material"], "trade": comp["trade"],
            "level": comp["level"], "vol": vol,
            "cx": (xmin + xmax) / 2, "cy": (ymin + ymax) / 2, "cz": (zmin + zmax) / 2,
            "age_days": (datetime.now() - comp["creation"]).days,
            "n_edits": n_edits, "avg_thickness": avg_thickness, "avg_offset": avg_offset,
            "faulty": comp["faulty"], "fault_reason": comp["fault_reason"]
        })
    df = pd.DataFrame(rows)
    df = pd.get_dummies(df, columns=["type", "material", "trade"], drop_first=True)
    return df


def prepare_edit_sequences(components, seq_len=8):
    X, y, ids = [], [], []
    for comp in components:
        edits = comp["edits"]
        seq = []
        for ed in edits[-seq_len:]:
            seq.append([ed.get("thickness", 0.0), ed.get("offset", 0.0), ed.get("status", 1)])
        if len(seq) < seq_len:
            pad = [[0.0, 0.0, 0.0]] * (seq_len - len(seq))
            seq = pad + seq
        X.append(seq)
        y.append(comp["faulty"])
        ids.append(comp["component_id"])
    return np.array(X, dtype=float), np.array(y, dtype=int), ids


def run_bim_analysis(n_components=400):
    """Run the complete BIM analysis pipeline and return structured results."""
    np.random.seed(RANDOM_SEED)
    random.seed(RANDOM_SEED)

    comps = generate_synthetic_bim(n_components=n_components, max_edits=12, project_days=120)
    clashes = detect_all_clashes(comps)
    df = components_to_dataframe(comps)

    # Train RF classifier
    X_static = df.drop(columns=["component_id", "faulty", "fault_reason"])
    y_static = df["faulty"].values
    X_train, X_test, y_train, y_test = train_test_split(
        X_static, y_static, test_size=0.2, random_state=RANDOM_SEED, stratify=y_static
    )
    rf = RandomForestClassifier(n_estimators=100, random_state=RANDOM_SEED, n_jobs=-1)
    rf.fit(X_train, y_train)
    rf_probs = rf.predict_proba(X_static)[:, 1]
    df["rf_prob"] = rf_probs

    # Anomaly detection
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X_static)
    iso = IsolationForest(n_estimators=100, contamination=0.03, random_state=RANDOM_SEED)
    iso.fit(Xs)
    df["anomaly_score"] = iso.decision_function(Xs)
    df["is_anomaly"] = (iso.predict(Xs) == -1).astype(int)

    # Unified score (RF only if no TF, else average)
    df["unified_score"] = df["rf_prob"]

    # Suggested actions
    df["suggested_action"] = df.apply(
        lambda r: "ESCALATE" if (r["unified_score"] > 0.7 or r["is_anomaly"] == 1)
        else ("REVIEW" if r["unified_score"] > 0.4 else "OK"), axis=1
    )

    # Clash mapping
    clash_dict = {}
    for a, b in clashes:
        clash_dict.setdefault(a, []).append(b)
        clash_dict.setdefault(b, []).append(a)
    df["detected_clashes"] = df["component_id"].map(lambda cid: clash_dict.get(cid, []))

    # Per-floor clash summary
    floor_clashes = {}
    for comp in comps:
        cid = comp["component_id"]
        level = comp["level"]
        if cid in clash_dict:
            floor_clashes.setdefault(level, {"clashes": 0, "components": []})
            floor_clashes[level]["clashes"] += len(clash_dict[cid])
            floor_clashes[level]["components"].append(cid)
    # Deduplicate counts (each clash counted twice)
    for level in floor_clashes:
        floor_clashes[level]["clashes"] = floor_clashes[level]["clashes"] // 2

    # Flagged components
    flagged = df[df["suggested_action"] != "OK"].sort_values("unified_score", ascending=False)

    # Risk score for BIM domain (0-100)
    total_comps = len(df)
    escalated = len(df[df["suggested_action"] == "ESCALATE"])
    review = len(df[df["suggested_action"] == "REVIEW"])
    bim_risk = min(100, int((escalated * 3 + review * 1.5) / total_comps * 100 + len(clashes) * 0.5))

    return {
        "risk_score": bim_risk,
        "total_components": total_comps,
        "total_clashes": len(clashes),
        "anomalies_detected": int(df["is_anomaly"].sum()),
        "escalated_count": escalated,
        "review_count": review,
        "ok_count": int(len(df[df["suggested_action"] == "OK"])),
        "floor_clashes": [
            {"floor": k, "clash_count": v["clashes"],
             "severity": "HIGH" if v["clashes"] > 8 else ("MEDIUM" if v["clashes"] > 3 else "LOW")}
            for k, v in sorted(floor_clashes.items(), key=lambda x: x[1]["clashes"], reverse=True)
        ],
        "flagged_components": flagged[["component_id", "unified_score", "suggested_action", "is_anomaly"]].head(15).to_dict("records"),
        "score_distribution": {
            "bins": list(np.histogram(df["unified_score"], bins=20)[1].round(3)),
            "counts": list(map(int, np.histogram(df["unified_score"], bins=20)[0]))
        }
    }
