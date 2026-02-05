import { create } from 'zustand';

export type ProgressStep =
  | 'browsing'
  | 'product-selected'
  | 'cart-added'
  | 'cart-reviewed'
  | 'checkout-started'
  | 'shipping-info'
  | 'payment-info'
  | 'order-confirmed';

export interface ProgressState {
  currentStep: ProgressStep;
  completedSteps: ProgressStep[];
  progress: number; // 0-100
  isVisible: boolean;
  setStep: (step: ProgressStep) => void;
  completeStep: (step: ProgressStep) => void;
  resetProgress: () => void;
  showProgress: () => void;
  hideProgress: () => void;
}

const STEP_ORDER: ProgressStep[] = [
  'browsing',
  'product-selected',
  'cart-added',
  'cart-reviewed',
  'checkout-started',
  'shipping-info',
  'payment-info',
  'order-confirmed',
];

const calculateProgress = (completedSteps: ProgressStep[]): number => {
  if (completedSteps.length === 0) return 0;
  return Math.round((completedSteps.length / STEP_ORDER.length) * 100);
};

export const useProgressStore = create<ProgressState>((set) => ({
  currentStep: 'browsing',
  completedSteps: [],
  progress: 0,
  isVisible: true,

  setStep: (step: ProgressStep) => {
    set((state) => ({
      currentStep: step,
      progress: calculateProgress(state.completedSteps),
    }));
  },

  completeStep: (step: ProgressStep) => {
    set((state) => {
      const newCompleted = Array.from(new Set([...state.completedSteps, step]));
      return {
        currentStep: step,
        completedSteps: newCompleted,
        progress: calculateProgress(newCompleted),
      };
    });
  },

  resetProgress: () => {
    set({
      currentStep: 'browsing',
      completedSteps: [],
      progress: 0,
    });
  },

  showProgress: () => {
    set({ isVisible: true });
  },

  hideProgress: () => {
    set({ isVisible: false });
  },
}));

export const STEP_LABELS: Record<ProgressStep, string> = {
  browsing: 'Browsing',
  'product-selected': 'Product Selected',
  'cart-added': 'Added to Cart',
  'cart-reviewed': 'Cart Reviewed',
  'checkout-started': 'Checkout Started',
  'shipping-info': 'Shipping Info',
  'payment-info': 'Payment Info',
  'order-confirmed': 'Order Confirmed',
};
