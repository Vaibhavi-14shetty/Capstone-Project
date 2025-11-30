import { useTasks } from "../context/TaskContext";
import "./schedule.css";

export default function SchedulePage() {
  const { tasks } = useTasks();

  // copy and sort tasks with deadlines first
  const sorted = [...tasks].sort((a,b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return a.deadline.localeCompare(b.deadline);
  });

  return (
    <div className="schedule-main">
      <h2>Suggested Schedule</h2>
      {sorted.length === 0 && <div className="empty">No tasks to schedule — extract or add tasks first.</div>}

      <div className="timeline">
        {sorted.map((t, idx) => (
          <div className="timeline-item" key={t.id || idx}>
            <div className="dot" />
            <div className="content">
              <h4>{t.task}</h4>
              <p><strong>Owner:</strong> {t.owner || "—"} <span className="sep">•</span> <strong>Deadline:</strong> {t.deadline || "No deadline"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
