'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { apiClient } from '@/lib/api-client';
import { formatPrice } from '@/lib/formatters';
import { useCart } from '@/hooks/use-cart';
import { useTrackProductView, useTrackInteraction } from '@/hooks/use-smart-recommendations';
import { SmartRecommendations } from '@/components/Shop/SmartRecommendations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams() as { id?: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { trackClick, trackAddToCart, trackPurchase } = useTrackInteraction();

  // Track product view
  useTrackProductView(params?.id, product);

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.id) return;
      try {
        // Fetch current product
        const response = await apiClient.get(`/products/${params.id}`);
        const data = response.data as { success?: boolean; data?: Product };
        if (data.success && data.data) {
          setProduct(data.data);
          trackClick(params.id, data.data.category);
        }

        // Fetch all products for recommendations
        const allResponse = await apiClient.get('/products?limit=100');
        const allData = allResponse.data as { success?: boolean; data?: Product[] };
        if (allData.success && allData.data) {
          setAllProducts(allData.data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, trackClick]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      trackAddToCart(product.id, product.price);
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <p className="text-slate-400">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product not found</h1>
          <Link href="/shop/products">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/shop/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <Card className="relative aspect-square overflow-hidden bg-slate-800 border border-white/10">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-cyan-400 text-cyan-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-400">({product.reviews || 0} reviews)</span>
              </div>

              <p className="text-lg text-slate-400 leading-relaxed mb-8">{product.description}</p>
            </div>

            {/* Price */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-slate-500 line-through">{formatPrice(product.compareAtPrice)}</span>
                )}
              </div>

              {product.stock > 0 ? (
                <p className="text-emerald-400 font-semibold">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-red-400 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-slate-300">Quantity:</span>
                <div className="flex items-center border border-white/20 rounded-lg bg-slate-700/50 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full text-lg py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <Link href="/shop/cart" className="block">
                <Button variant="outline" className="w-full border-white/20 text-slate-300 hover:text-cyan-400">
                  Go to Cart
                </Button>
              </Link>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Card className="p-6 bg-slate-800/50 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-slate-400">{key}</span>
                      <span className="text-white font-semibold">{value as string}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Smart Recommendations Section */}
        {allProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <SmartRecommendations
              allProducts={allProducts}
              currentProductId={product?.id}
              limit={6}
            />
          </div>
        )}
      </div>
    </main>
  );
}
