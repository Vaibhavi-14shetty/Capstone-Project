import { useState } from "react";
import "./ui.css";

export default function AddTaskModal({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [owner, setOwner] = useState("");
  const [deadline, setDeadline] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd({ task: task.trim(), owner: owner.trim(), deadline: deadline || "" });
    setTask(""); setOwner(""); setDeadline(""); setOpen(false);
  }

  return (
    <>
      <button className="primary-btn" onClick={() => setOpen(true)}>+ Add Task</button>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Add Task</h3>
            <form onSubmit={submit} className="add-form">
              <input value={task} onChange={(e)=>setTask(e.target.value)} placeholder="Task description" />
              <input value={owner} onChange={(e)=>setOwner(e.target.value)} placeholder="Owner (optional)" />
              <input value={deadline} onChange={(e)=>setDeadline(e.target.value)} placeholder="Deadline (YYYY-MM-DD)" />
              <div className="modal-actions">
                <button type="button" onClick={() => setOpen(false)}>Cancel</button>
                <button className="primary-btn" type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
