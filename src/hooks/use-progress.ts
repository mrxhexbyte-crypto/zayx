import { useProgressStore, ProgressStep } from '@/store/progress.store';
import { useCallback, useEffect } from 'react';

/**
 * Hook to track progress throughout the user journey
 * Use this to monitor and update progress at key moments
 */
export function useProgress() {
  const {
    currentStep,
    completedSteps,
    progress,
    isVisible,
    setStep,
    completeStep,
    resetProgress,
    showProgress,
    hideProgress,
  } = useProgressStore();

  const trackAction = useCallback(
    (action: string, step?: ProgressStep) => {
      console.log(`📊 Progress tracked: ${action}`, step);
      if (step) {
        completeStep(step);
      }
    },
    [completeStep]
  );

  return {
    currentStep,
    completedSteps,
    progress,
    isVisible,
    setStep,
    completeStep,
    resetProgress,
    showProgress,
    hideProgress,
    trackAction,
  };
}

/**
 * Hook to track product interactions
 */
export function useProductProgress() {
  const { completeStep } = useProgressStore();

  return {
    trackProductView: useCallback(() => {
      completeStep('product-selected');
    }, [completeStep]),

    trackAddToCart: useCallback(() => {
      completeStep('cart-added');
    }, [completeStep]),
  };
}

/**
 * Hook to track cart progress
 */
export function useCartProgress() {
  const { completeStep } = useProgressStore();

  return {
    trackCartReview: useCallback(() => {
      completeStep('cart-reviewed');
    }, [completeStep]),

    trackCheckoutStart: useCallback(() => {
      completeStep('checkout-started');
    }, [completeStep]),
  };
}

/**
 * Hook to track checkout progress
 */
export function useCheckoutProgress() {
  const { completeStep } = useProgressStore();

  return {
<<<<<<< HEAD
=======
    trackCheckoutStart: useCallback(() => {
      completeStep('checkout-started');
    }, [completeStep]),

>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
    trackShippingInfo: useCallback(() => {
      completeStep('shipping-info');
    }, [completeStep]),

    trackPaymentInfo: useCallback(() => {
      completeStep('payment-info');
    }, [completeStep]),

    trackOrderConfirmed: useCallback(() => {
      completeStep('order-confirmed');
    }, [completeStep]),
  };
}

/**
 * Hook to conditionally show/hide progress bar
 */
export function useProgressVisibility(
  show: boolean = true,
  dependencies: any[] = []
) {
  const { showProgress, hideProgress } = useProgressStore();

  useEffect(() => {
    if (show) {
      showProgress();
    } else {
      hideProgress();
    }
<<<<<<< HEAD
  }, [show, showProgress, hideProgress, ...dependencies]);
=======
  }, [show, showProgress, hideProgress]);
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
}
