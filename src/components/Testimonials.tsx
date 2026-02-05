// File: src/components/Testimonials.tsx
import React from 'react';

const TESTIMONIALS = [
  { id: 1, name: 'Aisha', text: 'Zayx helped us launch faster — love the DX.' },
  { id: 2, name: 'Omar', text: 'Solid starter kit with great defaults.' },
];

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">What people say</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.id} className="rounded-lg border p-6 bg-white dark:bg-slate-900">
              <p className="text-slate-700 dark:text-slate-300">“{t.text}”</p>
              <footer className="mt-3 text-sm text-slate-500 dark:text-slate-400">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
