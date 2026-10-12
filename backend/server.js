// Express server entry point (A1, A2, A6)
require("dotenv").config(); // load variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// A6: allow requests only from the React app, not from every origin
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" }));

// A1: parse JSON request bodies
app.use(express.json());

app.use("/api/tasks", taskRoutes);

// A2: connect to MongoDB using the connection string from .env
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Copy .env.example to .env and set it.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
