import { useEffect, useState } from 'react';
import { designTokens } from '@/lib/design-tokens';

type Breakpoint = keyof typeof designTokens.breakpoints;

/**
 * Hook to detect current breakpoint
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < parseInt(designTokens.breakpoints.sm)) {
        setBreakpoint('xs');
      } else if (width < parseInt(designTokens.breakpoints.md)) {
        setBreakpoint('sm');
      } else if (width < parseInt(designTokens.breakpoints.lg)) {
        setBreakpoint('md');
      } else if (width < parseInt(designTokens.breakpoints.xl)) {
        setBreakpoint('lg');
      } else if (width < parseInt(designTokens.breakpoints['2xl'])) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
}

/**
 * Hook to check if media query matches
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

/**
 * Hook to check if mobile
 */
export function useMobile() {
  return useMediaQuery(`(max-width: ${designTokens.breakpoints.sm})`);
}

/**
 * Hook to check if tablet
 */
export function useTablet() {
  return useMediaQuery(
    `(min-width: ${designTokens.breakpoints.md}) and (max-width: ${designTokens.breakpoints.lg})`
  );
}

/**
 * Hook to check if desktop
 */
export function useDesktop() {
  return useMediaQuery(`(min-width: ${designTokens.breakpoints.lg})`);
}
