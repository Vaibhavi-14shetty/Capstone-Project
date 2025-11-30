import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dash-main">
      <div className="dash-card">
        <h1>Meeting Outcome Executor Agent</h1>
        <p>
          Upload your meeting transcript and let the AI extract tasks, owners,
          and deadlines automatically. You can also add tasks manually.
        </p>

        <div className="dash-actions">
          <button className="primary-btn" onClick={() => navigate("/extract")}>
            Go to Extractor →
          </button>
          <button className="primary-btn" onClick={() => navigate("/tasks")} style={{marginLeft:12, background:"transparent", border:"1px solid rgba(155,123,255,0.14)"}}>
            View Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
