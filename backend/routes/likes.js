const express = require("express");
const router = express.Router();
const { requireDB } = require("../middleware/databaseMiddleware");
const Like = require("../models/Like");

router.get("/", requireDB, async (req, res) => {
  try {
    let likeDoc = await Like.findOne();
    if (!likeDoc) likeDoc = await Like.create({ count: 0 });
    res.json({ success: true, count: likeDoc.count });
  } catch (err) {
    console.error("Error fetching likes:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch like count" });
  }
});

router.post("/", requireDB, async (req, res) => {
  try {
    let likeDoc = await Like.findOne();
    if (!likeDoc) likeDoc = await Like.create({ count: 1 });
    else {
      likeDoc.count += 1;
      await likeDoc.save();
    }
    res.json({ success: true, count: likeDoc.count });
  } catch (err) {
    console.error("Error incrementing likes:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to increment like count" });
  }
});

module.exports = router;
