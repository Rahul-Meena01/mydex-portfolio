const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, required: true, trim: true },
    userAgent: { type: String, default: "Unknown" },
    pageVisited: { type: String, required: true, trim: true },
    timestamp: { type: Date, default: Date.now, index: true },
    sessionId: { type: String, required: true, index: true },
    country: { type: String, default: null },
    city: { type: String, default: null },
    region: { type: String, default: null },
    browser: { name: String, version: String },
    os: { name: String, version: String },
    device: {
      type: String,
      enum: ["mobile", "tablet", "desktop", "unknown"],
      default: "unknown",
    },
    referrer: { type: String, default: null },
    screenResolution: { type: String, default: null },
    language: { type: String, default: null },
  },
  { timestamps: true }
);

visitSchema.index({ timestamp: -1 });
visitSchema.index({ sessionId: 1, timestamp: -1 });
visitSchema.index({ pageVisited: 1, timestamp: -1 });
visitSchema.index({ country: 1 });
visitSchema.index({ ipAddress: 1, timestamp: -1 });

visitSchema.virtual("formattedDate").get(function () {
  return this.timestamp.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

visitSchema.statics.getTotalVisits = function (startDate, endDate) {
  const query = {};
  if (startDate || endDate) {
    query.timestamp = {};
    if (startDate) query.timestamp.$gte = new Date(startDate);
    if (endDate) query.timestamp.$lte = new Date(endDate);
  }
  return this.countDocuments(query);
};

visitSchema.statics.getUniqueVisitors = async function (startDate, endDate) {
  const match = {};
  if (startDate || endDate) {
    match.timestamp = {};
    if (startDate) match.timestamp.$gte = new Date(startDate);
    if (endDate) match.timestamp.$lte = new Date(endDate);
  }
  const result = await this.aggregate([
    { $match: match },
    { $group: { _id: "$ipAddress" } },
    { $count: "uniqueVisitors" },
  ]);
  return result.length > 0 ? result[0].uniqueVisitors : 0;
};

visitSchema.statics.getUniqueSessions = async function (startDate, endDate) {
  const match = {};
  if (startDate || endDate) {
    match.timestamp = {};
    if (startDate) match.timestamp.$gte = new Date(startDate);
    if (endDate) match.timestamp.$lte = new Date(endDate);
  }
  const result = await this.aggregate([
    { $match: match },
    { $group: { _id: "$sessionId" } },
    { $count: "uniqueSessions" },
  ]);
  return result.length > 0 ? result[0].uniqueSessions : 0;
};

visitSchema.statics.getPopularPages = function (
  limit = 10,
  startDate,
  endDate
) {
  const match = {};
  if (startDate || endDate) {
    match.timestamp = {};
    if (startDate) match.timestamp.$gte = new Date(startDate);
    if (endDate) match.timestamp.$lte = new Date(endDate);
  }
  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$pageVisited",
        visits: { $sum: 1 },
        uniqueVisitors: { $addToSet: "$ipAddress" },
      },
    },
    {
      $project: {
        page: "$_id",
        visits: 1,
        uniqueVisitors: { $size: "$uniqueVisitors" },
        _id: 0,
      },
    },
    { $sort: { visits: -1 } },
    { $limit: limit },
  ]);
};

visitSchema.statics.getVisitsByCountry = function (limit = 10) {
  return this.aggregate([
    { $match: { country: { $ne: null } } },
    {
      $group: {
        _id: "$country",
        visits: { $sum: 1 },
      },
    },
    {
      $project: {
        country: "$_id",
        visits: 1,
        _id: 0,
      },
    },
    { $sort: { visits: -1 } },
    { $limit: limit },
  ]);
};

visitSchema.statics.getVisitsByDevice = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$device",
        visits: { $sum: 1 },
      },
    },
    {
      $project: {
        device: "$_id",
        visits: 1,
        _id: 0,
      },
    },
    { $sort: { visits: -1 } },
  ]);
};

visitSchema.statics.getVisitsByBrowser = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$browser.name",
        visits: { $sum: 1 },
      },
    },
    {
      $project: {
        browser: "$_id",
        visits: 1,
        _id: 0,
      },
    },
    { $sort: { visits: -1 } },
  ]);
};

visitSchema.statics.getDailyVisits = function (days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return this.aggregate([
    { $match: { timestamp: { $gte: startDate } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
        },
        visits: { $sum: 1 },
        uniqueVisitors: { $addToSet: "$ipAddress" },
      },
    },
    {
      $project: {
        date: "$_id",
        visits: 1,
        uniqueVisitors: { $size: "$uniqueVisitors" },
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);
};

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
