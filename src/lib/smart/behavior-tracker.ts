import { UserBehavior } from './recommendation-engine';

/**
 * Smart Behavior Tracker
 * Tracks user interactions and builds a behavior profile for personalization
 */

export interface Event {
  type: 'view' | 'click' | 'purchase' | 'search' | 'addToCart' | 'removeFromCart';
  productId?: string;
  category?: string;
  price?: number;
  timestamp: number;
  sessionId: string;
}

export interface UserAnalytics {
  totalViews: number;
  totalPurchases: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteCategories: string[];
  lastActiveAt: number;
  sessionCount: number;
  avgSessionDuration: number;
  conversionRate: number; // purchases / views
}

class BehaviorTracker {
  private storageKey = 'zayx_user_behavior';
  private eventsKey = 'zayx_user_events';
  private sessionId = this.generateSessionId();

  /**
   * Track a user event
   */
  trackEvent(event: Omit<Event, 'sessionId' | 'timestamp'>) {
    try {
      const fullEvent: Event = {
        ...event,
        timestamp: Date.now(),
        sessionId: this.sessionId,
      };

      // Store in localStorage
      const events = this.getEvents();
      events.push(fullEvent);

      // Keep only last 100 events (to prevent storage bloat)
      if (events.length > 100) {
        events.shift();
      }

      localStorage.setItem(this.eventsKey, JSON.stringify(events));

      // Update behavior profile
      this.updateBehaviorProfile(fullEvent);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  /**
   * Get or create user behavior profile
   */
  getBehaviorProfile(): UserBehavior {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load behavior profile:', error);
    }

    // Default profile
    return {
      viewedProducts: [],
      purchasedProducts: [],
      clickedProducts: [],
      category: [],
      priceRange: { min: 0, max: 1000 },
      lastViewedAt: {},
    };
  }

  /**
   * Update behavior profile based on event
   */
  private updateBehaviorProfile(event: Event) {
    const behavior = this.getBehaviorProfile();

    switch (event.type) {
      case 'view':
        if (event.productId && !behavior.viewedProducts.includes(event.productId)) {
          behavior.viewedProducts.unshift(event.productId);
          // Keep only last 20 viewed products
          behavior.viewedProducts = behavior.viewedProducts.slice(0, 20);
        }
        if (event.productId) {
          behavior.lastViewedAt[event.productId] = event.timestamp;
        }
        break;

      case 'purchase':
        if (event.productId && !behavior.purchasedProducts.includes(event.productId)) {
          behavior.purchasedProducts.unshift(event.productId);
        }
        if (event.category && !behavior.category.includes(event.category)) {
          behavior.category.push(event.category);
        }
        // Update price range based on purchases
        if (event.price) {
          behavior.priceRange.min = Math.min(behavior.priceRange.min, event.price);
          behavior.priceRange.max = Math.max(behavior.priceRange.max, event.price * 1.5);
        }
        break;

      case 'click':
        if (event.productId && !behavior.clickedProducts.includes(event.productId)) {
          behavior.clickedProducts.unshift(event.productId);
          behavior.clickedProducts = behavior.clickedProducts.slice(0, 20);
        }
        break;

      case 'search':
        if (event.category && !behavior.category.includes(event.category)) {
          behavior.category.push(event.category);
        }
        break;
    }

    // Save updated profile
    localStorage.setItem(this.storageKey, JSON.stringify(behavior));
  }

  /**
   * Get all tracked events
   */
  getEvents(): Event[] {
    try {
      const stored = localStorage.getItem(this.eventsKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Calculate analytics from events
   */
  getAnalytics(): UserAnalytics {
    const events = this.getEvents();
    const behavior = this.getBehaviorProfile();

    const views = events.filter(e => e.type === 'view').length;
    const purchases = events.filter(e => e.type === 'purchase').length;
    const purchases_events = events.filter(e => e.type === 'purchase');

    const totalSpent = purchases_events.reduce((sum, e) => sum + (e.price || 0), 0);

    const categoryCount: Record<string, number> = {};
    behavior.category.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const favoriteCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    // Calculate session metrics
    const sessionEvents = events.filter(e => e.sessionId === this.sessionId);
    const sessionDurations: number[] = [];

    if (sessionEvents.length > 0) {
      const sessionStart = sessionEvents[0].timestamp;
      const sessionEnd = sessionEvents[sessionEvents.length - 1].timestamp;
      const currentSessionDuration = (sessionEnd - sessionStart) / 1000 / 60; // in minutes
      sessionDurations.push(currentSessionDuration);
    }

    const avgSessionDuration = sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
      : 0;

    return {
      totalViews: views,
      totalPurchases: purchases,
      totalSpent: Math.round(totalSpent * 100) / 100,
      averageOrderValue: purchases > 0 ? Math.round((totalSpent / purchases) * 100) / 100 : 0,
      favoriteCategories,
      lastActiveAt: events.length > 0 ? events[events.length - 1].timestamp : Date.now(),
      sessionCount: 1,
      avgSessionDuration,
      conversionRate: views > 0 ? Math.round((purchases / views) * 100) / 100 : 0,
    };
  }

  /**
   * Clear all tracked data
   */
  clearData() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.eventsKey);
    this.sessionId = this.generateSessionId();
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  /**
   * Get current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}

export const behaviorTracker = new BehaviorTracker();
