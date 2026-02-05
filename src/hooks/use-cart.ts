'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import type { CartContextType } from '@/context/CartContext';

// Default empty cart context
const defaultContext: CartContextType = {
  cart: {
    id: '',
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    updatedAt: new Date(),
  },
  items: [],
  itemCount: 0,
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  applyCoupon: async () => {},
};

export function useCart() {
  const context = useContext(CartContext);

  // Return default context if provider is not available (e.g., during SSR)
  if (!context) {
    return defaultContext;
  }

  return context;
}
