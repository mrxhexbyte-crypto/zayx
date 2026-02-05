'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/Shop/ProductCard';
import { Sparkles } from 'lucide-react';

interface RecommendationWidgetProps {
  productId?: string;
  category?: string;
  limit?: number;
}

export function RecommendationWidget({
  productId,
  category,
  limit = 6,
}: RecommendationWidgetProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (productId) params.append('productId', productId);
        if (category) params.append('category', category);

        const response = await fetch(`/api/ai/recommend?${params}`);
        const data = await response.json();

        if (data.success) {
          setRecommendations(data.recommendations.slice(0, limit));
          setMessage(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId, category, limit]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Recommended For You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg animate-pulse border border-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          {message || 'Recommended For You'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
