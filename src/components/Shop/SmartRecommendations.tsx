'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSmartRecommendations } from '@/hooks/use-smart-recommendations';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SmartRecommendationsProps {
  allProducts: any[];
  currentProductId?: string;
  limit?: number;
}

export function SmartRecommendations({
  allProducts,
  currentProductId,
  limit = 6,
}: SmartRecommendationsProps) {
  const { recommendations, reasons, isLoading } = useSmartRecommendations(
    allProducts,
    limit
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Filter out current product if showing in recommendations
  const displayedProducts = recommendations
    .filter(p => p.id !== currentProductId)
    .slice(0, limit);

  if (displayedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Recommended Just for You
          </h2>
        </div>

        {/* Smart Recommendation Info */}
        {displayedProducts.length > 0 && reasons[displayedProducts[0].id] && (
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Based on your interests: <span className="font-semibold text-blue-600 dark:text-cyan-400">
              {reasons[displayedProducts[0].id]}
            </span>
          </p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="relative">
                <ProductCard product={product} />
                {reasons[product.id] && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-400">
                    {reasons[product.id]}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {displayedProducts.length === limit && (
          <div className="mt-8 text-center">
            <Link href="/shop/products">
              <Button className="inline-flex items-center gap-2">
                View All Recommendations <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}

/**
 * Alternative: Trending Products Widget
 */
export function TrendingProducts({ allProducts, limit = 4 }: any) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get bestsellers and highly rated products
    const trending = allProducts
      .filter((p: any) => p.isBestseller || (p.rating || 0) >= 4.5)
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);

    setProducts(trending);
  }, [allProducts, limit]);

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-800/30 px-6 rounded-lg">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Trending Now</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <Link key={product.id} href={`/shop/products/${product.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="aspect-square relative overflow-hidden bg-slate-200 dark:bg-slate-700">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2">
                  {product.name}
                </h4>
                <p className="text-lg font-bold text-blue-600 dark:text-cyan-400">
                  ${product.price.toFixed(2)}
                </p>
                {product.rating && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    ⭐ {product.rating} ({product.reviews} reviews)
                  </p>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
