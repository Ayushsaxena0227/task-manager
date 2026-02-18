const express = require("express");
const { body, param, validationResult } = require("express-validator");
const taskController = require("../controller/taskController");

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

const mongoIdParam = param("id").isMongoId().withMessage("Invalid task ID");

const taskBodyValidators = [
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
];

const taskBodyUpdateValidators = [
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
];

router.get("/", taskController.getAllTasks);
router.get("/:id", mongoIdParam, validate, taskController.getTaskById);
router.post("/", taskBodyValidators, validate, taskController.createTask);
router.put(
  "/:id",
  [mongoIdParam, ...taskBodyUpdateValidators],
  validate,
  taskController.updateTask,
);
router.patch(
  "/:id/toggle",
  mongoIdParam,
  validate,
  taskController.toggleTaskStatus,
);
router.delete("/:id", mongoIdParam, validate, taskController.deleteTask);

module.exports = router;
