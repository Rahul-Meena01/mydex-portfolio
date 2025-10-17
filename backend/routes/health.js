const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// @route   GET /api/health
// @desc    Health check endpoint
// @access  Public
router.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const healthCheck = {
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    server: {
      status: "healthy",
      port: process.env.PORT || 5000,
    },
    database: {
      status: dbStatus[dbState],
      connected: dbState === 1,
      name: mongoose.connection.name || "Not connected",
    },
    memory: {
      usage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
    },
  };

  // Set status code based on database connection
  const statusCode = dbState === 1 ? 200 : 503;

  res.status(statusCode).json(healthCheck);
});

// @route   GET /api/health/ping
// @desc    Simple ping endpoint
// @access  Public
router.get("/ping", (req, res) => {
  res.json({
    success: true,
    message: "pong",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
