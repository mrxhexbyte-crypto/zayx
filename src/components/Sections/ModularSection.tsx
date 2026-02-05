'use client';

import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ModularSectionProps extends Omit<MotionProps, 'children'> {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  showBorder?: boolean;
  fullWidth?: boolean;
  animate?: boolean;
}

/**
 * Reusable, modular section component
 * Provides consistent styling and animations across the site
 * Perfect for building custom sections with minimal code
 */
export function ModularSection({
  children,
  className = '',
  id,
  title,
  subtitle,
  showBorder = false,
  fullWidth = false,
  animate = true,
  ...motionProps
}: ModularSectionProps) {
  const containerClass = fullWidth ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  const motionVariants = animate
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }
    : {};

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={motionVariants}
      className={`py-20 ${showBorder ? 'border-t border-white/10' : ''} ${className}`}
      {...motionProps}
    >
      <div className={containerClass}>
        {/* Header */}
        {title && (
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </motion.section>
  );
}

/**
 * Modular Grid Layout
 * Automatically handles responsive columns
 */
interface ModularGridProps {
  children: ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
}

export function ModularGrid({
  children,
  cols = 3,
  gap = 6,
  className = '',
}: ModularGridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[cols] || 'md:grid-cols-2 lg:grid-cols-3';

  const gapClass = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }[gap] || 'gap-6';

  return (
    <motion.div
      className={`grid grid-cols-1 ${colsClass} ${gapClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Modular Card Component
 * Consistent styling for any content card
 */
interface ModularCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function ModularCard({
  children,
  className = '',
  href,
  onClick,
  interactive = true,
}: ModularCardProps) {
  const baseClass = `rounded-lg border border-white/10 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 ${
    interactive ? 'hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300' : ''
  } ${className}`;

  const content = (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={baseClass}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}
