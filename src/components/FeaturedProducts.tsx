// File: src/components/FeaturedProducts.tsx
import React from 'react';

type Product = { id: string; title: string; price: string; image?: string };

const SAMPLE: Product[] = [
  { id: 'p1', title: 'Minimal Chair', price: '$129', image: '' },
  { id: 'p2', title: 'Desk Lamp', price: '$49', image: '' },
  { id: 'p3', title: 'Wireless Headphones', price: '$199', image: '' },
];

export default function FeaturedProducts({ items = SAMPLE }: { items?: Product[] }) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article key={p.id} className="rounded-lg border p-4 bg-white dark:bg-slate-900">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-md mb-4 flex items-center justify-center text-slate-400">
                {p.image ? <img src={p.image} alt={p.title} /> : <span className="text-sm">Image</span>}
              </div>
              <h3 className="font-semibold">{p.title}</h3>
              <div className="mt-2 text-slate-600 dark:text-slate-300">{p.price}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
