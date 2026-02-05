// File: src/components/QuickLinks.tsx
import React from 'react';
import Link from 'next/link';

export default function QuickLinks() {
  const links = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <aside className="p-4 rounded-md border bg-white dark:bg-slate-900">
      <h4 className="font-semibold mb-2">Quick Links</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-indigo-600 dark:text-indigo-400 hover:underline">{l.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
