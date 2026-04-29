/**
 * Pokédex Portfolio Configuration
 * Fully static — no backend required
 */

const CONFIG = {
  // Formspree form endpoint (replace YOUR_FORM_ID with your real Formspree ID)
  FORMSPREE_URL: "https://formspree.io/f/mkoywnew",

  // Feature flags
  FEATURES: {
    LIKE_BUTTON_ENABLED: true,
    CONTACT_FORM_ENABLED: true,
  },

  // Like counter seed (starting count for social proof)
  LIKE_SEED: 42,

  // UI configuration
  UI: {
    PARTICLES_COUNT: 40,
    ANIMATION_DURATION: 300,
  },
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.FEATURES);
Object.freeze(CONFIG.UI);
