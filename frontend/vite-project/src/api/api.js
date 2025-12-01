export async function extractTasks(transcript) {
  try {
    const response = await fetch("http://127.0.0.1:8000/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

    if (!response.ok) throw new Error("Backend error");

    const data = await response.json();
    console.log("Extracted tasks:", data);

    // MUST RETURN EXACT BACKEND FORMAT
    return data.tasks;
  } catch (err) {
    console.error("Extract API error:", err);
    return [];
  }
}
