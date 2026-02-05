/**
 * Smart Utilities
 * Helper functions for personalization, analytics, and recommendations
 */

import { Product } from '@/types';
import { behaviorTracker, UserAnalytics } from './behavior-tracker';
import { recommendationEngine, UserBehavior } from './recommendation-engine';

/**
 * Get personalized greeting based on user behavior
 */
export function getPersonalizedGreeting(analytics: UserAnalytics | null): string {
  if (!analytics) {
    return 'Welcome to Zayx! ✨';
  }

  if (analytics.totalPurchases === 0) {
    return `Welcome back! ${analytics.favoriteCategories.length > 0 ? `We've got new ${analytics.favoriteCategories[0]} items for you.` : 'Explore our latest products.'}`;
  }

  if (analytics.totalPurchases === 1) {
    return `Great first purchase! Ready to find something else?`;
  }

  return `Welcome back! We've prepared ${analytics.favoriteCategories.length > 0 ? analytics.favoriteCategories[0] : 'new'} items just for you.`;
}

/**
 * Calculate user lifetime value (LTV)
 */
export function calculateLTV(analytics: UserAnalytics): number {
  return analytics.totalSpent;
}

/**
 * Get user engagement score (0-100)
 */
export function getEngagementScore(analytics: UserAnalytics): number {
  if (!analytics) return 0;

  let score = 0;

  // Views (max 30 points)
  score += Math.min((analytics.totalViews / 10) * 30, 30);

  // Purchases (max 40 points)
  score += Math.min(analytics.totalPurchases * 10, 40);

  // Conversion rate (max 20 points)
  score += analytics.conversionRate * 100 * 0.2;

  // Session duration (max 10 points)
  score += Math.min((analytics.avgSessionDuration / 30) * 10, 10);

  return Math.min(score, 100);
}

/**
 * Personalize product prices based on user tier
 * (This is an example - use carefully for legal compliance)
 */
export function getPersonalizedPrice(
  product: Product,
  analytics: UserAnalytics | null,
  discountPercentage: number = 0
): number {
  if (!analytics || analytics.totalPurchases === 0) {
    return product.price;
  }

  // Loyal customers (5+ purchases) get 5% discount
  if (analytics.totalPurchases >= 5) {
    discountPercentage = Math.max(discountPercentage, 5);
  }

  // High-value customers (spent $500+) get 10% discount
  if (analytics.totalSpent >= 500) {
    discountPercentage = Math.max(discountPercentage, 10);
  }

  const discounted = product.price * (1 - discountPercentage / 100);
  return Math.round(discounted * 100) / 100;
}

/**
 * Get dynamic product badges based on user behavior
 */
export function getDynamicBadges(product: Product, analytics: UserAnalytics | null): string[] {
  const badges: string[] = [];

  if (product.isBestseller) badges.push('🏆 Bestseller');
  if (product.isNew) badges.push('✨ New');
  if (product.rating && product.rating >= 4.8) badges.push('⭐ Top Rated');

  // Personalized badges
  if (analytics && analytics.favoriteCategories.includes(product.category)) {
    badges.push('💫 In Your Favorite');
  }

  if (product.compareAtPrice && product.price < product.compareAtPrice) {
    const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
    if (discount > 0) {
      badges.push(`💰 Save ${discount}%`);
    }
  }

  return badges;
}

/**
 * Get trending products in user's favorite category
 */
export function getTrendingInCategory(
  products: Product[],
  category: string | null
): Product[] {
  if (!category) {
    return products
      .filter(p => p.isBestseller || p.rating! >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }

  return products
    .filter(p => p.category === category && (p.isBestseller || p.rating! >= 4.5))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);
}

/**
 * Get next recommended action for user
 */
export function getNextAction(analytics: UserAnalytics | null): {
  action: string;
  target: string;
  emoji: string;
} {
  if (!analytics || analytics.totalViews === 0) {
    return {
      action: 'Explore our collection',
      target: '/shop/products',
      emoji: '🛍️',
    };
  }

  if (analytics.totalViews > 0 && analytics.totalPurchases === 0) {
    return {
      action: 'Check out our bestsellers',
      target: '/shop/products?bestseller=true',
      emoji: '⭐',
    };
  }

  if (analytics.favoriteCategories.length > 0) {
    return {
      action: `Browse new ${analytics.favoriteCategories[0]} items`,
      target: `/shop/products?category=${analytics.favoriteCategories[0]}`,
      emoji: '📦',
    };
  }

  return {
    action: 'View personalized recommendations',
    target: '/shop/products',
    emoji: '💡',
  };
}

/**
 * Format analytics for display
 */
