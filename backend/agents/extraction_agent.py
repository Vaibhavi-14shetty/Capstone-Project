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
            # still allow continuing; actual call may raise later
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

        # 2) find first JSON array or object using regex
        # Try to extract a substring that starts with '[' or '{' and ends with matching ']' or '}'
        # We'll be conservative: find the first '[' and try to find a matching closing ']' by scanning.
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
                        return s[start : i + 1]
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

        # 3) fallback: attempt heuristic fixes
        # replace single quotes with double quotes (only if it seems like JSON-ish)
        heuristic = text.strip()
        # only try if it looks like a list or object with single quotes
        if (heuristic.startswith("[") or heuristic.startswith("{")) and ("'" in heuristic):
            heur = heuristic.replace("'", '"')
            try:
                return json.loads(heur)
            except Exception:
                pass

        # Give up
        raise ValueError("Could not parse JSON from model output")

    def extract(self, transcript: str) -> List[Dict[str, Any]]:
        """
        Given a transcript string, call the LLM to extract tasks.
        Returns a Python list of dicts: [{ "task": "...", "owner": "...", "deadline": "..." }, ...]
        """
        if not transcript or not transcript.strip():
            raise ExtractionError("Transcript is empty")

        # Build a careful prompt that asks for strict JSON output
        prompt = f"""
You are an assistant that extracts tasks from meeting transcripts.

Return ONLY a JSON array of objects (no extra explanation, code fences or commentary).
Each object should contain these keys exactly: "task", "owner", "deadline".
If owner or deadline is not present, use an empty string "" for that field.

Example output:
[
  {{
    "task": "Write project report",
    "owner": "Alice",
    "deadline": "Monday"
  }}
]

Now extract tasks from the transcript below.

Transcript:
\"\"\"{transcript}\"\"\"
"""

        try:
            # Make the model call. The google.generativeai library provides model.generate_content in some versions.
            if self.model is None:
                # instantiate now
                self.model = genai.GenerativeModel(self.model_name)

            response = self.model.generate_content(prompt)
            # older/newer client may use response.text or response.candidates[0].content
            raw_text = None
            if hasattr(response, "text"):
                raw_text = response.text
            elif hasattr(response, "candidates") and isinstance(response.candidates, (list, tuple)) and response.candidates:
                raw_text = getattr(response.candidates[0], "content", None) or str(response.candidates[0])
            else:
                raw_text = str(response)

            logger.info("LLM raw_text (first 500 chars): %s", raw_text[:500] if raw_text else "EMPTY")

            # Try to parse JSON robustly
            parsed = self._safe_json_load(raw_text)

            # Ensure output is a list of dicts
            if isinstance(parsed, dict):
                # If model returned a single dict, wrap it
                parsed = [parsed]

            if not isinstance(parsed, list):
                raise ExtractionError("LLM returned JSON but not a list")

            # Normalize items: ensure keys task/owner/deadline exist
            normalized = []
            for item in parsed:
                if not isinstance(item, dict):
                    continue
                task = item.get("task") or item.get("title") or item.get("text")
                owner = item.get("owner") or item.get("assignee") or ""
                deadline = item.get("deadline") or item.get("due") or ""
                if task:
                    normalized.append({
                        "task": str(task).strip(),
                        "owner": str(owner).strip() if owner is not None else "",
                        "deadline": str(deadline).strip() if deadline is not None else ""
                    })

            return normalized

        except Exception as e:
            logger.exception("Extraction failed: %s", e)
            raise ExtractionError(f"Extraction failed: {e}")

