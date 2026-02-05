/**
 * Feature Configuration
 * Centralized place to enable/disable features
 * Easy to manage without touching code
 */

export const FEATURES = {
  // Smart Recommendations
  SMART_RECOMMENDATIONS: {
    enabled: true,
    minViewsForRecommendations: 0, // Show recommendations even on first visit
    limit: 6, // Number of recommendations to show
    showReasons: true, // Show "why" we recommend each product
  },

  // Behavior Tracking
  BEHAVIOR_TRACKING: {
    enabled: true,
    trackViews: true,
    trackClicks: true,
    trackCart: true,
    trackPurchases: true,
    trackSearch: true,
    viewDuration: 1000, // ms before counting as a view
    maxStoredEvents: 100, // Keep last 100 events
  },

  // Analytics
  ANALYTICS: {
    enabled: true,
    dashboard: true,
    realTimeMetrics: true,
    productPerformance: true,
  },

  // Product Features
  PRODUCTS: {
    paginationLimit: 12,
    showRatings: true,
    showStock: true,
    showBestsellers: true,
    showNew: true,
    enableFilters: true,
    enableSearch: true,
  },

  // AI Features
  AI: {
    chatbot: true,
    voiceCommands: false, // Coming soon
    imageGeneration: false, // Coming soon
    aiRecommendations: true, // AI-powered suggestions
  },

  // Cart & Checkout
  SHOPPING: {
    enableCart: true,
    enableCheckout: true,
    enableWishlist: false, // Coming soon
    enableGuestCheckout: true,
  },

  // Admin Features
  ADMIN: {
    dashboard: true,
    productManagement: true,
    orderManagement: true,
    analytics: true,
    userManagement: false, // Coming soon
  },

  // UI Features
  UI: {
    darkMode: true,
    animations: true,
    animations_duration: 'normal', // 'fast' | 'normal' | 'slow'
    showNotifications: true,
    smoothScroll: true,
  },

  // Performance
  PERFORMANCE: {
    imageOptimization: true,
    lazyLoading: true,
    caching: true,
    compression: true,
  },

  // Security
  SECURITY: {
    https: true,
    csrfProtection: true,
    rateLimiting: true,
    inputValidation: true,
  },
};

/**
 * Feature check helper
 * @example isFeatureEnabled('SMART_RECOMMENDATIONS.enabled')
 */
export function isFeatureEnabled(path: string): boolean {
  const keys = path.split('.');
  let value: any = FEATURES;

  for (const key of keys) {
    value = value?.[key];
  }

  return value === true;
}

/**
 * Get feature config value
 * @example getFeatureConfig('SMART_RECOMMENDATIONS.limit') // returns 6
 */
export function getFeatureConfig(path: string): any {
  const keys = path.split('.');
  let value: any = FEATURES;

  for (const key of keys) {
    value = value?.[key];
  }

  return value;
}

/**
 * Update feature at runtime (for admin panel)
 */
export function setFeatureConfig(path: string, value: any): void {
  const keys = path.split('.');
  let obj: any = FEATURES;

  for (let i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
  }

  obj[keys[keys.length - 1]] = value;
  console.log(`Feature updated: ${path} = ${value}`);
}

// Feature labels for admin UI
export const FEATURE_LABELS: Record<string, string> = {
  'SMART_RECOMMENDATIONS.enabled': 'Smart Recommendations',
  'BEHAVIOR_TRACKING.enabled': 'User Behavior Tracking',
  'ANALYTICS.enabled': 'Analytics Dashboard',
  'AI.chatbot': 'AI Chatbot',
  'SHOPPING.enableWishlist': 'Wishlist Feature',
  'ADMIN.userManagement': 'User Management',
};