export function formatAnalytics(analytics: UserAnalytics): {
  label: string;
  value: string;
  emoji: string;
}[] {
  return [
    {
      label: 'Total Views',
      value: analytics.totalViews.toString(),
      emoji: '👁️',
    },
    {
      label: 'Purchases',
      value: analytics.totalPurchases.toString(),
      emoji: '💳',
    },
    {
      label: 'Total Spent',
      value: `$${analytics.totalSpent}`,
      emoji: '💰',
    },
    {
      label: 'Avg Order',
      value: `$${analytics.averageOrderValue.toFixed(2)}`,
      emoji: '📊',
    },
    {
      label: 'Conversion',
      value: `${(analytics.conversionRate * 100).toFixed(1)}%`,
      emoji: '📈',
    },
  ];
}

/**
 * Check if product is in user's purchase history
 */
export function hasUserPurchased(productId: string): boolean {
  const behavior = behaviorTracker.getBehaviorProfile();
  return behavior.purchasedProducts.includes(productId);
}

/**
 * Check if product is recently viewed by user
 */
export function isRecentlyViewed(productId: string, minutesThreshold: number = 60): boolean {
  const behavior = behaviorTracker.getBehaviorProfile();
  const lastViewTime = behavior.lastViewedAt[productId];

  if (!lastViewTime) return false;

  const minutesPassed = (Date.now() - lastViewTime) / 1000 / 60;
  return minutesPassed <= minutesThreshold;
}

/**
 * Get user's shopping journey summary
 */
export function getJourneySummary(analytics: UserAnalytics | null): string {
  if (!analytics) {
    return 'Just getting started 🚀';
  }

  if (analytics.totalPurchases === 0) {
    if (analytics.totalViews < 5) {
      return 'Just browsing 👀';
    }
    return 'Comparing options 🔍';
  }

  if (analytics.totalPurchases === 1) {
    return 'First time buyer 🎉';
  }

  if (analytics.totalPurchases < 5) {
    return 'Becoming a regular 📈';
  }

  if (analytics.totalSpent >= 1000) {
    return 'VIP Customer 👑';
  }

  return 'Loyal Customer 🌟';
}

/**
 * Get intelligent search suggestions
 */
export function getSearchSuggestions(
  query: string,
  products: Product[]
): string[] {
  if (!query || query.length < 2) return [];

  const suggestions = new Set<string>();

  // From product names
  products.forEach(product => {
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.name);
    }
  });

  // From tags
  products.forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    }
  });

  return Array.from(suggestions).slice(0, 5);
}

/**
 * Predict if user will make a purchase
 * Based on engagement metrics
 */
export function predictPurchaseLikelihood(analytics: UserAnalytics | null): {
  score: number; // 0-100
  label: string;
  message: string;
} {
  if (!analytics) {
    return {
      score: 30,
      label: 'Low',
      message: 'New visitor - encourage exploration',
    };
  }

  let score = 0;

  // If already purchased, high likelihood
  if (analytics.totalPurchases > 0) {
    score = 85;
    return {
      score,
      label: 'Very High',
      message: 'Returning customer - offer loyalty rewards',
    };
  }

  // View count impact
  score += Math.min(analytics.totalViews * 5, 40);

  // High conversion rate
  if (analytics.conversionRate > 0.1) {
    score += 20;
  }

  // Long session
  if (analytics.avgSessionDuration > 5) {
    score += 20;
  }

  // Multiple categories viewed
  if (analytics.favoriteCategories.length > 2) {
    score += 10;
  }

  if (score >= 70) {
    return {
      score,
      label: 'High',
      message: 'Ready to convert - show special offer',
    };
  }

  if (score >= 40) {
    return {
      score,
      label: 'Medium',
      message: 'Interested - encourage with recommendations',
    };
  }

  return {
    score,
    label: 'Low',
    message: 'Still exploring - provide guidance',
  };
}

/**
 * Get smart notification message
 */
export function getSmartNotification(analytics: UserAnalytics | null): {
  show: boolean;
  message: string;
  action: string;
  target: string;
} {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  if (!analytics) {
    return {
      show: false,
      message: '',
      action: '',
      target: '',
    };
  }

  // Weekend special
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      show: true,
      message: 'Weekend Special! Check out our trending items',
      action: 'View Trending',
      target: '/shop/products?bestseller=true',
    };
  }

  // If not purchased yet and has high engagement
  const { score } = predictPurchaseLikelihood(analytics);
  if (score >= 60 && analytics.totalPurchases === 0) {
    return {
      show: true,
      message: `Ready to save on ${analytics.favoriteCategories[0] || 'tech'}?`,
      action: 'Shop Now',
      target: analytics.favoriteCategories.length > 0
        ? `/shop/products?category=${analytics.favoriteCategories[0]}`
        : '/shop/products',
    };
  }

  // Returning customer incentive
  if (analytics.totalPurchases > 1) {
    return {
      show: true,
      message: 'Your loyal customer discount is waiting!',
      action: 'Claim Discount',
      target: '/shop/products?loyal=true',
    };
  }

  return {
    show: false,
    message: '',
    action: '',
    target: '',
  };
}
