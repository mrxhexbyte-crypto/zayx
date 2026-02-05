'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import { VStack, Box, Text } from '@/components/primitives';
import { Button } from '@/components/molecules';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isolate?: boolean; // If true, doesn't crash entire app
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

/**
 * Advanced Error Boundary Component
 * - Catches rendering errors
 * - Provides recovery mechanism
 * - Supports custom fallback UI
 * - Error tracking callback
 * - Auto-reset after timeout
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeout: NodeJS.Timeout | null = null;
  private readonly MAX_ERROR_COUNT = 3;
  private readonly AUTO_RESET_TIME = 5000;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorCount: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service (Sentry, etc.)
    console.error('Error caught by boundary:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto-reset after timeout
    this.resetTimeout = setTimeout(() => {
      this.resetError();
    }, this.AUTO_RESET_TIME);
  }

  resetError = () => {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }

    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorCount: prevState.errorCount + 1,
    }));
  };

  componentWillUnmount() {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }

  render() {
    const { hasError, error, errorCount } = this.state;
    const { children, fallback, isolate } = this.props;

    // If max errors reached and isolate is enabled, show permanent error
    if (isolate && errorCount >= this.MAX_ERROR_COUNT) {
      return (
        <VStack gap="lg" className="p-8 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
            <VStack gap="sm">
              <Text weight="bold" className="text-red-900 dark:text-red-200">
                Component Error
              </Text>
              <Text className="text-red-700 dark:text-red-300">
                This component has encountered too many errors. Please refresh the page.
              </Text>
            </VStack>
          </div>
          <Button
            variant="error"
            size="sm"
            onClick={() => window.location.reload()}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Refresh Page
          </Button>
        </VStack>
      );
    }

    if (hasError && error) {
      if (fallback) {
        return fallback(error, this.resetError);
      }

      return (
        <VStack gap="lg" className="p-8 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-1" />
            <VStack gap="sm" className="flex-1">
              <Text weight="bold" className="text-orange-900 dark:text-orange-200">
                Oops! Something went wrong
              </Text>
              <Text className="text-orange-700 dark:text-orange-300 text-sm">
                {error.message || 'An unexpected error occurred'}
              </Text>
              {process.env.NODE_ENV === 'development' && (
                <Box
                  bgColor="white"
                  borderColor="orange-200"
                  border="1px solid"
                  padding="3"
                  borderRadius="md"
                  className="text-xs overflow-auto max-h-40 font-mono"
                >
                  {error.stack}
                </Box>
              )}
            </VStack>
          </div>
          <Button
            variant="warning"
            size="sm"
            onClick={this.resetError}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Try Again
          </Button>
        </VStack>
      );
    }

    return children;
  }
}

/**
 * Hook for functional components
 * Usage: const handleError = useErrorHandler()
 */
export function useErrorHandler() {
  return (error: Error, info?: ErrorInfo) => {
    console.error('Error:', error);
    if (info) {
      console.error('Error info:', info);
    }
  };
}
