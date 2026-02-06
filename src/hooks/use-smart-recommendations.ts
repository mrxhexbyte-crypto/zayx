'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { behaviorTracker } from '@/lib/smart/behavior-tracker';
import { recommendationEngine, RecommendationResult } from '@/lib/smart/recommendation-engine';

/**
 * Hook to get smart product recommendations
 * Automatically tracks product views and generates personalized recommendations
 */
export function useSmartRecommendations(allProducts: Product[], limit: number = 6) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const behavior = behaviorTracker.getBehaviorProfile();

      // If no viewing history, return trending products
      if (behavior.viewedProducts.length === 0) {
        const trending = recommendationEngine.getTrendingProducts(allProducts, limit);
        setRecommendations(trending);
        setIsLoading(false);
        return;
      }

      // Generate recommendations
      const recs = recommendationEngine.generateRecommendations(behavior, allProducts, limit);

      // Map recommendations to products
      const recProducts = recs
        .map(rec => allProducts.find(p => p.id === rec.productId))
        .filter((p): p is Product => !!p);

      // Map reasons
      const reasonMap: Record<string, string> = {};
      recs.forEach(rec => {
        reasonMap[rec.productId] = rec.reason;
      });

      setRecommendations(recProducts);
      setReasons(reasonMap);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [allProducts, limit]);

  return { recommendations, reasons, isLoading };
}

/**
 * Hook to track product view events
 * Call this when a product is viewed
 */
export function useTrackProductView(productId: string | undefined, product?: Product) {
  useEffect(() => {
    if (!productId || !product) return;

    // Track after a small delay to ensure genuine view
    const timer = setTimeout(() => {
      behaviorTracker.trackEvent({
        type: 'view',
        productId,
        category: product.category,
        price: product.price,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [productId, product]);
}

/**
 * Hook to track product interactions
 */
export function useTrackInteraction() {
  return {
    trackClick: (productId: string, category?: string) => {
      behaviorTracker.trackEvent({
        type: 'click',
        productId,
        category,
      });
    },
    trackAddToCart: (productId: string, price?: number) => {
      behaviorTracker.trackEvent({
        type: 'addToCart',
        productId,
        price,
      });
    },
    trackRemoveFromCart: (productId: string) => {
      behaviorTracker.trackEvent({
        type: 'removeFromCart',
        productId,
      });
    },
    trackPurchase: (productId: string, price: number, category?: string) => {
      behaviorTracker.trackEvent({
        type: 'purchase',
        productId,
        price,
        category,
      });
    },
    trackSearch: (query: string, category?: string) => {
      behaviorTracker.trackEvent({
        type: 'search',
        category,
      });
    },
  };
}

/**
 * Hook to get user analytics
 */
export function useUserAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const data = behaviorTracker.getAnalytics();
    setAnalytics(data);
  }, []);

  return analytics;
}

/**
 * Hook to search products intelligently
 */
export function useSmartSearch(allProducts: Product[]) {
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { trackSearch } = useTrackInteraction();

  const search = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = recommendationEngine.search(query, allProducts);
      setResults(searchResults);
      trackSearch(query);
    } finally {
      setIsSearching(false);
    }
  };

  return { results, isSearching, search };
}
