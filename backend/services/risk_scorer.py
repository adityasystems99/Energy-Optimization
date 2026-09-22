"""
ConstructIQ — Unified Risk Scorer Service
Aggregates insights across the 4 core AI modules:
- BIM Model Validator (clash count, fault rate, high severity anomalies)
- Cost Predictor (overrun probability, projected budget variance)
- Progress Tracker (delay probability, schedule slippage in days)
- Energy Optimizer (energy anomalies, power spikes, waste ratio)

Computes a weighted Composite Risk Index (0-100) and actionable drivers.
"""

from typing import Dict, Any, List

def calculate_unified_risk_score(
    bim_data: Dict[str, Any] = None,
    cost_data: Dict[str, Any] = None,
    progress_data: Dict[str, Any] = None,
    energy_data: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Computes unified composite risk score and per-pillar breakdowns.
    """
    # 1. BIM Risk Component (0-100)
    bim_score = 45.0  # default baseline
    bim_factors = []
    if bim_data:
        clash_summary = bim_data.get("clash_summary", {})
        total_clashes = clash_summary.get("total_clashes", 0)
        high_sev = clash_summary.get("high_severity", 0)
        flagged_count = len(bim_data.get("flagged_components", []))

        # Weight clashes and flagged items
        clash_risk = min(100.0, (total_clashes * 3.5) + (high_sev * 8.0))
        flag_risk = min(100.0, flagged_count * 2.5)
        bim_score = round(0.65 * clash_risk + 0.35 * flag_risk, 1)

        if high_sev > 0:
            bim_factors.append(f"{high_sev} critical high-severity geometric clashes detected")
        if total_clashes > 10:
            bim_factors.append(f"Elevated clash density ({total_clashes} total clashes)")
        if flagged_count > 15:
            bim_factors.append(f"{flagged_count} structural/MEP components flagged for review")

    # 2. Cost Risk Component (0-100)
    cost_score = 55.0
    cost_factors = []
    if cost_data:
        overrun_prob = cost_data.get("overrun_probability", 0.5)
        projected_overrun_pct = cost_data.get("projected_overrun_pct", 10.0)
        
        prob_risk = overrun_prob * 100.0
        pct_risk = min(100.0, max(0.0, projected_overrun_pct * 3.0))
        cost_score = round(0.6 * prob_risk + 0.4 * pct_risk, 1)

        if overrun_prob >= 0.65:
            cost_factors.append(f"High overrun probability ({round(overrun_prob * 100, 1)}%)")
        if projected_overrun_pct > 12:
            cost_factors.append(f"Projected cost variance exceeds budget by +{round(projected_overrun_pct, 1)}%")

    # 3. Schedule / Progress Risk Component (0-100)
    progress_score = 50.0
    progress_factors = []
    if progress_data:
        delay_prob = progress_data.get("delay_probability", 0.4)
        schedule_slippage_days = progress_data.get("schedule_slippage_days", 5)
        percent_gap = progress_data.get("completion_gap_pct", 4.0)

        slippage_risk = min(100.0, schedule_slippage_days * 8.0)
        prob_risk = delay_prob * 100.0
        gap_risk = min(100.0, percent_gap * 7.0)
        progress_score = round(0.4 * prob_risk + 0.4 * slippage_risk + 0.2 * gap_risk, 1)

        if schedule_slippage_days > 4:
            progress_factors.append(f"Critical path is {schedule_slippage_days} days behind scheduled baseline")
        if delay_prob >= 0.6:
            progress_factors.append(f"High likelihood of cascade schedule delays ({round(delay_prob * 100, 1)}%)")

    # 4. Energy Risk Component (0-100)
    energy_score = 30.0
    energy_factors = []
    if energy_data:
        anomaly_count = energy_data.get("anomaly_count", 0)
        waste_ratio = energy_data.get("potential_savings_kwh_pct", 12.0)
        
        anom_risk = min(100.0, anomaly_count * 15.0)
        waste_risk = min(100.0, waste_ratio * 3.0)
        energy_score = round(0.55 * anom_risk + 0.45 * waste_risk, 1)

        if anomaly_count > 0:
            energy_factors.append(f"{anomaly_count} equipment power telemetry anomalies flagged")
        if waste_ratio > 15:
            energy_factors.append(f"Unoptimized standby power draw ({round(waste_ratio, 1)}% potential savings)")

    # Composite weights: Cost (35%), Schedule (30%), BIM (25%), Energy (10%)
    weights = {
        "cost": 0.35,
        "progress": 0.30,
        "bim": 0.25,
        "energy": 0.10
    }

    composite_score = round(
        weights["cost"] * cost_score +
        weights["progress"] * progress_score +
        weights["bim"] * bim_score +
        weights["energy"] * energy_score,
        1
    )

    # Determine risk tier
    if composite_score >= 70.0:
        risk_level = "CRITICAL"
        risk_color = "#ef4444"
        summary = "Project exhibits severe compounding risks across budget and schedule milestones."
    elif composite_score >= 50.0:
        risk_level = "HIGH"
        risk_color = "#f97316"
        summary = "Elevated risk profile requiring immediate proactive coordination and mitigation."
    elif composite_score >= 30.0:
        risk_level = "MODERATE"
        risk_color = "#eab308"
        summary = "Manageable variances observed. Close monitoring advised on key drivers."
    else:
        risk_level = "LOW"
        risk_color = "#22c55e"
        summary = "Project operating well within acceptable tolerances across all parameters."

    # Identify primary risk driver
    scores = {
        "Cost & Budget": cost_score,
        "Schedule & Progress": progress_score,
        "BIM & Geometry": bim_score,
        "Site Energy & Equipment": energy_score
    }
    primary_driver = max(scores.items(), key=lambda x: x[1])

    # Top recommended mitigations
    recommended_actions: List[Dict[str, str]] = []
    if cost_score >= 60:
        recommended_actions.append({
            "domain": "Cost",
            "priority": "HIGH",
            "action": "Trigger procurement audit on high-variance subcontract packages.",
            "impact": "Mitigates further cost trajectory drift."
        })
    if progress_score >= 50:
        recommended_actions.append({
            "domain": "Schedule",
            "priority": "HIGH",
            "action": "Reallocate secondary trade crews to critical path path-shortening activities.",
            "impact": f"Target recovery of ~{progress_data.get('schedule_slippage_days', 4)} lost working days."
        })
    if bim_score >= 50:
        recommended_actions.append({
            "domain": "BIM",
            "priority": "CRITICAL",
            "action": "Convene emergency trade coordination session for MEP / Structural clashes.",
            "impact": "Prevents costly on-site demolition and rework."
        })
    if energy_score >= 40:
        recommended_actions.append({
            "domain": "Energy",
            "priority": "MEDIUM",
            "action": "Implement automated non-operational standby shutdown protocol on heavy equipment.",
            "impact": "Immediately reduces daily power footprint and equipment wear."
        })

    if not recommended_actions:
        recommended_actions.append({
            "domain": "General",
            "priority": "LOW",
            "action": "Maintain routine site telemetry monitoring and weekly BIM model refresh.",
            "impact": "Keeps project variance in low-risk envelope."
        })

    return {
        "composite_score": composite_score,
        "risk_level": risk_level,
        "risk_color": risk_color,
        "summary": summary,
        "primary_driver": {
            "name": primary_driver[0],
            "score": primary_driver[1]
        },
        "breakdown": {
            "bim": {
                "score": bim_score,
                "weight": weights["bim"],
                "factors": bim_factors
            },
            "cost": {
                "score": cost_score,
                "weight": weights["cost"],
                "factors": cost_factors
            },
            "progress": {
                "score": progress_score,
                "weight": weights["progress"],
                "factors": progress_factors
            },
            "energy": {
                "score": energy_score,
                "weight": weights["energy"],
                "factors": energy_factors
            }
        },
        "recommendations": recommended_actions
    }
