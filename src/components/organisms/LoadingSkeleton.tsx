'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rectangle' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

/**
 * Skeleton Loader Component
 * Used to show loading state with placeholder shapes
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangle',
      width,
      height,
      count = 1,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700';

    const variantStyles = {
      text: 'h-4 rounded',
      circle: 'w-10 h-10 rounded-full',
      rectangle: 'h-6 rounded',
      card: 'h-48 rounded-lg',
    };

    const styles: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    };

    const skeletons = Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        ref={idx === 0 ? ref : undefined}
        className={cn(baseStyles, variantStyles[variant], className)}
        style={styles}
        {...props}
      />
    ));

    return count === 1 ? skeletons[0] : <div className="space-y-3">{skeletons}</div>;
  }
);

Skeleton.displayName = 'Skeleton';

/**
 * Skeleton Card Component
 * Pre-composed skeleton for common card layout
 */
export const SkeletonCard = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <Skeleton variant="text" className="w-3/4 mb-3" />
        <Skeleton variant="text" className="w-full mb-2" />
        <Skeleton variant="text" className="w-5/6" />
      </div>
    ))}
  </div>
);

/**
 * Skeleton Image Component
 * Shows image placeholder while loading
 */
export const SkeletonImage = ({
  width = 300,
  height = 200,
}: {
  width?: number;
  height?: number;
}) => (
  <Skeleton
    variant="rectangle"
    width={width}
    height={height}
    className="rounded-lg"
  />
);

/**
 * Skeleton Table Component
 * Shows table placeholder while loading
 */
export const SkeletonTable = ({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) => (
  <div className="w-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
    {/* Header */}
    <div className="grid gap-4 p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, idx) => (
        <Skeleton key={idx} variant="text" />
      ))}
    </div>

    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div
        key={rowIdx}
        className="grid gap-4 p-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIdx) => (
          <Skeleton key={colIdx} variant="text" />
        ))}
      </div>
    ))}
  </div>
);
