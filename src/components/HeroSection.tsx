import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl opacity-40 -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl opacity-40 -ml-48"></div>

      <div className="container mx-auto px-4 py-24 sm:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 animate-fade-in-up">
            <div className="h-2 w-2 rounded-full bg-cyan-600"></div>
            <span className="text-sm font-medium text-gray-600">New Collection Now Available</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black mb-6 animate-fade-in-up leading-tight">
            Experience the
            <br />
            <span className="relative inline-block">
              <span className="text-cyan-600">Future</span>
              <span className="absolute inset-0 text-cyan-600 opacity-30 blur-md animate-pulse">Future</span>
            </span>
            {' '}of Style
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Discover premium products that combine innovation, design, and quality. Curated collections for the modern lifestyle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 hover:shadow-lg hover:shadow-cyan-600/50 transition-all duration-300 group"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black text-black font-bold rounded-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              View Collection
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="border-l-2 border-cyan-600 pl-4">
              <div className="text-3xl font-bold text-black">500+</div>
              <p className="text-sm text-gray-600">Premium Products</p>
            </div>
            <div className="border-l-2 border-cyan-600 pl-4">
              <div className="text-3xl font-bold text-black">10K+</div>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="border-l-2 border-cyan-600 pl-4">
              <div className="text-3xl font-bold text-black">24/7</div>
              <p className="text-sm text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-gray-400 text-xs font-medium">SCROLL TO EXPLORE</div>
        <div className="mt-2 text-gray-400 text-center">
          <svg className="w-5 h-5 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
