'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/Shop/SearchBar';
import { ProductFilters } from '@/components/Shop/ProductFilters';
import { ProductCard } from '@/components/Shop/ProductCard';
import { ChatBot } from '@/components/AI/ChatBot';
import { useTrackInteraction } from '@/hooks/use-smart-recommendations';
import { Product } from '@/types';
import { SAMPLE_PRODUCTS } from '@/data/sample-products';
import { motion } from 'framer-motion';
import { LayoutGrid, ListFilter } from 'lucide-react';
import { useHintSequence } from '@/hooks/use-hints';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'rating'>('newest');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 5000,
    search: '',
  });
  const { trackSearch } = useTrackInteraction();

<<<<<<< HEAD
  const fetchProducts = () => {
    setIsLoading(true);
    try {
      // Filter products
      let filtered = SAMPLE_PRODUCTS.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        if (filters.search) {
          const search = filters.search.toLowerCase();
          if (!product.name.toLowerCase().includes(search) &&
              !product.description.toLowerCase().includes(search)) {
            return false;
          }
        }
        return true;
      });

      // Sort products
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }

      setProducts(filtered);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
=======
  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
      try {
        // Filter products
        let filtered = SAMPLE_PRODUCTS.filter(product => {
          if (filters.category && product.category !== filters.category) return false;
          if (filters.minPrice && product.price < filters.minPrice) return false;
          if (filters.maxPrice && product.price > filters.maxPrice) return false;
          if (filters.search) {
            const search = filters.search.toLowerCase();
            if (!product.name.toLowerCase().includes(search) &&
                !product.description.toLowerCase().includes(search)) {
              return false;
            }
          }
          return true;
        });

        // Sort products
        switch (sortBy) {
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case 'newest':
            filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
    fetchProducts();
  }, [filters, sortBy]);

  // Show hints when page loads
  useHintSequence(['shop.welcome', 'shop.hover', 'feature.ai_chat']);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Find What You <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Need</span>
          </h1>
          <p className="text-lg text-slate-400">Browse our collection or use the search. The more you browse, the smarter our suggestions get.</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar
            onSearch={(query) => {
              setFilters({ ...filters, search: query });
              trackSearch(query, filters.category);
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ProductFilters
              onFilterChange={(newFilters) => setFilters(newFilters)}
            />
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Controls */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">All Products</h2>
                <p className="text-slate-400">{products.length} items available</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg animate-pulse border border-white/5"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {products.map(product => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <p className="text-slate-400 text-lg mb-4">No products found matching your filters</p>
                  <button
                    onClick={() =>
                      setFilters({
                        category: '',
                        minPrice: 0,
                        maxPrice: 5000,
                        search: '',
                      })
                    }
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <ChatBot />
    </main>
  );
}
