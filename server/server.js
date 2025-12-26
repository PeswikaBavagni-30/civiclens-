require("dotenv").config(); // MUST be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("CivicLens backend running 🚀");
});

// MongoDB connection + Server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
