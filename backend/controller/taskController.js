const taskService = require("../services/taskService");

/**
 * TaskController
 * Responsible for:
 *   1. Extracting data from req (params, body, query)
 *   2. Calling the appropriate TaskService method
 *   3. Sending the HTTP response
 *
 * No business logic or DB queries live here.
 */

// GET /api/tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await taskService.createTask({ title, description, status });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await taskService.updateTask(req.params.id, {
      title,
      description,
      status,
    });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/tasks/:id/toggle
const toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.toggleTaskStatus(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
};
