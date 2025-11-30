import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import AddTaskModal from "../components/AddTaskModal";
import "./extractor.css";

export default function Extractor() {
  const { addTasks } = useTasks();
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [message, setMessage] = useState("");

  // Mock local extractor: tries to parse lines like:
  // "Task: Do X; Owner: Alice; Deadline: 2025-12-01"
  function localExtract(text) {
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    const results = [];

    for (const l of lines) {
      // try pattern
      const tMatch = l.match(/(?:task|todo)\s*[:\-]\s*(.+)/i);
      const ownerMatch = l.match(/owner\s*[:\-]\s*([A-Za-z0-9 \.]+)/i);
      const deadlineMatch = l.match(/(deadline|due)\s*[:\-]\s*([\d]{4}-[\d]{2}-[\d]{2})/i);

      if (tMatch) {
        results.push({
          task: tMatch[1].trim(),
          owner: ownerMatch ? ownerMatch[1].trim() : "",
          deadline: deadlineMatch ? deadlineMatch[2].trim() : "",
        });
      } else {
        // fallback: attempt to split by semicolon/ pipe
        const parts = l.split(/;|\|/).map(p => p.trim());
        if (parts.length >= 1 && parts[0].length > 10) {
          // treat parts[0] as task
          results.push({
            task: parts[0],
            owner: (parts.find(p => /owner/i.test(p)) || "").replace(/owner\s*[:\-]\s*/i, "").trim(),
            deadline: (parts.find(p => /(deadline|due)/i.test(p)) || "").replace(/(deadline|due)\s*[:\-]\s*/i,"").trim()
          });
        }
      }
    }

    // if no lines matched, create a sample
    if (results.length === 0 && text.trim().length > 10) {
      // naive: create 2 sample tasks by splitting sentences
      const sentences = text.split(/[\.\?\!]\s+/).filter(Boolean);
      const take = sentences.slice(0, Math.min(3, sentences.length));
      take.forEach((s) => {
        results.push({ task: s.slice(0, 160), owner: "", deadline: "" });
      });
    }
    return results;
  }

  async function handleExtract() {
    if (!transcript.trim()) {
      setMessage("Paste or upload a transcript first.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      // Optional: Try call backend AI endpoint first
      // If you have a backend that calls Gemini, you can POST to /api/extract
      // Example:
      // const res = await fetch("/api/extract", { method:"POST", body: JSON.stringify({ transcript }), headers:{"Content-Type":"application/json"}});
      // if (res.ok) { const data = await res.json(); addTasks(data.tasks); setMessage("Extracted from server"); setLoading(false); return; }

      // Fallback local extractor
      const extracted = localExtract(transcript);

      if (extracted.length === 0) {
        setMessage("No tasks found. Try adding manually or paste more clear lines.");
      } else {
        addTasks(extracted);
        setMessage(`Extracted ${extracted.length} tasks.`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Extraction failed locally. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTranscript(String(ev.target.result));
    reader.readAsText(f);
  }

  return (
    <div className="extract-main">
      <div className="extract-card">
        <h2>Task Extractor</h2>
        <p>Paste your meeting transcript below OR upload a .txt transcript file.</p>

        <textarea
          className="transcript-input"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste meeting text here..."
        />

        <div className="extract-actions">
          <label className="file-input">
            Upload .txt
            <input type="file" accept=".txt" onChange={handleFile} />
          </label>

          <button className="primary-btn" onClick={handleExtract} disabled={loading}>
            {loading ? "Extracting..." : "Extract Tasks (AI) "}
          </button>

          <AddManualAndAction addMsg={(t)=>{}} />
        </div>

        {message && <div className="extract-message">{message}</div>}

        <div className="hint">
          Tip: For best results, each task on a separate line like:
          <div className="example">Task: Finish report; Owner: Rina; Deadline: 2025-12-01</div>
        </div>
      </div>
    </div>
  );
}

// Small wrapper to reuse AddTaskModal but styled here
function AddManualAndAction() {
  const { addTask } = useTasks();
  return <AddTaskModal onAdd={addTask} />;
}
