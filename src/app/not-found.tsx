'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ArrowRight, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <Header />

      <main className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[150px] font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto">
<<<<<<< HEAD
            Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
=======
            Oops! We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold gap-2 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </Link>
            <Link href="/shop/products">
              <Button variant="outline" className="border-2 border-slate-400 text-slate-300 hover:bg-white/10 px-8 py-6 text-lg font-semibold gap-2 rounded-lg transition-all">
                <Search className="w-5 h-5" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-slate-800/50 border border-white/10 rounded-lg p-8">
            <p className="text-slate-400 mb-6 text-sm uppercase tracking-wide font-semibold">Popular Pages</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Home
              </Link>
              <Link href="/shop/products" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Products
              </Link>
              <Link href="/shop/cart" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Cart
              </Link>
              <Link href="/auth/login" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
