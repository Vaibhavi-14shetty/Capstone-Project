import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import ExtractPage from "./pages/Extractor.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import Tasks from "./pages/Tasks.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import TaskCard from "./components/Taskcard.jsx";


// Page CSS
import "./pages/dashboard.css";
import "./pages/extractor.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extract" element={<ExtractPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
