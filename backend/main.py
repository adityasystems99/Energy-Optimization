"""
ConstructIQ — Unified Construction AI Backend
FastAPI application exposing ML analytical pipelines and AI narration.
"""

import sys
import os
import asyncio
from typing import Dict, Any, Optional
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# Ensure backend root is in python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from modules.bim_validator import run_bim_validation
from modules.cost_predictor import run_cost_prediction
from modules.progress_tracker import run_progress_tracking
from modules.energy_optimizer import run_energy_optimization
from services.risk_scorer import calculate_unified_risk_score
from services.ai_narrator import generate_ai_narrative, answer_project_query

app = FastAPI(
    title="ConstructIQ AI API",
    description="Unified Construction Intelligence Command Center Backend",
    version="1.0.0"
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory cache for fast responsive demos
analysis_cache: Dict[str, Any] = {}

SAMPLE_PROJECTS = [
    {
        "id": "proj-tower-alpha",
        "name": "Tower-Alpha Commercial Center",
        "type": "High-Rise Commercial",
        "budget": "$42,000,000",
        "planned_duration_days": 540,
        "location": "Sector 62, Metro Corridor",
        "status": "In Progress (62% Completed)"
    },
    {
        "id": "proj-skyview-plaza",
        "name": "Skyview Mixed-Use Plaza",
        "type": "Mixed Residential & Retail",
        "budget": "$28,500,000",
        "planned_duration_days": 420,
        "location": "North Suburb Development Zone",
        "status": "In Progress (41% Completed)"
    },
    {
        "id": "proj-horizon-logistics",
        "name": "Horizon Central Logistics Hub",
        "type": "Industrial / Cold Storage",
        "budget": "$19,200,000",
        "planned_duration_days": 300,
        "location": "Western Freight Corridor",
        "status": "In Progress (78% Completed)"
    }
]

class ChatRequest(BaseModel):
    project_id: str = "proj-tower-alpha"
    question: str

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "ConstructIQ API",
        "version": "1.0.0",
        "active_modules": ["bim_validator", "cost_predictor", "progress_tracker", "energy_optimizer", "ai_narrator"]
    }

@app.get("/api/projects")
def list_projects():
    return {"projects": SAMPLE_PROJECTS}

@app.get("/api/analyze/bim")
def analyze_bim(project_id: str = "proj-tower-alpha"):
    return run_bim_validation()

@app.get("/api/analyze/cost")
def analyze_cost(project_id: str = "proj-tower-alpha"):
    return run_cost_prediction()

@app.get("/api/analyze/progress")
def analyze_progress(project_id: str = "proj-tower-alpha"):
    return run_progress_tracking()

@app.get("/api/analyze/energy")
def analyze_energy(project_id: str = "proj-tower-alpha"):
    return run_energy_optimization()

@app.get("/api/analyze/all")
def analyze_all(project_id: str = "proj-tower-alpha", refresh: bool = False):
    """
    Runs or retrieves the complete fused multi-pillar intelligence payload.
    """
    if not refresh and project_id in analysis_cache:
        return analysis_cache[project_id]

    # Find project metadata
    proj = next((p for p in SAMPLE_PROJECTS if p["id"] == project_id), SAMPLE_PROJECTS[0])
    
    # 1. Run all 4 modules
    bim = run_bim_validation()
    cost = run_cost_prediction()
    progress = run_progress_tracking()
    energy = run_energy_optimization()

    # 2. Calculate unified risk score
    risk = calculate_unified_risk_score(
        bim_data=bim,
        cost_data=cost,
        progress_data=progress,
        energy_data=energy
    )

    # 3. Generate AI narrative briefing
    narrative = generate_ai_narrative(
        project_name=proj["name"],
        risk_summary=risk,
        bim_data=bim,
        cost_data=cost,
        progress_data=progress,
        energy_data=energy
    )

    result = {
        "project": proj,
        "unified_risk": risk,
        "ai_narrative": narrative,
        "bim": bim,
        "cost": cost,
        "progress": progress,
        "energy": energy
    }

    # Store in cache
    analysis_cache[project_id] = result
    return result

@app.get("/api/stream-narrative")
async def stream_narrative(project_id: str = "proj-tower-alpha"):
    """
    Server-Sent Events endpoint to stream the narrative for typewriter effect.
    """
    cached = analysis_cache.get(project_id)
    if not cached:
        analyze_all(project_id=project_id)
        cached = analysis_cache[project_id]

    markdown_text = cached["ai_narrative"]["markdown"]

    async def event_generator():
        # Split into chunks of 3-5 words
        words = markdown_text.split(" ")
        chunk_size = 4
        for i in range(0, len(words), chunk_size):
            chunk = " ".join(words[i:i+chunk_size]) + " "
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0.04)
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/api/chat")
def chat_with_project(req: ChatRequest):
    cached = analysis_cache.get(req.project_id)
    if not cached:
        cached = analyze_all(project_id=req.project_id)

    answer = answer_project_query(req.question, cached)
    return answer

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
