import { create } from 'zustand';
import { Product } from '@/types';
import { apiClient } from '@/lib/api-client';

interface ProductState {
  // Products
  products: Product[];
  featuredProducts: Product[];
  recommendedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  
  // Cache management
  lastFetch: number | null;
  cacheDuration: number; // milliseconds
  
  // Actions
  fetchProducts: (filters?: any) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchRecommendedProducts: (userId?: string) => Promise<void>;
  setProducts: (products: Product[]) => void;
  clearCache: () => void;
  isStale: () => boolean;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  featuredProducts: [],
  recommendedProducts: [],
  isLoading: false,
  error: null,
  lastFetch: null,
  cacheDuration: 5 * 60 * 1000, // 5 minutes default

  isStale: () => {
    const { lastFetch, cacheDuration } = get();
    if (!lastFetch) return true;
    return Date.now() - lastFetch > cacheDuration;
  },

  fetchProducts: async (filters = {}) => {
    const state = get();
    
    // Check cache first
    if (!state.isStale() && state.products.length > 0) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/products', { params: filters });
      const data = response.data as { success?: boolean; data?: Product[] };
      
      if (data.success && data.data) {
        set({
          products: data.data,
          lastFetch: Date.now(),
          isLoading: false,
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch products';
      set({
        error: errorMsg,
        isLoading: false,
      });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get('/products?isFeatured=true&limit=6');
      const data = response.data as { success?: boolean; data?: Product[] };
      
      if (data.success && data.data) {
        set({
          featuredProducts: data.data,
          isLoading: false,
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch featured products';
      set({ error: errorMsg, isLoading: false });
    }
  },

  fetchRecommendedProducts: async (userId?: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get(
        `/products/recommendations${userId ? `?userId=${userId}` : ''}`
      );
      const data = response.data as { success?: boolean; data?: Product[] };
      
      if (data.success && data.data) {
        set({
          recommendedProducts: data.data,
          isLoading: false,
        });
      }
    } catch (error) {
      // Recommendations are optional, don't show error
      set({ isLoading: false });
    }
  },

  setProducts: (products: Product[]) => {
    set({ products, lastFetch: Date.now() });
  },

  clearCache: () => {
    set({
      products: [],
      featuredProducts: [],
      recommendedProducts: [],
      lastFetch: null,
      error: null,
    });
  },
}));
