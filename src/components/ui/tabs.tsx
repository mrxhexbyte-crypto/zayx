// File: src/components/ui/tabs.tsx
'use client';
import React from 'react';

export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => onChange(i)}
            className={`px-3 py-1 rounded ${i === active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
