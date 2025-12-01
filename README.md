# Capstone-Project
(Enterprise Agent Track)


📌Meeting Outcome Executor Agent
An AI-powered system that converts messy meeting transcripts into structured, actionable insights including Tasks, Owners, Deadlines, Priorities, and Summaries—powered by Gemini 2.0 Flash.

🟣 ⭐ PITCH (30 points)

📌 1. Problem Statement :

Most teams struggle after meetings because:
Tasks are not clearly captured
Owners are not assigned
Deadlines are missed
Summaries are manually created
Important decisions are lost in long transcripts
This creates confusion, delays, and poor project execution.


🧠 2.. Solution Overview :

The Meeting Outcome Executor Agent transforms raw meeting transcripts into clean, structured, actionable insights using Gemini 2.0 Flash. It extracts tasks, owners, deadlines, priorities, decisions, and summaries with high accuracy and presents them in a modern, intuitive UI.
It uses:
Gemini 2.0 Flash for extraction
FastAPI backend
React + Vite frontend
A modular AI Agent architecture
Clean UI with dashboard, task view, scheduling, and extraction page
The agent processes transcripts → returns structured, reliable meeting insights.



3. Why Agents?

A traditional LLM cannot handle multi-step reasoning, validation, and structured output reliably.
An agent allows:
Pre-processing of messy transcripts
Intelligent LLM prompting
JSON validation and correction
Error handling
Modular and extensible workflow
This makes extraction more robust, consistent, and production-ready.

Core Value:
This project eliminates manual note-taking, reduces miscommunication, and makes post-meeting execution fast and reliable—saving teams several hours every week and improving accountability.



🎯 Objective :

To build an AI Agent that:
Automatically extracts key meeting outcomes
Identifies tasks, owners, deadlines, priorities
Generates actionable reports
Makes meetings more productive
Saves manual post-meeting work



🏗️ 4. Architecture Diagram :
ASCII Diagram

                    ┌───────────────────────────┐
                    │        FRONTEND            │
                    │  React + Vite Pages        │
                    │  - Dashboard               │
                    │  - Extractor               │
                    │  - Tasks View              │
                    │  - Schedule Page           │
                    └─────────────┬─────────────┘
                                  │ (API Request)
                                  ▼
                    ┌───────────────────────────┐
                    │         BACKEND            │
                    │         FastAPI            │
                    │  /extract → transcript     │
                    │  /tasks   → parsed data    │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │       AGENTS LAYER         │
                    │  extraction_agent.py       │
                    │  - Pre-process transcript  │
                    │  - Call Gemini 2.0 Flash   │
                    │  - Validate JSON structure │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │ GEMINI 2.0 FLASH (LLM)     │
                    │ Interprets meeting text    │
                    │ Extracts: tasks, owners,   │
                    │ deadlines, risks & summary │
                    └───────────────────────────┘



📁 PROJECT STRUCTURE :

BRAND NEW PROJECT/
│
├── backend/
│   ├── agents/
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   └── extraction_agent.py
│   │
│   ├── api/
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   └── routes.py
│   │
│   ├── __pycache__/
│   ├── .env
│   ├── main.py
│   ├── Readme.md
│   └── requirements.txt
│
├── frontend/
│   ├── vite-project/
│   │   ├── node_modules/
│   │   ├── public/
│   │   │   └── vite.svg
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   └── api.js
│   │   │   ├── components/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Taskcard.jsx
│   │   │   │   └── ui.css
│   │   │   ├── context/
│   │   │   │   └── TaskContext.jsx
│   │   │   ├── pages/
│   │   │   │   ├── dashboard.css
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── extractor.css
│   │   │   │   ├── Extractor.jsx
│   │   │   │   ├── schedule.css
│   │   │   │   ├── SchedulePage.jsx
│   │   │   │   ├── tasks.css
│   │   │   │   └── Tasks.jsx
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── index.css
│   │   │   └── main.jsx
│   │   │
│   │   ├── .gitignore
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   └── vite.config.js
│
└── .venv/





🚀 Features
🔹 1. AI-Powered Task Extraction :
Upload .txt, .pdf, or raw transcript text
Gemini AI identifies:
Action items
Owners
Deadlines
Output tasks are automatically added to task manager

🔹 2. Modern Dashboard :
Clean black-themed UI
Premium purple gradient card styling
Navigation to all modules

