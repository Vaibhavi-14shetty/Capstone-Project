import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    // ensure id
    setTasks((t) => [{ id: uuidv4(), ...task }, ...t]);
  }

  function addTasks(newTasksArray) {
    // dedupe by text if you want — simple concat for now
    const toAdd = newTasksArray.map((tk) => ({ id: uuidv4(), ...tk }));
    setTasks((t) => [...toAdd, ...t]);
  }

  function removeTask(id) {
    setTasks((t) => t.filter((x) => x.id !== id));
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, addTasks, removeTask, clearTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
