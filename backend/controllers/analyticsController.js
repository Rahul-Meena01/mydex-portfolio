const Visit = require("../models/Visit");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");

const parseUserAgent = (userAgentString) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  return {
    browser: {
      name: result.browser.name || "Unknown",
      version: result.browser.version || "Unknown",
    },
    os: {
      name: result.os.name || "Unknown",
      version: result.os.version || "Unknown",
    },
    device: result.device.type || "desktop",
  };
};

const getGeolocation = (ip) => {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1") {
    return { country: "Local", city: "Localhost", region: "Development" };
  }
  const geo = geoip.lookup(ip);
  if (geo) {
    return {
      country: geo.country || null,
      city: geo.city || null,
      region: geo.region || null,
    };
  }
  return { country: null, city: null, region: null };
};

exports.trackVisit = async (req, res) => {
  try {
    const { pageVisited, sessionId, referrer, screenResolution, language } =
      req.body;
    if (!pageVisited || !sessionId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "pageVisited and sessionId are required",
        });
    }
    const ipAddress =
      req.ip ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress ||
      "Unknown";
    const userAgentString = req.get("user-agent") || "Unknown";
    const { browser, os, device } = parseUserAgent(userAgentString);
    const geo = getGeolocation(ipAddress);
    const visit = await Visit.create({
      ipAddress,
      userAgent: userAgentString,
      pageVisited,
      sessionId,
      referrer,
      screenResolution,
      language,
      ...geo,
      browser,
      os,
      device,
    });
    res.status(201).json({
      success: true,
      message: "Visit tracked successfully",
      data: { id: visit._id, timestamp: visit.timestamp },
    });
  } catch (error) {
    console.error("Error tracking visit:", error);
    res.status(500).json({ success: false, message: "Failed to track visit" });
  }
};

exports.getAnalyticsSummary = async (req, res) => {
  try {
    const { startDate, endDate, days = 30 } = req.query;
    let start = startDate ? new Date(startDate) : new Date();
    let end = endDate ? new Date(endDate) : new Date();
    if (!startDate && !endDate) {
      start.setDate(start.getDate() - parseInt(days));
    }
    const [
      totalVisits,
      uniqueVisitors,
      uniqueSessions,
      popularPages,
      visitsByCountry,
      visitsByDevice,
      visitsByBrowser,
      dailyVisits,
    ] = await Promise.all([
      Visit.getTotalVisits(start, end),
      Visit.getUniqueVisitors(start, end),
      Visit.getUniqueSessions(start, end),
      Visit.getPopularPages(5, start, end),
      Visit.getVisitsByCountry(10),
      Visit.getVisitsByDevice(),
      Visit.getVisitsByBrowser(),
      Visit.getDailyVisits(parseInt(days)),
    ]);
    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
    const avgVisitsPerDay = Math.round(totalVisits / daysDiff);
    const bounceVisitors = await Visit.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end } } },
      { $group: { _id: "$sessionId", pageCount: { $sum: 1 } } },
      { $match: { pageCount: 1 } },
      { $count: "bounceCount" },
    ]);
    const bounceRate =
      uniqueSessions > 0
        ? Math.round(
            ((bounceVisitors[0]?.bounceCount || 0) / uniqueSessions) * 100
          )
        : 0;
    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalVisits,
          uniqueVisitors,
          uniqueSessions,
          avgVisitsPerDay,
          bounceRate: `${bounceRate}%`,
          dateRange: { start: start.toISOString(), end: end.toISOString() },
        },
        popularPages,
        visitsByCountry,
        visitsByDevice,
        visitsByBrowser,
        dailyVisits,
      },
    });
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve analytics summary",
      });
  }
};

exports.getPopularPages = async (req, res) => {
  try {
    const { limit = 10, startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const popularPages = await Visit.getPopularPages(
      parseInt(limit),
      start,
      end
    );
    res
      .status(200)
      .json({ success: true, count: popularPages.length, data: popularPages });
  } catch (error) {
    console.error("Error getting popular pages:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve popular pages" });
  }
};

exports.getVisits = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      startDate,
      endDate,
      pageVisited,
      country,
    } = req.query;
    const query = {};
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    if (pageVisited) query.pageVisited = pageVisited;
    if (country) query.country = country;
    const skip = (page - 1) * limit;
    const visits = await Visit.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select("-__v");
    const total = await Visit.countDocuments(query);
    res.status(200).json({
      success: true,
      count: visits.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: visits,
    });
  } catch (error) {
    console.error("Error getting visits:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve visits" });
  }
};

exports.getActiveVisitors = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeVisitors = await Visit.aggregate([
      { $match: { timestamp: { $gte: fiveMinutesAgo } } },
      {
        $group: {
          _id: "$sessionId",
          lastActivity: { $max: "$timestamp" },
          pagesViewed: { $sum: 1 },
          currentPage: { $last: "$pageVisited" },
        },
      },
      { $sort: { lastActivity: -1 } },
    ]);
    res
      .status(200)
      .json({
        success: true,
        activeCount: activeVisitors.length,
        data: activeVisitors,
      });
  } catch (error) {
    console.error("Error getting active visitors:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve active visitors" });
  }
};

exports.cleanupOldVisits = async (req, res) => {
  try {
    const { days = 90 } = req.query;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
    const result = await Visit.deleteMany({ timestamp: { $lt: cutoffDate } });
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} visit records older than ${days} days`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error cleaning up visits:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to cleanup old visits" });
  }
};

exports.getVisitorsCount = async (req, res) => {
  try {
    const count = await Visit.distinct("sessionId").then((arr) => arr.length);
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error getting visitors count:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get visitors count" });
  }
};
