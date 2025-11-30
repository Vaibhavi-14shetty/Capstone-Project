# Capstone-Project
(Enterprise Agent Track)

🚀 Meeting Outcome Executor Agent :
An AI-powered tool that automatically extracts tasks, owners, and deadlines from meeting transcripts and organizes them for efficient execution.

📌 Overview
Managing meeting outcomes manually is time-consuming and error-prone.
This project solves that by providing an AI-driven system that:
Accepts meeting transcripts (text/audio-converted text)
Extracts action items, task owners, and deadlines
Organizes tasks in a clean interface
Allows manual task addition for full flexibility

The system uses Google Gemini AI for natural language understanding and FastAPI + React for a smooth user experience.

🎯 Features

🧠 AI-Powered Task Extraction
Upload a transcript and instantly get:
Task titles
Assigned owners
Deadlines
Additional descriptions

📋 Task Management
View extracted tasks
Add or edit tasks manually
Delete tasks
Organized clean UI

🖥️ User-Friendly Dashboard
A beautifully designed dark UI with:
Dashboard
Extractor
Tasks
Schedule (optional section)

⚙️ Backend Integration
FastAPI handles API requests
Gemini AI processes transcripts
Modular router-based backend design

🎨 Modern Frontend
Built using React + Vite
Fully customized premium dark theme
Smooth navigation
Responsive design

🏗️ Tech Stack
Frontend
React (Vite)
CSS (Custom styling)
React Router

Backend :
Python
FastAPI
Uvicorn
Pydantic
Google Gemini API
Other Tools
Node.js
Virtual Environment (venv)
Git & GitHub (optional)

📂 Project Structure
meeting-executor-agent/
│
├── backend/
│   ├── main.py
│   ├── router/
│   │   └── meeting_router.py
│   ├── models/
│   │   └── tasks.py
│   ├── utils/
│   │   └── gemini_extractor.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Extractor.jsx
│   │   │   ├── Tasks.jsx
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── public/
│   ├── package.json
│
└── README.md

⚡ How to Run the Project
🖥️ 1. Start Backend
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload


Backend starts at:
👉 http://localhost:8000

🌐 2. Start Frontend
cd frontend
npm install
npm run dev


Frontend starts at:
👉 http://localhost:5173

📤 How It Works
Step 1: Go to Extractor
Upload your meeting transcript.

Step 2: AI Extracts Tasks
Gemini model processes the text and returns structured tasks.

Step 3: View or Edit Tasks
Tasks appear in the Tasks page where users can:
Edit owners
Add deadlines
Organize them

📸 Screenshots:

You can add screenshots like:
Dashboard: 


🧠 AI Model Used
Google Gemini-2.0-flash
The model is used via API to:
Parse long meeting transcripts
Identify action items
Detect task owners and deadlines
Output structured JSON

🙌 Why This Project Is Valuable
✔ Saves time
✔ Ensures nothing from a meeting is forgotten
✔ Helps students, teams, managers, and professionals
✔ End-to-end automation from extraction to execution

This is an excellent capstone project showing real-world AI integration.



🏁 Conclusion:
The Meeting Outcome Executor Agent is a complete AI-powered workflow tool designed to extract, organize, and manage actionable insights from meeting transcripts.
This project demonstrates strong skills in:
AI integration
Frontend design
Backend API development
UI/UX
Real-world application thinking
