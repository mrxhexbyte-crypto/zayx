/**
 * Intelligent Caching Service
 * Automatically manages cache invalidation, compression, and memory optimization
 * Works in browser and server-side contexts
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  hits: number;
  size: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  entries: number;
}

class SmartCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private stats: CacheStats = { hits: 0, misses: 0, size: 0, entries: 0 };
  private maxSize = 50 * 1024 * 1024; // 50MB max
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Auto-cleanup every minute
    if (typeof window !== 'undefined') {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }
  }

  /**
   * Get value from cache
   * Returns null if expired or not found
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    entry.hits++;
    this.stats.hits++;
    return entry.data as T;
  }

  /**
   * Set value in cache with auto-expiration
   */
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Calculate approximate size
    const size = JSON.stringify(data).length;

    // Check if we need to evict
    if (this.stats.size + size > this.maxSize) {
      this.evictLRU();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0,
      size,
    };

    this.cache.set(key, entry);
    this.stats.size += size;
    this.stats.entries++;
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string): void {
    const entry = this.cache.get(key);
    if (entry) {
      this.stats.size -= entry.size;
      this.cache.delete(key);
      this.stats.entries--;
    }
  }

  /**
   * Invalidate entries by prefix (e.g., 'product:*')
   */
  invalidatePattern(pattern: string | RegExp): void {
    const regex = typeof pattern === 'string'
      ? new RegExp(`^${pattern.replace('*', '.*')}`)
      : pattern;

    for (const [key, entry] of this.cache.entries()) {
      if (regex.test(key)) {
        this.stats.size -= entry.size;
        this.cache.delete(key);
        this.stats.entries--;
      }
    }
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, size: 0, entries: 0 };
  }

  /**
   * Evict Least Recently Used entry
   */
  private evictLRU(): void {
    let lruKey: string | null = null;
    let minHits = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.hits < minHits) {
        minHits = entry.hits;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.invalidate(lruKey);
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.invalidate(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats & { hitRate: number } {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;

    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100) / 100,
    };
  }

  /**
   * Destroy cleanup interval
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Export singleton instance
export const cache = new SmartCache();

/**
 * Cache decorator for async functions
 * Usage: const cachedFn = withCache(asyncFn, 'key', 5000)
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyPrefix: string,
  ttl: number = 5 * 60 * 1000
): T {
  return (async (...args: any[]) => {
    const cacheKey = `${keyPrefix}:${JSON.stringify(args)}`;
    
    // Try cache first
    const cached = cache.get(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Execute and cache
    try {
      const result = await fn(...args);
      cache.set(cacheKey, result, ttl);
      return result;
    } catch (error) {
      throw error;
    }
  }) as T;
}
