// REST API routes for tasks (A4, A5) - mounted at /api/tasks
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// Convert to string, trim whitespace (A5). Returns "" for undefined/null.
const cleanTitle = (value) => String(value ?? "").trim();

// Treat malformed ids the same as "not found"
const notFound = (res) => res.status(404).json({ error: "Task not found" });

// GET /api/tasks - fetch all tasks (oldest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks - add a new task, 201 on success
router.post("/", async (req, res) => {
  try {
    const title = cleanTitle(req.body.title);
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /api/tasks/:id - edit title and/or toggle completed
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const updates = {};

    if (req.body.title !== undefined) {
      const title = cleanTitle(req.body.title);
      if (!title) return res.status(400).json({ error: "Title cannot be empty" });
      updates.title = title;
    }
    if (req.body.completed !== undefined) {
      if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ error: "completed must be true or false" });
      }
      updates.completed = req.body.completed;
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    // new: true -> return the updated document
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) return notFound(res);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id - remove a task
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return notFound(res);
    res.json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
