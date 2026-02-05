'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/Shop/ProductCard';
import { useAutoRefresh } from '@/hooks/use-auto-refresh';
import { useProductStore } from '@/store/useProductStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { RefreshCw, Zap } from 'lucide-react';
import { Product } from '@/types';

export function AutoUpdateSection() {
  const fetchFeaturedProducts = useProductStore(
    (state) => state.fetchFeaturedProducts
  );
  const featuredProducts = useProductStore((state) => state.featuredProducts);
  const isLoading = useProductStore((state) => state.isLoading);
  
  const { isRefreshing, lastRefresh } = useAutoRefresh({
    interval: 45000, // Auto-refresh every 45 seconds
    onRefresh: fetchFeaturedProducts,
    enabled: true,
  });

  // Initial fetch
  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const timeAgo = lastRefresh
    ? Math.round((Date.now() - lastRefresh.getTime()) / 1000)
    : null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Auto-Update Badge */}
        <motion.div 
          className="flex justify-between items-end mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Featured Products
              </h2>
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                className="text-cyan-500"
              >
                <RefreshCw className="w-6 h-6" />
              </motion.div>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Auto-updating collection
              {timeAgo !== null && (
                <span className="ml-2 text-sm text-slate-500 dark:text-slate-500">
                  (updated {timeAgo}s ago)
                </span>
              )}
            </p>
          </div>

          {/* Live Status Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4" />
            Live Updates
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {isLoading && featuredProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : (
          /* Products Grid with Animation */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence>
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && featuredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-500 text-lg">
              No featured products available yet
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
