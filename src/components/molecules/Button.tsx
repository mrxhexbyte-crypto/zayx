'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
  {
    variants: {
      variant: {
        solid: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800',
        primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl',
        secondary: 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white focus:ring-slate-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-800',
        error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800',
        warning: 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 dark:bg-amber-700 dark:hover:bg-amber-800',
        outline: 'border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-slate-500',
        ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white focus:ring-slate-500',
        link: 'text-blue-600 dark:text-blue-400 hover:underline focus:ring-blue-500',
        gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white focus:ring-purple-500 shadow-lg',
      },
      size: {
        xs: 'px-2 py-1 text-xs h-7',
        sm: 'px-3 py-1.5 text-sm h-8',
        md: 'px-4 py-2 text-base h-10',
        lg: 'px-6 py-3 text-lg h-12',
        xl: 'px-8 py-4 text-lg h-14',
        '2xl': 'px-10 py-5 text-xl h-16',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      block: {
        true: 'block w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      fullWidth: false,
      block: false,
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
    loadingText?: string;
    as?: React.ElementType;
    href?: string;
  };

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant,
      size,
      fullWidth,
      block,
      icon,
      rightIcon,
      loading,
      loadingText,
      children,
      className,
      disabled,
      type = 'button',
      as: Component = 'button',
      href,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && <Loader2 className={cn(
          'animate-spin',
          size === 'xs' && 'w-3 h-3',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-5 h-5',
          size === 'lg' && 'w-6 h-6',
          size === 'xl' && 'w-6 h-6',
          size === '2xl' && 'w-7 h-7',
        )} />}
        {!loading && icon && <span>{icon}</span>}
        <span>{loading && loadingText ? loadingText : children}</span>
        {rightIcon && !loading && <span>{rightIcon}</span>}
      </>
    );

    if (Component === 'a' || href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(
            buttonVariants({ variant, size, fullWidth, block }),
            className
          )}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size, fullWidth, block }),
          className
        )}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
