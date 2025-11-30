Backend: FastAPI service for extracting meeting tasks.
Run:
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  uvicorn main:app --reload --port 8000
