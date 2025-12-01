import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "./tasks.css";
import { X } from "lucide-react"; // delete icon

export default function Tasks() {
  const { tasks, clearTasks, removeTask } = useContext(TaskContext);

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Tasks ({tasks.length})</h1>

        <div className="tasks-buttons">
          <button className="add-btn">+ Add Task</button>
          <button className="clear-btn" onClick={clearTasks}>Clear All</button>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
        ) : (
          tasks.map((task, index) => (
            <div className="task-card" key={index}>
              <button className="delete-btn" onClick={() => removeTask(index)}>
                <X size={18} />
              </button>

              <p className="task-text">Task: {task.task}</p>

              <p><strong>Owner:</strong> {task.owner || "—"}</p>
              <p><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
