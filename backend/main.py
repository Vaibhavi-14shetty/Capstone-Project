import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

print("Looking for .env at:", ENV_PATH)
load_dotenv(ENV_PATH)

print("Loaded GEMINI KEY:", os.getenv("GEMINI_API_KEY"))



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as meeting_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meeting_router)

