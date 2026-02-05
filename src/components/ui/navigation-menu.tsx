// File: src/components/ui/navigation-menu.tsx
import React from 'react';
import Link from 'next/link';

export function NavigationMenu() {
  return (
    <nav className="flex gap-4">
      <Link href="/" className="text-sm text-slate-700 dark:text-slate-200">Home</Link>
      <Link href="/shop" className="text-sm text-slate-700 dark:text-slate-200">Shop</Link>
      <Link href="/about" className="text-sm text-slate-700 dark:text-slate-200">About</Link>
    </nav>
  );
}
