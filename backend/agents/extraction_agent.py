# backend/agents/extraction_agent.py
import os
import re
import json
import logging
from typing import List, Dict, Any

# google.generativeai client
import google.generativeai as genai
from dotenv import load_dotenv

# Load local .env if present
load_dotenv()

logger = logging.getLogger("extraction_agent")
logging.basicConfig(level=logging.INFO)


class ExtractionError(Exception):
    pass


class ExtractionAgent:
    """
    ExtractionAgent: calls Google Gemini (via google.generativeai) to extract tasks from a meeting transcript.
    - Loads GEMINI_API_KEY from environment or .env
    - Uses model specified by GEMINI_MODEL env var (default: gemini-2.0-flash)
    - Attempts to parse JSON robustly from model output (direct JSON, or substring)
    """

    def __init__(self, api_key: str | None = None, model_name: str | None = None):
        # Prefer explicit param, else env
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ExtractionError(
                "Gemini API key not found. Set GEMINI_API_KEY in environment or in backend/.env."
            )

        # configure client
        try:
            genai.configure(api_key=self.api_key)
        except Exception as e:
            raise ExtractionError(f"Failed to configure Gemini client: {e}")

        # model selection
        self.model_name = model_name or os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

        # Use the generative model handle
        try:
            self.model = genai.GenerativeModel(self.model_name)
        except Exception as e:
            logger.warning("Could not instantiate GenerativeModel at init: %s", e)
            self.model = None

    def _safe_json_load(self, text: str) -> Any:
        """
        Try multiple strategies to parse JSON from model text:
          1) direct json.loads
          2) find first bracketed JSON array/object substring and json.loads
          3) fallback: try to replace common single quote -> double quotes safe-ish
        """
        if not text or not text.strip():
            raise ValueError("Empty response text")

        # 1) direct parse
        try:
            return json.loads(text)
        except Exception:
            pass

        # 2) find first JSON array/object using regex
        def find_balanced(s: str, opener: str, closer: str):
            start = s.find(opener)
            if start == -1:
                return None
            depth = 0
            for i in range(start, len(s)):
                if s[i] == opener:
                    depth += 1
                elif s[i] == closer:
                    depth -= 1
                    if depth == 0:
                        return s[start:i + 1]
            return None

        # try array first
        arr = find_balanced(text, "[", "]")
        if arr:
            try:
                return json.loads(arr)
            except Exception:
                pass

        # try object
        obj = find_balanced(text, "{", "}")
        if obj:
            try:
                return json.loads(obj)
            except Exception:
                pass

        # 3) fallback
        heuristic = text.strip()
        if (heuristic.startswith("[") or heuristic.startswith("{")) and ("'" in heuristic):
            heur = heuristic.replace("'", '"')
            try:
                return json.loads(heur)
            except Exception:
                pass

        raise ValueError("Could not parse JSON from model output")

    def extract(self, transcript: str) -> List[Dict[str, Any]]:
        """
        Given a transcript string, call the LLM to extract tasks.
        Returns a Python list of dicts.
        """
        if not transcript or not transcript.strip():
            raise ExtractionError("Transcript is empty")

        prompt = f"""
You are a task extraction assistant.

Extract ALL tasks from the transcript below and return ONLY a JSON list.

Each task must follow this structure:

[
  {{
    "task": "<short clear task>",
    "owner": "<person responsible or null>",
    "deadline": "<deadline or null>"
  }}
]

### Rules:
- If owner is not mentioned → set "owner": null
- If deadline is not mentioned → set "deadline": null
- TASK MUST ALWAYS BE FILLED.
- DO NOT ADD ANY EXTRA TEXT OUTSIDE JSON.

### Transcript:
{transcript}
"""

        try:
            if self.model is None:
                self.model = genai.GenerativeModel(self.model_name)

            response = self.model.generate_content(prompt)

            raw_text = None
            if hasattr(response, "text"):
                raw_text = response.text
            elif hasattr(response, "candidates") and isinstance(response.candidates, (list, tuple)) and response.candidates:
                raw_text = getattr(response.candidates[0], "content", None) or str(response.candidates[0])
            else:
                raw_text = str(response)

            logger.info("LLM raw_text (first 500 chars): %s", raw_text[:500] if raw_text else "EMPTY")

            parsed = self._safe_json_load(raw_text)

            if isinstance(parsed, dict):
                parsed = [parsed]

            if not isinstance(parsed, list):
                raise ExtractionError("LLM returned JSON but not a list")

            # Normalize
            normalized = []
            for item in parsed:
                if not isinstance(item, dict):
                    continue

                task = item.get("task") or item.get("title") or item.get("text")

                owner = item.get("owner") if "owner" in item else None
                deadline = item.get("deadline") if "deadline" in item else None

                if task:
                    normalized.append({
                        "task": str(task).strip(),
                        "owner": owner if owner not in ("", None, "null") else None,
                        "deadline": deadline if deadline not in ("", None, "null") else None
                    })

            return normalized

        except Exception as e:
            logger.exception("Extraction failed: %s", e)
            raise ExtractionError(f"Extraction failed: {e}")