🔹 3. Manual Task Manager :
Add tasks manually
Delete tasks
View all extracted and manual tasks

🔹 4. Schedule Page :
Organized layout for upcoming tasks
Grid-based task display

🔹 5. Fully Modular Frontend :
React Context for global task management
Clean component architecture
Responsive UI

🔹 6. FastAPI Backend :
Modular routing (routes.py)
Agent logic in extraction_agent.py
Environment variables for API keys
CORS enabled for frontend communication



🧩 Technologies Used :

Component              	Tech
AI Model	         Gemini 2.0 Flash
Backend	               FastAPI
Agent Logic       	   Python
Frontend        	 React + Vite + Js
Styling	                CSS
Communication	         Axios






⚙️ Setup Instructions :

1️⃣ Backend Setup
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
Run backend:
uvicorn main:app --reload


2️⃣ Frontend Setup
cd frontend/vite-project
npm install
npm run dev
The app runs at:
http://localhost:5173


🔗 API Endpoints :
POST /extract
Uploads transcript → returns extracted tasks.
GET /tasks
Fetch all tasks.
POST /tasks
Add manual task.



🎥 Demo Workflow:

Open Dashboard
Navigate to Extractor
Upload transcript
AI extracts tasks
Go to Tasks section
View/manage tasks
Visit Schedule page
Smooth navigation across system



📸 Screenshots:

Dashboard: <img width="1863" height="889" alt="Dasboard png" src="https://github.com/user-attachments/assets/f0ed49fd-31d8-4cb8-bc40-5fe5341103d9" />
Extractor: <img width="1903" height="912" alt="Extractor png" src="https://github.com/user-attachments/assets/c3fb4682-42b8-47b2-aedf-7dab12b17ec8" />
Tasks: <img width="1887" height="899" alt="Tasks png" src="https://github.com/user-attachments/assets/cc572c2b-f71c-4a98-a65d-6b52eb378360" />
Schedule: <img width="1903" height="914" alt="Schedule png" src="https://github.com/user-attachments/assets/911827f6-b149-4409-9eac-dc4e11b32d88" />



📸 UI Highlights:

Dark premium theme
Purple gradient cards
Smooth buttons
Consistent design across pages




⭐ Gemini 2.0 Flash – Usage in Our Project

Gemini 2.0 Flash is the core AI engine behind the Meeting Outcome Executor Agent.
It performs all the heavy lifting:
✅ Reads unstructured meeting transcripts
✅ Understands the context, intent, and action items
✅ Extracts tasks, owners, deadlines, risks, decisions
✅ Returns a structured JSON output that the dashboard displays

🔥 Why Gemini 2.0 Flash?

Gemini 2.0 Flash was selected because:
High-speed inference → extracts tasks in milliseconds
High accuracy on business workflows and productivity tasks
Cost-efficient for repeated transcript processing
Strong structured reasoning → perfect for JSON extraction
Handles long inputs → supports large meeting transcripts


🧠 How Gemini 2.0 Flash Works Inside the Agent
Below is the exact flow of how Gemini works inside your backend:

1️⃣ Transcript is received from the frontend
User uploads:
PDF
TXT
Raw text
Meeting notes

Frontend sends this content to:
POST /extract

2️⃣ Backend Preprocessing
In extraction_agent.py:
Clean text
Remove noise
Normalize speaker labels (optional)
Ensure the transcript is within token limits

3️⃣ Gemini 2.0 Flash API call
The agent constructs a carefully engineered prompt like:
You are a meeting outcome extraction agent.
Extract tasks, owners, deadlines, priorities, key decisions, and risks.
Return output ONLY in this structured JSON format:
{
  "tasks": [...],
  "summary": "...",
  "decisions": [...],
  "risks": [...]
}


Then it makes this call:

response = model.generate_content(prompt)
Gemini processes the transcript and replies with structured JSON.

4️⃣ Post-processing the AI output

The backend:
Validates JSON
Fixes formatting errors
Ensures tasks contain required fields
Ensures no hallucinations are present (through rule checks)
Then the final clean output is sent back to the frontend.

5️⃣ Rendered in UI

Frontend receives:
Extracted tasks
Summary
Owners
Deadlines
Risks
Decisions
These populate:
Taskcard.jsx
Tasks.jsx
SchedulePage.jsx
Everything updates automatically using React Context.



