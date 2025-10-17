/**
 * Database middleware to check connection before processing requests
 * This prevents errors when MongoDB is not connected
 */

const { isDBConnected } = require("../config/database");

/**
 * Middleware to check if database is connected
 * If not connected, returns 503 Service Unavailable
 */
const requireDB = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: "Database not available. Please try again later.",
      error: "MongoDB connection not established",
    });
  }
  next();
};

/**
 * Middleware to check database but allow request to continue if not connected
 * Useful for non-critical features
 */
const checkDB = (req, res, next) => {
  req.dbAvailable = isDBConnected();
  next();
};

module.exports = {
  requireDB,
  checkDB,
};
