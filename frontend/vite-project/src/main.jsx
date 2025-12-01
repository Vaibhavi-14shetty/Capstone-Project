
//main.py
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);