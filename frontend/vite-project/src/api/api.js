export const API_BASE = "http://127.0.0.1:8000";

export async function extractTasks(transcript) {
  try {
    const response = await fetch(`${API_BASE}/api/extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    return await response.json();
  } catch (error) {
    return { error: "Server unreachable", details: error.message };
  }
}
