const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const articleRoutes = require("./routes/articleRoutes");
const catRoutes = require("./routes/CatRoutes");
const userRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/articles", articleRoutes);
app.use("/categories", catRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("API is running");
  console.log("API RUNS");
  
});

const PORT = process.env.PORT || 5000;

// Export the Express app for Vercel
module.exports = app;