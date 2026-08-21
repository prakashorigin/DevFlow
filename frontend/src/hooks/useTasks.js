import { useCallback, useEffect, useState } from "react";
import * as taskService from "../services/taskService";
import { apiMessage } from "../utils/helpers";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try { setTasks(await taskService.getTasks()); setError(""); }
    catch (err) { setError(apiMessage(err, "Unable to load tasks.")); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);
  const addTask = async (values) => { const task = await taskService.createTask(values); setTasks((current) => [task, ...current]); return task; };
  const saveTask = async (id, values) => { const task = await taskService.updateTask(id, values); setTasks((current) => current.map((item) => item._id === id ? task : item)); return task; };
  const removeTask = async (id) => { await taskService.deleteTask(id); setTasks((current) => current.filter((item) => item._id !== id)); };
  return { tasks, loading, error, refresh, addTask, saveTask, removeTask };
}
