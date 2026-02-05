// File: src/components/ui/dialog.tsx
'use client';
import React from 'react';

export function Dialog({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white dark:bg-slate-900 rounded-md p-6 max-w-lg w-full">{children}</div>
    </div>
  );
}
