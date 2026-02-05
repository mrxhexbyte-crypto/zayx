'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HStack, VStack, Box, Flex } from '@/components/primitives';
import { Button } from '@/components/molecules';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';

export interface HeaderLink {
  label: string;
  href: string;
  active?: boolean;
}

interface ResponsiveHeaderProps {
  logo?: React.ReactNode;
  title?: string;
  links?: HeaderLink[];
  actions?: React.ReactNode;
  sticky?: boolean;
  shadow?: boolean;
  withThemeToggle?: boolean;
}

/**
 * Responsive Header Component
 * - Mobile-friendly navigation
 * - Theme toggle
 * - Customizable logo and actions
 * - Sticky option
 */
export const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  logo,
  title,
  links = [],
  actions,
  sticky = true,
  shadow = true,
  withThemeToggle = true,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const headerClass = cn(
    'bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-all duration-200',
    sticky && 'sticky top-0 z-40',
    shadow && 'shadow-sm'
  );

  return (
    <header className={headerClass}>
      {/* Main header content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Flex justify="space-between" align="center" className="h-16">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center gap-2">
            {logo ? (
              <Box>{logo}</Box>
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {title || 'Logo'}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <HStack gap="md" className="hidden md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  link.active
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </HStack>

          {/* Right side actions */}
          <HStack gap="sm" align="center" className="flex">
            {withThemeToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                icon={theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              />
            )}

            {actions && <div className="hidden sm:flex items-center gap-2">{actions}</div>}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              icon={mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              aria-label="Toggle menu"
            />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <VStack gap="sm" className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  link.active
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                )}
              >
                {link.label}
              </Link>
            ))}

            {actions && (
              <Box className="pt-2 border-t border-slate-200 dark:border-slate-700">
                {actions}
              </Box>
            )}
          </VStack>
        )}
      </div>
    </header>
  );
};

ResponsiveHeader.displayName = 'ResponsiveHeader';
