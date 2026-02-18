const Task = require("../models/Task");

const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const createTask = async ({ title, description, status }) => {
  return await Task.create({ title, description, status });
};

const updateTask = async (id, { title, description, status }) => {
  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true, runValidators: true },
  );
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const toggleTaskStatus = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  task.status = task.status === "pending" ? "completed" : "pending";
  await task.save();
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
};