🧪 Evaluation Mapping (Kaggle Rubric Alignment)

This table maps every scoring requirement from the Kaggle Capstone rubric to the exact parts of my project that fulfill them.

Rubric Requirement	                                                                      How My Project Meets It
1. Problem Definition & Clarity             	Clear problem statement describing the difficulty teams face in extracting tasks, owners, and decisions from unstructured meeting transcripts.
2. Relevance of Proposed Solution                          	Proposed solution directly solves post-meeting confusion through an AI agent powered by Gemini 2.0 Flash.
3. Agent Architecture Quality                   	Fully modular agent design: extraction_agent.py handles LLM reasoning, routes.py handles API routing, and the frontend consumes structured task outputs.
4. Use of Reasoning Models (LLMs)                     	Uses Google Gemini 2.0 Flash for structured extraction with JSON schema validation and reasoning-based post-processing.
5. Technical Implementation                   	Implemented using FastAPI backend, React + Vite frontend, Axios communication, environment variables, modular code, and proper routing.
6. Clean Code & Structure                         	Follows industry-level folder separation: backend/agents, backend/api, frontend/src/pages, context, components, api folder.
7. Completeness of Features	                     Includes Dashboard, Extractor, Task Manager, Schedule page, global task context, file upload, AI extraction, and manual task entry.
8. Innovation & Creativity	                    Enterprise-style “Meeting Outcome Executor Agent,” turning messy transcripts into actionable outcomes using prompt engineering + LLM reasoning.
9. UI/UX Quality                                     	Modern black-themed UI, responsive layout, gradient cards, consistent typography, clean navigation.
10. Demonstration Quality (Video)	                           The project will be explained via a clear workflow: extraction → results → task manager → schedule.
11. Documentation Quality (README)	                  Comprehensive README with problem statement, objective, architecture, setup guide, screenshots, and submission mapping.
12. Deployment / Reproducibility                        	Instructions to run backend + frontend locally ensure 100% reproducibility. Environment variable setup included.




🎁 Bonus Features Implemented:

These features go beyond the basic requirements of the Capstone project and demonstrate additional effort, engineering depth, and creativity:

✨ 1. Premium Black-Themed UI
A custom-designed sleek black interface with purple gradient highlights provides a modern enterprise look, improving user experience.

✨ 2. Real-Time Global Task Context
All tasks (AI-based or manual) are managed using a global React Context, ensuring:
State persistence
Smooth navigation
Cleaner React architecture

✨ 3. Automatic JSON Schema Validation
The agent validates and restructures LLM output to avoid malformed JSON — reducing errors and improving reliability.

✨ 4. Robust Error Handling
Includes:
API-level error messages
Frontend error boundaries
Validation for empty or broken transcripts

✨ 5. Clean Modular Folder Architecture
Separated into:
Backend agents
Backend APIs
Frontend components
Frontend pages
Context, API calls, styles
Ensuring maximum maintainability.

✨ 6. Highly Scalable Agent Layer
The agent architecture can easily support:
Additional sub-agents
Chain-of-thought
Scheduling suggestions
Summary refiners

✨ 7. Multiple File Format Support
Users can upload:
.txt
.pdf
Raw transcript text
Extending usability beyond basic input.

✨ 8. Structured Report-Like Output
The extracted output includes
Tasks
Owners
Deadlines
Priorities
Summary
This is formatted cleanly for professional usage.

✨ 9. Enterprise-Ready Design
The solution is scalable for:
Teams
Workplaces
Project management tools

✨ 10. Highly Extensible API with CORS
Backend supports cross-origin access and clean routing, enabling future deployment to cloud platforms.



🏁 Conclusion:

This project demonstrates:
(AI integration using Gemini, Clean UI/UX design, Functional task automation, Organized project structure, End-to-end full-stack implementation)
In short, the Meeting Outcome Executor Agent streamlines the entire process of capturing, interpreting, and managing meeting outputs. Instead of manually searching through long transcripts, this AI-powered system automatically extracts actionable tasks, identifies owners, sets deadlines, and organizes schedules in a clean and intuitive dashboard. By automating post-meeting workflows, this project improves productivity, reduces human error, and ensures every important decision leads to concrete actions. It serves as a practical and intelligent solution for students, professionals, and teams who want to convert conversations into real outcomes with ease.


