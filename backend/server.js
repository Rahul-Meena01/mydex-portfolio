const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const connectDB = require("./config/database");
const healthRoutes = require("./routes/health");
const contactRoutes = require("./routes/contact");
const analyticsRoutes = require("./routes/analytics");
const likesRoutes = require("./routes/likes");
const { trackVisitMiddleware } = require("./middleware/analyticsMiddleware");

// Trust proxy so correct client IP is used behind proxies (Render/Heroku)
app.set("trust proxy", true);

// Security headers with helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow inline scripts for our frontend
    crossOriginEmbedderPolicy: false, // Allow external resources (fonts, images)
  })
);

// Rate limiting for analytics endpoints to prevent abuse
const analyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// CORS configuration - Allow requests from configured origins
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : [
      "https://rahul-meena01.github.io",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
    ];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      process.env.NODE_ENV === "development"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

console.log("🔐 CORS enabled for origins:", allowedOrigins);

app.use(cors(corsOptions));
app.use(cookieParser());
// Use Express built-in body parsers (avoid double-parsing)
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Connect to MongoDB
connectDB();

// Analytics tracking middleware: automatically track non-API page visits
// Note: This is safe; middleware skips API and static asset paths.
app.use(trackVisitMiddleware);

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsLimiter, analyticsRoutes); // Rate-limited analytics
app.use("/api/likes", likesRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Pokédex API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/api/health",
      contact: "/api/contact",
      contactStats: "/api/contact/stats",
      analytics: {
        track: "/api/analytics/track",
        summary: "/api/analytics/summary",
        popularPages: "/api/analytics/popular-pages",
        active: "/api/analytics/active",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  // Close server & exit process
  process.exit(1);
});

// Handle SIGTERM for graceful shutdown in cloud environments
process.on("SIGTERM", () => {
  console.log("SIGTERM received: shutting down server gracefully");
  process.exit(0);
});
