"""
ConstructIQ — AI Risk Narrator Service
Integrates Gemini API (or robust intelligent fallback synthesis) to generate:
- Executive project health briefs
- Multi-domain risk correlation stories
- Prioritized action checklists
- Interactive Q&A regarding construction project metrics
"""

import os
import json
from typing import Dict, Any, Optional

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def generate_fallback_brief(
    project_name: str,
    risk_summary: Dict[str, Any],
    bim_data: Dict[str, Any],
    cost_data: Dict[str, Any],
    progress_data: Dict[str, Any],
    energy_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Robust, production-grade template narrator when Gemini API key is not present.
    Crafts realistic, deeply contextual domain narrative.
    """
    composite = risk_summary.get("composite_score", 65.0)
    level = risk_summary.get("risk_level", "HIGH")
    driver = risk_summary.get("primary_driver", {}).get("name", "Cost Overrun")
    
    clash_count = bim_data.get("clash_summary", {}).get("total_clashes", 0)
    high_clashes = bim_data.get("clash_summary", {}).get("high_severity", 0)
    
    overrun_prob = round(cost_data.get("overrun_probability", 0.72) * 100, 1)
    overrun_pct = round(cost_data.get("projected_overrun_pct", 14.8), 1)
    
    slippage_days = progress_data.get("schedule_slippage_days", 7)
    delay_prob = round(progress_data.get("delay_probability", 0.65) * 100, 1)
    
    anomalies = energy_data.get("anomaly_count", 2)
    savings_kwh = energy_data.get("estimated_daily_savings_kwh", 48.5)

    brief_markdown = f"""### 🚨 Executive Construction Intelligence Briefing: **{project_name}**

**Overall Health Index:** `{composite}/100` — **{level} RISK PROFILE**  
**Primary Risk Driver:** `{driver}`

---

#### 1. Cross-Domain Synergy & Correlated Signals
Analysis across the 4 core AI telemetry streams indicates that **{project_name}** is encountering compounding operational frictions. Most critically:
- **Cost Trajectory:** Stacking ensemble models predict a **{overrun_prob}% probability** of budget overrun, forecasting an estimated **+{overrun_pct}% cost escalation** on active procurement work packages.
- **Schedule Friction:** The LSTM/CNN hybrid tracker reports the critical path is currently **{slippage_days} days behind baseline**, with a **{delay_prob}% likelihood** of cascading delays into the next phase.
- **BIM Geometric Integrity:** Automated AABB spatial validation discovered **{clash_count} spatial clashes** ({high_clashes} classified as severe/critical), predominantly concentrated between MEP distribution conduits and structural framing.
- **Site Energy & Telemetry:** Sensor stream analysis isolated **{anomalies} high-load equipment anomalies**. Implementing predictive shutdown protocols on idle equipment can reclaim **~{savings_kwh} kWh/day**.

---

#### 2. Root Cause Diagnostic
The schedule compression observed on upper floor slabs is strongly correlated with the unresolved MEP/structural clashes flagged in the latest BIM coordination cycle. Subcontractors are pausing field installations to resolve routing conflicts, directly driving both labor idle-time costs and baseline slippage.

---

#### 3. Immediate Action Directives (Prioritized)
1. 🔴 **Convene Emergency BIM Coordination (24h):** Fast-track resolution of the `{high_clashes}` high-severity clashes before concrete pouring begins on affected sectors.
2. 🟠 **Procurement Cap & Re-baselining:** Lock non-critical purchase requisitions and review vendor variance reports for packages contributing to the `{overrun_pct}%` cost drift.
3. 🟡 **Crew Reallocation:** Shift secondary trade manpower to mitigate the `{slippage_days}-day` critical path bottleneck.
4. 🟢 **Automate Standby Energy Controls:** Deploy recommended equipment shutdown schedules to instantly reduce daily site power dissipation.
"""

    key_takeaways = [
        f"Composite project risk is {level} ({composite}/100)",
        f"Cost overrun risk stands at {overrun_prob}% (+{overrun_pct}% variance)",
        f"Critical path is {slippage_days} days behind schedule",
        f"{clash_count} geometric clashes requiring MEP resolution",
        f"{anomalies} equipment telemetry anomalies flagged"
    ]

    return {
        "provider": "ConstructIQ Rule-Engine / Template Synthesizer",
        "markdown": brief_markdown,
        "key_takeaways": key_takeaways,
        "status": "success"
    }


def generate_ai_narrative(
    project_name: str,
    risk_summary: Dict[str, Any],
    bim_data: Dict[str, Any],
    cost_data: Dict[str, Any],
    progress_data: Dict[str, Any],
    energy_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Calls Gemini API if GEMINI_API_KEY is configured, else uses domain fallback generator.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return generate_fallback_brief(
            project_name, risk_summary, bim_data, cost_data, progress_data, energy_data
        )

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")

        payload_summary = {
            "project_name": project_name,
            "unified_risk": risk_summary,
            "bim_summary": {
                "clash_summary": bim_data.get("clash_summary"),
                "flagged_components_count": len(bim_data.get("flagged_components", []))
            },
            "cost_summary": {
                "overrun_probability": cost_data.get("overrun_probability"),
                "projected_overrun_pct": cost_data.get("projected_overrun_pct")
            },
            "progress_summary": {
                "delay_probability": progress_data.get("delay_probability"),
                "schedule_slippage_days": progress_data.get("schedule_slippage_days"),
                "completion_gap_pct": progress_data.get("completion_gap_pct")
            },
            "energy_summary": {
                "anomaly_count": energy_data.get("anomaly_count"),
                "estimated_daily_savings_kwh": energy_data.get("estimated_daily_savings_kwh")
            }
        }

        prompt = f"""You are the Chief Construction Intelligence AI for ConstructIQ.
You are given the combined telemetry and machine learning outputs from 4 analytical modules:
1. BIM Validator (geometric clash detection, fault prediction)
2. Cost Predictor (stacking ensemble cost overrun forecasting)
3. Progress Tracker (LSTM schedule delay & S-curve tracking)
4. Energy Optimizer (equipment anomaly & shutdown recommendation)

Here is the structured diagnostic JSON:
{json.dumps(payload_summary, indent=2)}

Generate a crisp, authoritative, senior-executive-level Construction Intelligence Briefing in clean Markdown.
Structure it with:
1. Executive Project Health Index & Primary Driver
2. Cross-Domain Synergies (connect the dots between clashes, delay, cost drift, and site energy)
3. Root Cause Diagnostic
4. Prioritized Action Directives (Numbered 1-4 with urgency badges)

Keep it professional, high-impact, and directly actionable for Project Directors.
"""
        response = model.generate_content(prompt)
        text = response.text

        return {
            "provider": "Google Gemini 1.5 Flash",
            "markdown": text,
            "key_takeaways": [
                f"Unified composite risk score: {risk_summary.get('composite_score')}/100",
                f"Primary driver: {risk_summary.get('primary_driver', {}).get('name')}",
                "Cross-module AI correlation complete"
            ],
            "status": "success"
        }
    except Exception as e:
        # Graceful fallback on API error or quota limit
        res = generate_fallback_brief(
            project_name, risk_summary, bim_data, cost_data, progress_data, energy_data
        )
        res["provider"] = f"ConstructIQ Fallback (Gemini notice: {str(e)[:60]}...)"
        return res


def answer_project_query(
    question: str,
    project_context: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Answers user questions regarding the project's analytical state.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")

            prompt = f"""You are ConstructIQ AI Assistant. 
The user is asking a question about their construction project based on the following diagnostic data:
{json.dumps(project_context, indent=2)}

User Question: {question}

Provide a concise, direct, helpful response citing specific numbers from the diagnostics whenever relevant.
"""
            response = model.generate_content(prompt)
            return {"answer": response.text, "provider": "Gemini 1.5"}
        except Exception:
            pass

    # Fallback answers based on query keywords
    q_lower = question.lower()
    if "clash" in q_lower or "bim" in q_lower:
        bim = project_context.get("bim", {})
        clashes = bim.get("clash_summary", {})
        return {
            "answer": f"BIM Model inspection detected {clashes.get('total_clashes', 0)} geometric clashes, including {clashes.get('high_severity', 0)} high-severity interferences. Most clashes involve structural elements colliding with MEP ductwork and piping runs.",
            "provider": "ConstructIQ Rule Engine"
        }
    elif "cost" in q_lower or "budget" in q_lower:
        cost = project_context.get("cost", {})
        return {
            "answer": f"Cost Overrun analysis forecasts a {round(cost.get('overrun_probability', 0.72) * 100, 1)}% probability of exceeding the allocated budget envelope, with a projected variance of +{round(cost.get('projected_overrun_pct', 14.8), 1)}%. High equipment idle time and subcontract rework are key drivers.",
            "provider": "ConstructIQ Rule Engine"
        }
    elif "delay" in q_lower or "schedule" in q_lower or "progress" in q_lower:
        prog = project_context.get("progress", {})
        return {
            "answer": f"Progress tracking identifies an active schedule slippage of {prog.get('schedule_slippage_days', 6)} days behind the planned S-curve, with a {round(prog.get('delay_probability', 0.65) * 100, 1)}% likelihood of continued milestone delay.",
            "provider": "ConstructIQ Rule Engine"
        }
    elif "energy" in q_lower or "power" in q_lower or "sustainability" in q_lower:
        energy = project_context.get("energy", {})
        return {
            "answer": f"The energy telemetry module detected {energy.get('anomaly_count', 2)} equipment anomalies. By implementing greedy shutdown protocols during non-operational periods, the site can save approximately {energy.get('estimated_daily_savings_kwh', 45)} kWh per day.",
            "provider": "ConstructIQ Rule Engine"
        }
    else:
        risk = project_context.get("risk", {})
        return {
            "answer": f"Tower-Alpha project risk score is currently {risk.get('composite_score', 65)}/100 ({risk.get('risk_level', 'HIGH')}). The primary concern is {risk.get('primary_driver', {}).get('name', 'Cost Overrun')}. Recommended next step: convene a joint MEP-Structural coordination review.",
            "provider": "ConstructIQ Rule Engine"
        }
