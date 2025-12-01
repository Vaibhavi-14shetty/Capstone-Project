import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import "./extractor.css";
import { extractTasks } from "../api/api";

export default function Extractor() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const { addTasks } = useTasks();  // ← IMPORTANT

  const handleExtract = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    const extracted = await extractTasks(transcript);
    setLoading(false);

    // Convert API response to TaskContext format
    const formatted = extracted.map((t) => ({
      task: t.task ||"Untitled Task",
      owner: t.owner || "—",
      deadline: t.deadline || "No deadline",
    }));

    addTasks(formatted);  // ← Save directly to context
  };

  return (
    <div className="extractor-container">
      <h1 className="extractor-title">Task Extractor</h1>
      <p className="extractor-subtitle">
        Paste your meeting transcript below OR upload a .txt transcript file.
      </p>

      <textarea
        className="extractor-textarea"
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <div className="btn-row">
        <button className="upload-btn">Upload .txt</button>

        <button className="extract-btn" onClick={handleExtract}>
          {loading ? "Extracting..." : "Extract Tasks (AI)"}
        </button>

        <button className="add-btn">+ Add Task</button>
      </div>

      <div className="tip-box">
        Tip: For best accuracy, write each task/line properly.
        <br />
        Example: <b>Task: Finish report; Owner: Rina; Deadline: 2025-12-01</b>
      </div>
    </div>
  );
}
