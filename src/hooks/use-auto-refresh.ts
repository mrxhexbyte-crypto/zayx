import { useEffect, useCallback, useRef, useState } from 'react';

interface AutoRefreshConfig {
  interval?: number; // milliseconds
  enabled?: boolean;
  onRefresh?: () => Promise<void>;
  onError?: (error: Error) => void;
  retryCount?: number;
  exponentialBackoff?: boolean;
}

/**
 * Custom hook for automatic data refresh with intelligent retry logic
 * Perfect for keeping products, notifications, and real-time data in sync
 */
export function useAutoRefresh({
  interval = 30000, // 30 seconds default
  enabled = true,
  onRefresh,
  onError,
  retryCount = 3,
  exponentialBackoff = true,
}: AutoRefreshConfig) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryRef = useRef(0);

  const refresh = useCallback(async () => {
    if (isRefreshing || !enabled) return;

    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      setLastRefresh(new Date());
      setError(null);
      retryRef.current = 0;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);

      // Retry with exponential backoff
      if (retryRef.current < retryCount) {
        retryRef.current++;
        const delay = exponentialBackoff
          ? Math.pow(2, retryRef.current) * 1000
          : interval;
        setTimeout(() => refresh(), delay);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh, onError, enabled, isRefreshing, interval, retryCount, exponentialBackoff]);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Initial refresh
    refresh();

    // Set up interval
    intervalRef.current = setInterval(() => {
      refresh();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, interval, refresh]);

  const manualRefresh = useCallback(() => {
    return refresh();
  }, [refresh]);

  return {
    isRefreshing,
    lastRefresh,
    error,
    refresh: manualRefresh,
    setEnabled: (value: boolean) => enabled,
  };
}
