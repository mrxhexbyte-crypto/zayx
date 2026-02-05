'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { id: 'nav-shop', href: '/shop/products', label: 'Shop' },
    { id: 'nav-pricing', href: '/pricing', label: 'Pricing' },
    { id: 'nav-docs', href: '/resources', label: 'Docs' },
    { id: 'nav-stories', href: '/case-studies', label: 'Stories' },
    { id: 'nav-support', href: '/contact', label: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-black border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
              Z
            </div>
            <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Zayx</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.id}
                href={link.href}
                className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium uppercase tracking-wide relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium uppercase tracking-wide">
                Admin
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <Link href="/shop/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/50">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {user?.firstName?.[0]}
                  </div>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-white/10 overflow-hidden">
                    <div className="px-4 py-4 border-b border-white/10 bg-white/5">
                      <p className="font-semibold text-white">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-slate-400">{user?.email}</p>
                      {user?.role === 'admin' && (
                        <p className="text-xs text-cyan-400 font-semibold mt-2">Admin</p>
                      )}
                    </div>
                    {user?.role === 'admin' && (
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-colors border-b border-white/5"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/account"
                      className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-colors border-b border-white/5"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10 bg-gradient-to-b from-slate-900 to-black p-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map(link => (
              <Link
                key={link.id}
                href={link.href}
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all text-sm font-medium uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/admin/dashboard"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all text-sm font-medium uppercase tracking-wide"
              >
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium uppercase tracking-wide flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <Link href="/auth/login" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all text-sm font-medium uppercase tracking-wide">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all text-sm font-medium uppercase tracking-wide">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
