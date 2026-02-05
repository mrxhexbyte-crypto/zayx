// UI Hooks
export { useBreakpoint, useMediaQuery, useMobile, useTablet, useDesktop } from './useResponsive';

// Performance Hooks
export {
  useIntersectionObserver,
  useDebounce,
  useThrottle,
  useCacheStore,
  usePerformanceMetrics,
  useCleanup,
  lazyLoadImage,
} from '@/lib/performance';

// Store Hooks
export { useRootStore, useUI, useUser, useApp } from '@/store/root.store';

// Theme Hook
export { useTheme } from '@/components/providers/ThemeProvider';
