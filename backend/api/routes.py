# backend/api/routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import anyio

# Import agent class (final implementation below)
from agents.extraction_agent import ExtractionAgent, ExtractionError

router = APIRouter()

class TranscriptRequest(BaseModel):
    transcript: str

class TaskItem(BaseModel):
    task: str
    owner: str | None = None
    deadline: str | None = None

class ExtractResponse(BaseModel):
    tasks: List[TaskItem]

# Single /extract endpoint used by the frontend:
@router.post("/extract", response_model=ExtractResponse)
async def extract_endpoint(body: TranscriptRequest):
    """
    Accepts a transcript string and returns structured tasks.
    This runs the potentially blocking LLM call in a threadpool (safe for FastAPI).
    """
    transcript_text = body.transcript.strip()
    if not transcript_text:
        raise HTTPException(status_code=400, detail="Transcript is empty")

    # Construct agent with the configured API key (agent will raise helpful error if missing)
    try:
        agent = ExtractionAgent()
    except ExtractionError as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Run extraction in background thread to avoid blocking the event loop
    try:
        result = await anyio.to_thread.run_sync(agent.extract, transcript_text)
    except ExtractionError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected extraction error: {e}")

    # Validate result structure: list of dicts with at least "task"
    tasks = []
    if isinstance(result, list):
        for item in result:
            if not isinstance(item, dict):
                continue
            task_text = item.get("task") or item.get("title") or item.get("text")
            owner = item.get("owner") or item.get("assignee") or None
            deadline = item.get("deadline") or item.get("due") or None
            if task_text:
                tasks.append({"task": str(task_text).strip(), "owner": owner, "deadline": deadline})
    else:
        raise HTTPException(status_code=502, detail="LLM returned unexpected format")

    return {"tasks": tasks}
