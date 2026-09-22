# 🏗️ ConstructIQ — Unified Construction AI Command Center

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.16-FF6F00?logo=tensorflow)](https://tensorflow.org)
[![XGBoost](https://img.shields.io/badge/XGBoost-2.1-red)](https://xgboost.readthedocs.io)
[![Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75B2?logo=google)](https://ai.google.dev)

> **ConstructIQ** is a next-generation predictive intelligence platform that unifies **BIM geometric validation**, **cost overrun forecasting**, **progress S-curve tracking**, and **site energy optimization** into a single glassmorphic command center — narrated in natural language by Google Gemini.

---

## 💡 The Problem
In the **$13 Trillion** global construction sector:
- **80%** of projects overrun their allocated budgets.
- **70%** experience severe milestone delays.
- Project managers juggle 5+ disjointed tools (Navisworks for BIM, Primavera/MS Project for schedules, ERPs for costs, and SCADA/BMS for site power).
- Risks are discovered **reactively after physical damage or delay has already occurred**.

## 🚀 The Solution: ConstructIQ
ConstructIQ fuses telemetry and machine learning predictions across 4 critical pillars:
1. **BIM Geometric Clash Validator:** Runs Axis-Aligned Bounding Box (AABB) spatial overlap algorithms combined with Random Forest + LSTM edit history fault scoring and IsolationForest spatial anomaly detection.
2. **Cost Overrun Predictor:** Uses an **XGBoost** regressor on static project attributes stacked with an **LSTM sequence network** on weekly cash flows to output an calibrated probability and percentage drift.
3. **Progress & Schedule AI:** Uses a hybrid **CNN-LSTM network** to model real-world S-curves, identify critical-path slippage in days, and flag milestone risks.
4. **Site Energy & IoT Telemetry:** Ingests heavy equipment and sensor telemetry to predict power loads with LSTM, detects rogue standby spikes with an **IsolationForest**, and computes automated greedy shutdown schedules.
5. **🧠 Killer Feature — The AI Risk Narrator:** An LLM reasoning layer (powered by **Google Gemini 1.5 Flash**) that ingests structured outputs from all 4 models, diagnoses root causes, and delivers an executive briefing with prioritized action items.

---

## 🏛️ System Architecture

```
                                  CONSTRUCTIQ ARCHITECTURE
                                  
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                           React + Vite Command Center                            │
  │   • Unified Risk Score Gauge (0-100)      • AI Risk Narrator (Streamed Brief)    │
  │   • Progress S-Curve (Planned vs Actual)  • Cost Overrun Forecast Curve          │
  │   • BIM AABB Geometric Clash Matrix      • Site Energy & IoT Telemetry Panel    │
  │   • ML Flagged Model Components           • Real-time AI Copilot Chat Drawer     │
  └────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │ REST / SSE Stream (/api/analyze/all)
                                           ▼
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                            FastAPI Backend Router                                │
  │   /api/health   /api/projects   /api/analyze/*   /api/chat   /api/stream-narrative   │
  └────────┬───────────────────┬───────────────────┬───────────────────┬─────────────┘
           │                   │                   │                   │
           ▼                   ▼                   ▼                   ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │     BIM      │    │     Cost     │    │   Progress   │    │    Energy    │
    │  Validator   │    │  Predictor   │    │   Tracker    │    │  Optimizer   │
    │  • AABB 3D   │    │  • XGBoost   │    │  • CNN-LSTM  │    │  • LSTM Load │
    │  • RandForest│    │  • LSTM Seq  │    │  • S-Curve   │    │  • IsoForest │
    │  • IsoForest │    │  • Stacking  │    │  • Delay Prob│    │  • Greedy Opt│
    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
           └───────────────────┴───────────────────┴───────────────────┘
                                           │
                                           ▼
  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                     Cross-Domain Risk Scorer & AI Narrator                       │
  │   • Composite Risk Index (Cost 35% + Progress 30% + BIM 25% + Energy 10%)        │
  │   • Google Gemini 1.5 Flash Executive Briefing & Interactive Q&A Assistant       │
  └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
├── backend/
│   ├── modules/
│   │   ├── bim_validator.py       # AABB geometric clash detector + RF/LSTM/ISO models
│   │   ├── cost_predictor.py      # XGBoost + LSTM stacking ensemble cost forecast
│   │   ├── progress_tracker.py    # CNN-LSTM hybrid progress S-curve forecaster
│   │   └── energy_optimizer.py    # LSTM load predictor + IsolationForest shutdown opt
│   ├── services/
│   │   ├── risk_scorer.py         # Unified 4-pillar composite risk calculator
│   │   └── ai_narrator.py         # Gemini 1.5 LLM narrator & interactive project Q&A
│   ├── main.py                    # FastAPI app, CORS, routes & SSE stream
│   └── requirements.txt           # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIBrief.jsx        # AI Narrator with streaming typewriter & copy
│   │   │   ├── AIChatModal.jsx    # Interactive AI copilot chat assistant
│   │   │   ├── ClashTable.jsx     # BIM clashes matrix with floor/severity filters
│   │   │   ├── CostChart.jsx      # Budget baseline vs projected overrun curve
│   │   │   ├── EnergyPanel.jsx    # Site consumption, anomaly alerts & shutdown savings
│   │   │   ├── FlaggedTable.jsx   # Multi-model component fault ranking with action tiers
│   │   │   ├── Icons.jsx          # Crisp SVG icon components
│   │   │   ├── ProgressChart.jsx  # Planned vs Actual vs Forecasted S-curve
│   │   │   └── RiskGauge.jsx      # Dynamic SVG multi-pillar risk gauge
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Command center view
│   │   │   └── Landing.jsx        # Value proposition & live ticker landing page
│   │   ├── App.jsx                # View router
│   │   ├── index.css              # Ultra-premium glassmorphic dark design system
│   │   └── main.jsx               # React DOM mount
│   ├── index.html                 # SEO & font typography tags
│   ├── vite.config.js             # Vite configuration & backend proxy
│   └── package.json               # Node packages
├── BIMmodelvalidator.py           # Original script (preserved)
├── constructionprogress.py        # Original script (preserved)
├── costoverrun.py                 # Original script (preserved)
├── lstm.py                        # Original script (preserved)
└── README.md                      # Platform documentation
```

---

## ⚡ Getting Started

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# (Optional) Provide your Gemini API key for live LLM generation:
# set GEMINI_API_KEY="your-api-key-here"

# Start FastAPI server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
Backend API will be accessible at: `http://127.0.0.1:8000`  
Interactive Swagger docs: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open your browser at: `http://localhost:5173`

---

## 🎯 Key Hackathon Highlights
- **100% Codebase Reuse:** Retained and upgraded all 4 original machine learning scripts into clean, modular, callable backend pipelines.
- **Ensemble Depth:** Combines Random Forests, XGBoost, Deep LSTMs, Hybrid CNN-LSTMs, and Isolation Forests.
- **Intelligent Synthesis:** Doesn't just dump charts — the **Gemini AI Risk Narrator** connects how BIM clashes cause schedule delays, driving up subcontract costs.
- **Enterprise-Grade UI:** Custom dark-mode glassmorphic interface with interactive SVG gauges, S-curves, and real-time AI assistant.
