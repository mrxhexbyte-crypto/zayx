'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useProductProgress } from '@/hooks/use-progress';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { trackAddToCart } = useProductProgress();
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    trackAddToCart();
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden hover:border-cyan-400/50 transition-all cursor-pointer h-full flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 hover:shadow-2xl hover:shadow-cyan-500/20">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-slate-800 h-56">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {product.isBestseller && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold">Bestseller</Badge>
            )}
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold">New</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold">{discount}% OFF</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 left-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all backdrop-blur-sm group-hover:bg-cyan-500/20">
            <Heart className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Category */}
          <p className="text-xs text-cyan-400/70 uppercase tracking-widest font-semibold mb-2">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="font-bold text-white mb-3 line-clamp-2 flex-grow text-sm">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-cyan-400 text-cyan-400'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">
                ({product.reviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className={`text-xs font-semibold mb-4 ${
            product.stock > 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full gap-2 font-semibold transition-all ${
              product.stock === 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
