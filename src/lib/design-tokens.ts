/**
 * Enterprise Design System Tokens
 * Single source of truth for all design values
 */

// ==================== COLOR SYSTEM ====================
export const colors = {
  // Brand Colors
  brand: {
    primary: '#2563eb',      // Blue
    secondary: '#7c3aed',    // Purple
    accent: '#06b6d4',       // Cyan
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
    info: '#3b82f6',         // Light Blue
  },

  // Neutral Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    surface: '#ffffff',
    surfaceHover: '#f9fafb',
    border: '#e5e7eb',
    disabled: '#9ca3af',
  },

  // Neon Colors (Futuristic)
  neon: {
    cyan: 'rgb(0 255 255)',
    magenta: 'rgb(255 0 128)',
    purple: 'rgb(157 0 255)',
    lime: 'rgb(0 255 136)',
  },

  // Dark mode overrides
  dark: {
    surface: '#111827',
    surfaceHover: '#1f2937',
    border: '#374151',
    text: '#f3f4f6',
  },
};

// ==================== TYPOGRAPHY SYSTEM ====================
export const typography = {
  // Font families
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    display: 'Georgia, "Times New Roman", serif',
  },

  // Font sizes (8px base)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ==================== SPACING SYSTEM ====================
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  3.5: '0.875rem',    // 14px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  7: '1.75rem',       // 28px
  8: '2rem',          // 32px
  9: '2.25rem',       // 36px
  10: '2.5rem',       // 40px
  12: '3rem',         // 48px
  14: '3.5rem',       // 56px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  28: '7rem',         // 112px
  32: '8rem',         // 128px
  36: '9rem',         // 144px
  40: '10rem',        // 160px
};

// ==================== BORDER RADIUS ====================
export const borderRadius = {
  none: '0',
  sm: '0.125rem',     // 2px
  base: '0.25rem',    // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px',
};

// ==================== SHADOWS ====================
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Elevation levels for layered design
  elevation: {
    1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    2: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    3: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    4: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    5: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // Neon glow effects
  glow: {
    cyan: '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.2)',
    magenta: '0 0 20px rgba(255, 0, 128, 0.3), 0 0 40px rgba(255, 0, 128, 0.2)',
    purple: '0 0 20px rgba(157, 0, 255, 0.3), 0 0 40px rgba(157, 0, 255, 0.2)',
  },
};

// ==================== TRANSITIONS ====================
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',

  // Named transitions
  appearance: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// ==================== BREAKPOINTS ====================
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ==================== Z-INDEX SCALE ====================
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  backdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
};

// ==================== COMPONENT TOKENS ====================
export const components = {
  button: {
    sizes: {
      xs: {
        padding: `${spacing[1]} ${spacing[2]}`,
        fontSize: typography.fontSize.xs,
        height: '28px',
      },
      sm: {
        padding: `${spacing[1.5]} ${spacing[3]}`,
        fontSize: typography.fontSize.sm,
        height: '32px',
      },
      md: {
        padding: `${spacing[2]} ${spacing[4]}`,
        fontSize: typography.fontSize.base,
        height: '40px',
      },
      lg: {
        padding: `${spacing[2.5]} ${spacing[6]}`,
        fontSize: typography.fontSize.lg,
        height: '48px',
      },
      xl: {
        padding: `${spacing[3]} ${spacing[8]}`,
        fontSize: typography.fontSize.lg,
        height: '56px',
      },
    },
    borderRadius: borderRadius.lg,
  },

  card: {
    borderRadius: borderRadius.xl,
    shadow: shadows.md,
    padding: spacing[6],
  },

  input: {
    height: '40px',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSize.base,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.semantic.border}`,
  },

  modal: {
    borderRadius: borderRadius['2xl'],
    shadow: shadows['2xl'],
    backdropBlur: '4px',
  },
};

// ==================== ANIMATION TOKENS ====================
export const animations = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  timingFunction: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// ==================== LAYOUT TOKENS ====================
export const layout = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  gutters: {
    mobile: spacing[4],
    tablet: spacing[6],
    desktop: spacing[8],
  },

  gap: {
    xs: spacing[2],
    sm: spacing[3],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
  },
};

// ==================== ACCESSIBILITY ====================
export const a11y = {
  focusRing: {
    outline: `2px solid ${colors.brand.primary}`,
    outlineOffset: '2px',
  },
  
  reducedMotion: {
    duration: '0.001ms',
    iterationCount: '1',
  },
};

// Export all tokens as a single object
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  components,
  animations,
  layout,
  a11y,
};

export type DesignTokens = typeof designTokens;
