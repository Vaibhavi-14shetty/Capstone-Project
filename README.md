# Capstone-Project
(Enterprise Agent Track)

📌 Meeting Outcome Executor Agent :
An AI-powered system that automatically extracts tasks, owners, and deadlines from meeting transcripts and helps users manage tasks efficiently.
Built with React (Vite) frontend + FastAPI backend + Gemini AI for NLP-powered extraction.



🧠 Overview :

The Meeting Outcome Executor Agent helps teams convert long meeting conversations into actionable tasks instantly.
It allows users to:

Upload a meeting transcript
Automatically extract tasks using AI
View, edit, and manage tasks
Add tasks manually
Navigate through a clean, dark UI dashboard
Use an organized schedule page





📁 PROJECT STRUCTURE (Your Actual Folders)
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




🛠️ Tech Stack
Frontend
React (Vite)
JavaScript
Context API
Backend
Python 3.10+
FastAPI
Uvicorn
Google Gemini API
Other
.env config
Axios for API calls





⚙️ Setup Instructions
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



🏁 Conclusion:

This project demonstrates:
AI integration using Gemini
Clean UI/UX design
Functional task automation
Organized project structure
End-to-end full-stack implementation
