// File: src/components/ui/select.tsx
'use client';
import React from 'react';

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="rounded-md border px-3 py-2 bg-white dark:bg-slate-800 text-sm" />;
}
