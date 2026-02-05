// File: src/components/CartPanel.tsx
'use client';
import React from 'react';

export default function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <aside className="w-96 bg-white dark:bg-slate-900 border-l p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Cart</h4>
          <button onClick={onClose} className="text-sm text-slate-500">Close</button>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">Your cart is empty.</div>
      </aside>
    </div>
  );
}
