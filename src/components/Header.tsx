'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 bg-[rgba(198,70,70,1)] rounded-sm flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(https://image2url.com/r2/default/images/1770283349760-3166247b-66d6-4a18-b2be-bf5a97f25483.jpg)" }}>
            <br />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-bold text-black group-hover:text-cyan-600 transition-colors">ZAYX</span>
            <span className="text-xs text-gray-500">Premium Store</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-gray-900 hover:text-cyan-600 transition-colors duration-200 relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-900 hover:text-cyan-600 transition-colors duration-200 relative group">
            Collection
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-900 hover:text-cyan-600 transition-colors duration-200 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-900 hover:text-cyan-600 transition-colors duration-200 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <Link
            href="/checkout"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-cyan-600 text-white text-xs flex items-center justify-center rounded-full font-bold group-hover:bg-cyan-700 transition-colors">
              0
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-fade-in-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="#" className="text-sm font-medium text-gray-900 py-2 border-b border-gray-100">Shop</Link>
            <Link href="#" className="text-sm font-medium text-gray-900 py-2 border-b border-gray-100">Collection</Link>
            <Link href="#" className="text-sm font-medium text-gray-900 py-2 border-b border-gray-100">About</Link>
            <Link href="#" className="text-sm font-medium text-gray-900 py-2">Contact</Link>
          </nav>
        </div>
      )}

      {/* Search Bar (Animated) */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-white animate-fade-in-up">
          <div className="container mx-auto px-4 py-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
