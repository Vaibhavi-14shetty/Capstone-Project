import { useTasks } from "../context/TaskContext";
import Taskcard from "../components/Taskcard";
import AddTaskModal from "../components/AddTaskModal";
import "./tasks.css";

export default function Tasks() {
  const { tasks, removeTask, clearTasks } = useTasks();

  return (
    <div className="tasks-main">
      <div className="tasks-header">
        <h2>Tasks ({tasks.length})</h2>
        <div className="tasks-actions">
          <AddTaskModal onAdd={(t)=>{ /* AddTaskModal will call context when used inside page */ }} />
          <button className="primary-btn" onClick={() => clearTasks()} style={{background:"transparent", border:"1px solid rgba(155,123,255,0.08)"}}>Clear All</button>
        </div>
      </div>

      {tasks.length === 0 && (
        <div className="empty">No tasks yet. Extract from a transcript or add manually.</div>
      )}

      <div className="tasks-grid">
        {tasks.map((t) => (
          <Taskcard key={t.id} task={t} onRemove={removeTask} />
        ))}
      </div>
    </div>
  );
}
