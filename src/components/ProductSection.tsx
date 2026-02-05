import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Audio',
    price: 299,
    originalPrice: 399,
    image: '🎧',
    badge: 'Sale',
    rating: 4.8,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Wearables',
    price: 499,
    image: '⌚',
    badge: 'New',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Ultra HD Camera',
    category: 'Photography',
    price: 1299,
    image: '📷',
    rating: 4.7,
    reviews: 54,
  },
  {
    id: 4,
    name: 'Premium Backpack',
    category: 'Travel',
    price: 199,
    originalPrice: 249,
    image: '🎒',
    badge: 'Popular',
    rating: 4.6,
    reviews: 212,
  },
  {
    id: 5,
    name: 'Wireless Charger',
    category: 'Accessories',
    price: 79,
    image: '🔌',
    badge: 'New',
    rating: 4.5,
    reviews: 167,
  },
  {
    id: 6,
    name: 'Premium Keyboard',
    category: 'Tech',
    price: 249,
    image: '⌨️',
    rating: 4.8,
    reviews: 143,
  },
];

export default function ProductSection() {
  return (
    <section id="products" className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-cyan-600"></div>
            <span className="text-sm font-bold text-cyan-600 uppercase tracking-wider">Featured</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black mb-4">
            Curated Selection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover our handpicked collection of premium products, carefully selected for quality, design, and innovation.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-cyan-600 transition-all duration-300 flex flex-col">
                {/* Product Image Area */}
                <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-cyan-50 group-hover:to-purple-50 transition-all duration-300">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
                  </div>

                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-cyan-600/50 transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex-1 p-5 flex flex-col">
                  <div className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < Math.floor(product.rating) ? '⭐' : '☆'}`}
                        >
                          {''}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto flex items-center gap-2 mb-4">
                    <span className="text-2xl font-black text-black">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-black text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 hover:shadow-lg hover:shadow-cyan-600/50 transition-all duration-300 group/btn">
                    <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-black font-bold rounded-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Products
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
