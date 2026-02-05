'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { Cart, CartItem, Product } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface CartContextType {
  cart: Cart;
  items: CartItem[];
  itemCount: number;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<void>;
}

const initialCart: Cart = {
  id: '',
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  updatedAt: new Date(),
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<Cart>('cart', initialCart);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const calculateTotals = useCallback((items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 0 ? 9.99 : 0;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  }, []);

  const addItem = useCallback(
    (product: Product, quantity: number) => {
      setCart(prevCart => {
        const existingItem = prevCart.items.find(item => item.productId === product.id);
        
        let newItems: CartItem[];
        if (existingItem) {
          newItems = prevCart.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...prevCart.items, { productId: product.id, product, quantity, addedAt: new Date() }];
        }

        const totals = calculateTotals(newItems);
        return { ...prevCart, items: newItems, ...totals, updatedAt: new Date() };
      });
    },
    [setCart, calculateTotals]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setCart(prevCart => {
        const newItems = prevCart.items.filter(item => item.productId !== productId);
        const totals = calculateTotals(newItems);
        return { ...prevCart, items: newItems, ...totals, updatedAt: new Date() };
      });
    },
    [setCart, calculateTotals]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setCart(prevCart => {
        const newItems = prevCart.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        const totals = calculateTotals(newItems);
        return { ...prevCart, items: newItems, ...totals, updatedAt: new Date() };
      });
    },
    [setCart, calculateTotals, removeItem]
  );

  const clearCart = useCallback(() => {
    setCart(initialCart);
  }, [setCart]);

  const applyCoupon = useCallback(async (code: string) => {
    // TODO: Implement coupon logic
    console.log('Applying coupon:', code);
  }, []);

  if (!isLoaded) {
    return <>{children}</>;
  }

  const value: CartContextType = {
    cart,
    items: cart.items,
    itemCount: cart.items.length,
    total: cart.total,
    subtotal: cart.subtotal,
    tax: cart.tax,
    shipping: cart.shipping,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
