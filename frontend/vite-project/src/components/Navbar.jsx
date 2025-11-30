import { Link, useLocation } from "react-router-dom";
import "./ui.css";

export default function Navbar() {
  const loc = useLocation();

  return (
    <header className="nav-header">
      <div className="nav-inner">
        <div className="brand" onClick={() => (window.location.href = "/")}>
          <span className="brand-dot" /> Meeting Outcome
        </div>

        <nav className="nav-links">
          <Link className={loc.pathname === "/" ? "active" : ""} to="/">
            Dashboard
          </Link>
          <Link className={loc.pathname === "/extract" ? "active" : ""} to="/extract">
            Extractor
          </Link>
          <Link className={loc.pathname === "/tasks" ? "active" : ""} to="/tasks">
            Tasks
          </Link>
          <Link className={loc.pathname === "/schedule" ? "active" : ""} to="/schedule">
            Schedule
          </Link>
        </nav>
      </div>
    </header>
  );
}
