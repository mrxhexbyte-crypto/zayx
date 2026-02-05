'use client';

import React, { useEffect, useCallback } from 'react';
import { useUI } from '@/store/root.store';

type Theme = 'light' | 'dark' | 'auto';

interface CustomTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  customTheme?: Partial<CustomTheme>;
}

/**
 * Advanced Theme Provider
 * - Supports light/dark/auto (system) themes
 * - Persists theme preference
 * - Injects CSS variables for dynamic theming
 * - Supports custom theme colors
 * - Respects system preference
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'auto',
  customTheme,
}) => {
  const { theme, setTheme } = useUI();

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const applyTheme = useCallback((selectedTheme: Theme) => {
    if (typeof window === 'undefined') return;

    const htmlElement = document.documentElement;
    const effectiveTheme = selectedTheme === 'auto' ? getSystemTheme() : selectedTheme;

    // Apply theme class
    if (effectiveTheme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Store preference
    localStorage.setItem('theme', selectedTheme);

    // Inject custom theme CSS variables if provided
    if (customTheme) {
      const style = document.getElementById('custom-theme-style') || document.createElement('style');
      style.id = 'custom-theme-style';

      const cssVariables = `
        :root {
          --color-theme-primary: ${customTheme.primary || '#2563eb'};
          --color-theme-secondary: ${customTheme.secondary || '#7c3aed'};
          --color-theme-accent: ${customTheme.accent || '#06b6d4'};
          --color-theme-background: ${customTheme.background || '#ffffff'};
          --color-theme-foreground: ${customTheme.foreground || '#000000'};
          --color-theme-muted: ${customTheme.muted || '#9ca3af'};
        }
      `;

      style.textContent = cssVariables;
      if (!document.querySelector('#custom-theme-style')) {
        document.head.appendChild(style);
      }
    }
  }, [customTheme, getSystemTheme]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || defaultTheme;
    if (savedTheme !== theme) {
      setTheme(savedTheme);
    }
    applyTheme(savedTheme);
  }, [theme, setTheme, defaultTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      applyTheme('auto');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return <>{children}</>;
};

/**
 * Hook to use theme
 */
export const useTheme = () => {
  const { theme, setTheme } = useUI();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark' || (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
};
