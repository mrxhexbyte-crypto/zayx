// File: src/components/ui/input.tsx
'use client';
import React from 'react';
import clsx from 'clsx';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx('rounded-md border px-3 py-2 bg-white dark:bg-slate-800 text-sm', props.className)}
    />
  );
}
