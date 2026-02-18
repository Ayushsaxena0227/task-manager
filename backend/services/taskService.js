const express = require("express");
const { body, param, validationResult } = require("express-validator");
const Task = require("../models/Task");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors
        .array()
        .map((e) => e.msg)
        .join(", "),
    });
  }
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validate,
  async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters")
      .isLength({ max: 100 })
      .withMessage("Title cannot exceed 100 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
    body("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Status must be pending or completed"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { title, description, status } = req.body;
      const task = await Task.create({ title, description, status });
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters")
      .isLength({ max: 100 })
      .withMessage("Title cannot exceed 100 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
    body("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Status must be pending or completed"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:id/toggle",
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validate,
  async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }
      task.status = task.status === "pending" ? "completed" : "pending";
      await task.save();
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validate,
  async (req, res, next) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
