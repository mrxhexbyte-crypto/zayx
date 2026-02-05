'use client';

import React from 'react';
import { Box, Flex, type BoxProps } from '@/components/primitives';
import { designTokens } from '@/lib/design-tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
        elevated: 'bg-white dark:bg-slate-800 shadow-md hover:shadow-lg dark:shadow-slate-900/50',
        outline: 'bg-transparent border border-slate-200 dark:border-slate-700',
        ghost: 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50',
        primary: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800',
        gradient: 'bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-900',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-200 active:scale-98',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants> & {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant,
      padding,
      interactive,
      header,
      footer,
      headerAction,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive }), className)}
        {...props}
      >
        {header && (
          <Flex
            justify="space-between"
            align="center"
            className={cn(padding !== 'none' && 'mb-4')}
          >
            <div>{header}</div>
            {headerAction && <div>{headerAction}</div>}
          </Flex>
        )}

        {children && <div>{children}</div>}

        {footer && (
          <div className={cn(padding !== 'none' && 'mt-4', 'border-t border-slate-200 dark:border-slate-700 pt-4')}>
            {footer}
          </div>
        )}
      </Box>
    );
  }
);

Card.displayName = 'Card';
