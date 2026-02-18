require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: " Task Manager API is running", version: "1.0.0" });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
