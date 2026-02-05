'use client';

import React from 'react';
import { Flex, Text } from '@/components/primitives';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center gap-2 font-medium rounded-full transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100',
        primary: 'bg-blue-100 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200',
        success: 'bg-green-100 dark:bg-green-950/50 text-green-900 dark:text-green-200',
        warning: 'bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200',
        error: 'bg-red-100 dark:bg-red-950/50 text-red-900 dark:text-red-200',
        info: 'bg-cyan-100 dark:bg-cyan-950/50 text-cyan-900 dark:text-cyan-200',
        accent: 'bg-purple-100 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200',
        outline: 'border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100',
        ghost: 'bg-transparent text-slate-700 dark:text-slate-300',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pulse: false,
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants> & {
  icon?: React.ReactNode;
  onRemove?: () => void;
  dot?: boolean;
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant,
      size,
      pulse,
      icon,
      onRemove,
      dot,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, pulse }), className)}
        {...props}
      >
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{children}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-1 hover:opacity-70 transition-opacity"
            aria-label="Remove badge"
          >
            <X className={cn(size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
