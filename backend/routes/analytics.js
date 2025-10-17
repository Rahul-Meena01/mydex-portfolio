const express = require("express");
const router = express.Router();
const { requireDB } = require("../middleware/databaseMiddleware");
const {
  trackVisit,
  getAnalyticsSummary,
  getPopularPages,
  getVisits,
  getActiveVisitors,
  cleanupOldVisits,
  getVisitorsCount,
} = require("../controllers/analyticsController");

router.post("/track", requireDB, trackVisit);
router.get("/visitors", requireDB, getVisitorsCount);
router.get("/summary", requireDB, getAnalyticsSummary);
router.get("/popular-pages", requireDB, getPopularPages);
router.get("/visits", requireDB, getVisits);
router.get("/active", requireDB, getActiveVisitors);
router.delete("/cleanup", requireDB, cleanupOldVisits);

module.exports = router;
