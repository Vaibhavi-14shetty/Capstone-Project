import { NavLink } from "react-router-dom";
import "./ui.css";

export default function Navbar() {
  return (
    <div className="top-nav">
      
      {/* LEFT SIDE */}
      <div className="nav-left">
        <span className="nav-dot"></span>
        <span className="nav-title">Meeting Outcome</span>
      </div>

      {/* RIGHT SIDE MENU */}
      <div className="nav-right">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-active" : ""}>
          Dashboard
        </NavLink>

        <NavLink to="/extract" className={({ isActive }) => isActive ? "nav-active" : ""}>
          Extractor
        </NavLink>

        <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-active" : ""}>
          Tasks
        </NavLink>

        <NavLink to="/schedule" className={({ isActive }) => isActive ? "nav-active" : ""}>
          Schedule
        </NavLink>
      </div>

    </div>
  );
}
