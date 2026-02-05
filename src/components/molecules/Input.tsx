'use client';

import React from 'react';
import { VStack, Text } from '@/components/primitives';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full px-3 py-2 rounded-lg font-medium transition-all duration-200 border',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500',
        outline: 'bg-transparent border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white',
        filled: 'bg-slate-100 dark:bg-slate-700 border-transparent text-slate-900 dark:text-white',
      },
      size: {
        sm: 'text-sm h-8 px-2',
        md: 'text-base h-10 px-3',
        lg: 'text-lg h-12 px-4',
      },
      state: {
        default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        error: 'border-red-500 dark:border-red-500 focus:ring-red-500',
        success: 'border-green-500 dark:border-green-500 focus:ring-green-500',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    label?: React.ReactNode;
    description?: React.ReactNode;
    error?: React.ReactNode;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      state,
      label,
      description,
      error,
      icon,
      rightIcon,
      fullWidth = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const errorState = error ? 'error' : 'default';

    return (
      <VStack gap="sm" className={cn(!fullWidth && 'w-fit')}>
        {label && (
          <label className="block">
            <Text as="label" size="sm" weight="medium">
              {label}
            </Text>
          </label>
        )}

        {description && (
          <Text size="xs" className="text-slate-600 dark:text-slate-400">
            {description}
          </Text>
        )}

        <div className="relative w-full">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              inputVariants({
                variant,
                size,
                state: disabled ? 'disabled' : errorState,
              }),
              icon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <Text size="xs" className="text-red-500 dark:text-red-400">
            {error}
          </Text>
        )}
      </VStack>
    );
  }
);

Input.displayName = 'Input';
