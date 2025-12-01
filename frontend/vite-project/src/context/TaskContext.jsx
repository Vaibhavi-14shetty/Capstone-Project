import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Add a single task
  function addTask(task) {
    setTasks((prev) => [{ id: uuidv4(), ...task }, ...prev]);
  }

  // Add multiple tasks (from extractor)
  function addTasks(newTasksArray) {
    const formattedTasks = newTasksArray.map((tk) => ({
      id: uuidv4(),
      ...tk,
    }));

    setTasks((prev) => [...formattedTasks, ...prev]);
  }

  // Remove ONE task at index
  const removeTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all tasks
  function clearTasks() {
    setTasks([]);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        addTasks,
        clearTasks,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
