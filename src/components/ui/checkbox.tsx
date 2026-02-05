// File: src/components/ui/checkbox.tsx
'use client';
import React from 'react';

export function Checkbox({ checked, onChange }: { checked?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className="h-4 w-4 rounded border text-indigo-600"
    />
  );
}
