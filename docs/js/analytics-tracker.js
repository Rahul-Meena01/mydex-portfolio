/**
 * Pokédex Portfolio Analytics Tracker
 * Lightweight visitor tracking script
 */

(function () {
  "use strict";

  // Get API URL from config or use default
  const getApiUrl = () => {
    if (typeof CONFIG !== "undefined" && CONFIG.API_BASE_URL) {
      return CONFIG.API_BASE_URL + "/analytics/track";
    }

    // Fallback: Detect environment
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    return isLocal
      ? "http://localhost:5000/api/analytics/track"
      : "https://your-backend-api.onrender.com/api/analytics/track"; // UPDATE THIS!
  };

  // Configuration
  const ANALYTICS_CONFIG = {
    API_URL: getApiUrl(),
    SESSION_DURATION:
      typeof CONFIG !== "undefined" && CONFIG.ANALYTICS
        ? CONFIG.ANALYTICS.SESSION_DURATION
        : 30 * 60 * 1000, // 30 minutes
    DEBUG:
      typeof CONFIG !== "undefined" && CONFIG.ANALYTICS
        ? CONFIG.ANALYTICS.DEBUG
        : window.location.hostname === "localhost",
  };

  // Check if analytics is enabled
  if (
    typeof CONFIG !== "undefined" &&
    CONFIG.FEATURES &&
    !CONFIG.FEATURES.ANALYTICS_ENABLED
  ) {
    console.log("[Analytics] Disabled in configuration");
    return;
  }

  // Helper to log debug messages
  function log(...args) {
    if (ANALYTICS_CONFIG.DEBUG) {
      console.log("[Analytics]", ...args);
    }
  }

  // Generate or retrieve session ID
  function getSessionId() {
    let sessionId = localStorage.getItem("analyticsSessionId");
    let sessionTimestamp = localStorage.getItem("analyticsSessionTimestamp");

    const now = Date.now();

    // Check if session expired
    if (
      !sessionId ||
      !sessionTimestamp ||
      now - parseInt(sessionTimestamp) > ANALYTICS_CONFIG.SESSION_DURATION
    ) {
      sessionId =
        "session_" + now + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("analyticsSessionId", sessionId);
    }

    // Update timestamp
    localStorage.setItem("analyticsSessionTimestamp", now.toString());

    return sessionId;
  }

  // Get current page path
  function getCurrentPage() {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  }

  // Track page view
  async function trackPageView(pageUrl = null) {
    try {
      const data = {
        pageVisited: pageUrl || getCurrentPage(),
        sessionId: getSessionId(),
        referrer: document.referrer || null,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || navigator.userLanguage,
      };

      log("Tracking page view:", data.pageVisited);

      const response = await fetch(ANALYTICS_CONFIG.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        log("Track successful:", result);
      } else {
        log("Track failed:", response.status);
      }
    } catch (error) {
      log("Error tracking page view:", error.message);
    }
  }

  // Track custom event
  window.trackEvent = async function (eventName, eventData = {}) {
    try {
      const data = {
        pageVisited: `event:${eventName}`,
        sessionId: getSessionId(),
        referrer: eventData.referrer || null,
        ...eventData,
      };

      log("Tracking event:", eventName, eventData);

      await fetch(ANALYTICS_CONFIG.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      log("Error tracking event:", error.message);
    }
  };

  // Initialize tracking
  function initTracking() {
    log("Initializing analytics tracking...");

    // Track initial page load
    trackPageView();

    // Track hash changes (for single-page apps)
    window.addEventListener("hashchange", function () {
      log("Hash changed");
      trackPageView();
    });

    // Track page visibility changes
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        log("Page became visible");
        trackPageView();
      }
    });

    log("Analytics tracking initialized");
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTracking);
  } else {
    initTracking();
  }

  // Expose tracking function globally
  window.Analytics = {
    trackPageView: trackPageView,
    trackEvent: window.trackEvent,
    getSessionId: getSessionId,
  };
})();
