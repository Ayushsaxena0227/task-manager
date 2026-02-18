import { useState, useEffect, useCallback } from "react";
import { taskAPI } from "../api/task";
import toast from "react-hot-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskAPI.getAll();
      console.log(data);
      setTasks(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const newTask = await taskAPI.create(taskData);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task created!");
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updated = await taskAPI.update(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      toast.success("Task updated!");
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const toggleTask = async (id) => {
    try {
      const updated = await taskAPI.toggleStatus(id);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      toast.success(
        updated.status === "completed"
          ? "✅ Marked complete!"
          : "↩️ Marked pending",
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Derived stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return {
    tasks,
    loading,
    error,
    stats,
    fetchTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
};
