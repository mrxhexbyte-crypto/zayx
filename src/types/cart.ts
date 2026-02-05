import { Product } from './product';

export interface CartItem {
  productId: string;
  product?: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  discount?: number;
  updatedAt: Date;
}
