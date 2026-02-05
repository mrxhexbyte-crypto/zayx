// File: src/components/ui/radio-group.tsx
'use client';
import React from 'react';

export function RadioGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-3">
      {options.map((o) => (
        <label key={o.value} className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="rg"
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="h-4 w-4"
          />
          <span className="text-sm">{o.label}</span>
        </label>
      ))}
    </div>
  );
}
