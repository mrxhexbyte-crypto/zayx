/**
 * Performance Optimization Utilities
 * - Lazy loading utilities
 * - Image optimization helpers
 * - Code splitting strategies
 * - Caching utilities
 * - Performance monitoring
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ==================== LAZY LOADING ====================

/**
 * Intersection Observer hook for lazy loading
 * Usage: const { ref, isVisible } = useIntersectionObserver()
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/**
 * Lazy load images with fallback
 */
export async function lazyLoadImage(
  src: string,
  fallback?: string
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(fallback || src);
    img.src = src;
  });
}

// ==================== DEBOUNCING & THROTTLING ====================

/**
 * Debounce function calls
 * Useful for search, resize, input handlers
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Throttle function calls
 * Useful for scroll events, resize handlers
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCallRef.current >= delay) {
        callback(...args);
        lastCallRef.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastCallRef.current = Date.now();
        }, delay - (now - lastCallRef.current));
      }
    },
    [callback, delay]
  );
}

// ==================== CACHING ====================

/**
 * Simple cache utility with TTL (Time To Live)
 */
export class Cache<K, V> {
  private cache = new Map<K, { value: V; expires: number }>();
  private ttl: number;

  constructor(ttlMs: number = 5 * 60 * 1000) {
    this.ttl = ttlMs;
  }

  set(key: K, value: V, ttl?: number) {
    const expireTime = Date.now() + (ttl ?? this.ttl);
    this.cache.set(key, { value, expires: expireTime });
  }

  get(key: K): V | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: K) {
    this.cache.delete(key);
  }
}

/**
 * Local Storage cache with fallback
 */
export function useCacheStore<T>(
  key: string,
  initialValue?: T,
  ttl: number = 24 * 60 * 60 * 1000 // 24 hours
) {
  const setCache = useCallback(
    (value: T) => {
      try {
        const item = {
          value,
          timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.warn('Failed to set cache:', error);
      }
    },
    [key]
  );

  const getCache = useCallback((): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const { value, timestamp } = JSON.parse(item);

      // Check if expired
      if (Date.now() - timestamp > ttl) {
        localStorage.removeItem(key);
        return null;
      }

      return value;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  }, [key, ttl]);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }, [key]);

  return { getCache, setCache, clearCache };
}

// ==================== PERFORMANCE MONITORING ====================

/**
 * Performance metrics collection
 */
export function usePerformanceMetrics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Collect Core Web Vitals
    if ('web-vital' in window) {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

      getCLS((metric: any) => {
        console.debug('CLS:', metric);
        // Send to analytics
      });

      getFID((metric: any) => {
        console.debug('FID:', metric);
      });

      getFCP((metric: any) => {
        console.debug('FCP:', metric);
      });

      getLCP((metric: any) => {
        console.debug('LCP:', metric);
      });

      getTTFB((metric: any) => {
        console.debug('TTFB:', metric);
      });
    }

    // Report performance metrics on unload
    const reportMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (navigation) {
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download: navigation.responseEnd - navigation.responseStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          domComplete: navigation.domComplete - navigation.fetchStart,
          loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        };

        console.debug('Performance Metrics:', metrics);
        // Send to analytics service
      }
    };

    window.addEventListener('load', reportMetrics);
    return () => window.removeEventListener('load', reportMetrics);
  }, []);
}

// ==================== IMAGE OPTIMIZATION ====================

/**
 * Generate responsive image srcSet
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[] = [320, 640, 960, 1280]
): string {
  return widths
    .map((width) => {
      // This assumes you have an image optimization service
      // Replace with your actual image service (Vercel Image Optimization, Cloudinary, etc)
      return `${baseUrl}?w=${width} ${width}w`;
    })
    .join(', ');
}

/**
 * Convert image to modern format (WebP with fallback)
 */
export function getOptimizedImageUrl(
  url: string,
  options = { width: 'auto', format: 'auto' }
): string {
  // Use Vercel Image Optimization or similar
  // This is a template - replace with your actual implementation
  return url;
}

// ==================== MEMORY MANAGEMENT ====================

/**
 * Cleanup hook for unsubscribing and canceling operations
 */
export function useCleanup() {
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  const addCleanup = useCallback((fn: () => void) => {
    cleanupFunctionsRef.current.push(fn);
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach((fn) => {
        try {
          fn();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      });
      cleanupFunctionsRef.current = [];
    };
  }, []);

  return { addCleanup };
}
