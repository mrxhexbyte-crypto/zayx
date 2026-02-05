export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  discount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  sku?: string;
  specifications?: Record<string, string>;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'bestseller';
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}
