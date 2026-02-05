'use client';

import React from 'react';
import { VStack, Box, Text } from '@/components/primitives';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sectionVariants = cva(
  'w-full transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-900',
        alt: 'bg-slate-50 dark:bg-slate-800/50',
        gradient: 'bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white',
        primary: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      },
      padding: {
        none: '',
        sm: 'py-8 px-4 md:px-6',
        md: 'py-16 px-4 md:px-6',
        lg: 'py-24 px-4 md:px-6',
        xl: 'py-32 px-4 md:px-6',
      },
      fullHeight: {
        true: 'min-h-screen',
        false: '',
      },
      fullWidth: {
        true: 'w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      fullHeight: false,
      fullWidth: false,
    },
  }
);

type SectionProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof sectionVariants> & {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  id?: string;
};

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      variant,
      padding,
      fullHeight,
      fullWidth,
      title,
      subtitle,
      action,
      maxWidth = 'xl',
      centered = false,
      children,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          sectionVariants({ variant, padding, fullHeight, fullWidth }),
          className
        )}
        {...props}
      >
        <Box
          className={cn(
            'mx-auto',
            maxWidthMap[maxWidth],
            centered && 'text-center'
          )}
        >
          {(title || subtitle || action) && (
            <VStack gap="md" className="mb-12">
              {title && (
                <Text
                  as="h2"
                  size="4xl"
                  weight="bold"
                  className={cn(
                    variant === 'gradient' ? 'text-white' : 'text-slate-900 dark:text-white'
                  )}
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  size="xl"
                  className={cn(
                    variant === 'gradient'
                      ? 'text-slate-300'
                      : 'text-slate-600 dark:text-slate-400'
                  )}
                >
                  {subtitle}
                </Text>
              )}
              {action && <div className="pt-4">{action}</div>}
            </VStack>
          )}

          {children}
        </Box>
      </section>
    );
  }
);

Section.displayName = 'Section';
