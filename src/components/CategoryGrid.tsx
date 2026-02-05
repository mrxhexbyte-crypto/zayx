import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Furniture', icon: '🛋️', color: 'from-cyan-400 to-blue-500' },
  { name: 'Lighting', icon: '💡', color: 'from-yellow-400 to-orange-500' },
  { name: 'Audio', icon: '🎧', color: 'from-purple-400 to-pink-500' },
  { name: 'Accessories', icon: '⌚', color: 'from-green-400 to-emerald-500' },
];

export default function CategoryGrid() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-cyan-600"></div>
            <span className="text-sm font-bold text-cyan-600 uppercase tracking-wider">Shop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black">
            Explore by Category
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 rounded-xl overflow-hidden cursor-pointer">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Overlay effect */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Decorative circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center group-hover:translate-y-0 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">Explore →</span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
