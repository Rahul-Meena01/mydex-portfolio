/**
 * Frontend Configuration
 * Centralized configuration for API endpoints and environment settings
 */

const CONFIG = {
  // API Base URL - Update this for production deployment
  API_BASE_URL:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000/api" // Local development
      : "https://mydex-portfolio-backend.onrender.com/api", // Production - Render backend

  // Feature flags
  FEATURES: {
    ANALYTICS_ENABLED: true,
    LIKE_BUTTON_ENABLED: true,
    CONTACT_FORM_ENABLED: true,
    VISITORS_COUNT_ENABLED: true,
  },

  // Analytics configuration
  ANALYTICS: {
    SESSION_DURATION: 30 * 60 * 1000, // 30 minutes
    DEBUG: window.location.hostname === "localhost", // Debug mode only in development
  },

  // UI configuration
  UI: {
    PARTICLES_COUNT: 50,
    ANIMATION_DURATION: 300, // milliseconds
  },
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.FEATURES);
Object.freeze(CONFIG.ANALYTICS);
Object.freeze(CONFIG.UI);

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
