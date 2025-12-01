 import "./ui.css";

export default function Taskcard({ task, onRemove }) {
  return (
    <div className="task-card">
      <div className="task-top">
        <h4>{task.task}</h4>
        <button className="remove-btn" onClick={() => onRemove && onRemove(task.id)}>
          ×
        </button>
      </div>

        <p><strong>Task:</strong> {task.task}</p>
      <p><strong>Owner:</strong> {task.owner || "—"}</p>
      <p><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
    </div>
  );
}
