// File: src/components/ui/label.tsx
import React from 'react';
import clsx from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({
  children,
  htmlFor,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={clsx(
        'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1',
        className
      )}
    >
      {children}
    </label>
  );
}
