const Visit = require("../models/Visit");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
const { v4: uuidv4 } = require("uuid");

// Helper function to parse user agent
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

// Helper function to get geolocation from IP
const getGeolocation = (ip) => {
  // Handle localhost
  if (ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1") {
    return {
      country: "Local",
      city: "Localhost",
      region: "Development",
    };
  }

  const geo = geoip.lookup(ip);

  if (geo) {
    return {
      country: geo.country || null,
      city: geo.city || null,
      region: geo.region || null,
    };
  }

  return {
    country: null,
    city: null,
    region: null,
  };
};

// Generate or retrieve session ID from cookies
const getSessionId = (req, res) => {
  // Check if session cookie exists
  if (req.cookies && req.cookies.sessionId) {
    return req.cookies.sessionId;
  }

  // Generate new session ID
  const sessionId = uuidv4();

  // Set cookie (30 minutes expiration)
  res.cookie("sessionId", sessionId, {
    maxAge: 30 * 60 * 1000, // 30 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return sessionId;
};

// Middleware to automatically track page visits
const trackVisitMiddleware = async (req, res, next) => {
  try {
    // Skip tracking for API routes, health checks, and static files
    const skipPaths = [
      "/api/",
      "/health",
      "/favicon.ico",
      "/robots.txt",
      "/sitemap.xml",
      ".css",
      ".js",
      ".jpg",
      ".png",
      ".svg",
      ".ico",
    ];

    const shouldSkip = skipPaths.some((path) => req.path.includes(path));

    if (shouldSkip) {
      return next();
    }

    // Get session ID
    const sessionId = getSessionId(req, res);

    // Get IP address
    const ipAddress =
      req.ip ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress ||
      "Unknown";

    // Get user agent
    const userAgentString = req.get("user-agent") || "Unknown";

    // Parse user agent
    const { browser, os, device } = parseUserAgent(userAgentString);

    // Get geolocation
    const geo = getGeolocation(ipAddress);

    // Get referrer
    const referrer = req.get("referer") || req.get("referrer") || null;

    // Get page visited (full path)
    const pageVisited = req.originalUrl || req.path;

    // Track visit asynchronously (don't wait for it to complete)
    Visit.create({
      ipAddress,
      userAgent: userAgentString,
      pageVisited,
      sessionId,
      referrer,
      ...geo,
      browser,
      os,
      device,
      language: req.get("accept-language")?.split(",")[0] || null,
    }).catch((err) => {
      console.error("Error tracking visit in middleware:", err.message);
    });

    // Continue to next middleware
    next();
  } catch (error) {
    console.error("Analytics middleware error:", error.message);
    // Don't block the request if analytics fails
    next();
  }
};

// Middleware to track specific events (not just page views)
const trackEvent = (eventName, eventData = {}) => {
  return async (req, res, next) => {
    try {
      const sessionId = getSessionId(req, res);
      const ipAddress = req.ip || req.connection.remoteAddress || "Unknown";

      await Visit.create({
        ipAddress,
        sessionId,
        pageVisited: `event:${eventName}`,
        userAgent: req.get("user-agent") || "Unknown",
        ...eventData,
      });
    } catch (error) {
      console.error("Error tracking event:", error.message);
    }

    next();
  };
};

// Middleware to inject analytics data into response
const injectAnalytics = (req, res, next) => {
  // Add analytics helper to request
  req.analytics = {
    sessionId: getSessionId(req, res),
    ipAddress: req.ip || req.connection.remoteAddress,
  };

  next();
};

module.exports = {
  trackVisitMiddleware,
  trackEvent,
  injectAnalytics,
  getSessionId,
};
