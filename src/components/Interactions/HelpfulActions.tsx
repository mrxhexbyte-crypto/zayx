'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HelpfulActionProps {
  action: string;
  message: string;
  icon?: React.ReactNode;
  autoHide?: boolean;
  duration?: number;
}

/**
 * Helpful action notification that appears when user does something
 * Examples: "Product added", "Saved for later", "Compare removed"
 */
export function HelpfulAction({
  action,
  message,
  icon,
  autoHide = true,
  duration = 3000,
}: HelpfulActionProps) {
  const [show, setShow] = useState(true);

  React.useEffect(() => {
    if (!autoHide) return;
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [autoHide, duration]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm"
    >
      {icon && <span className="text-green-400">{icon}</span>}
      <div>
        <p className="text-sm font-semibold text-green-200">{action}</p>
        <p className="text-xs text-green-100/80">{message}</p>
      </div>
    </motion.div>
  );
}

/**
 * Animated loading indicator with helpful message
 */
export function HelpfulLoading({
  message = 'Finding the perfect match for you...',
}: {
  message?: string;
}) {
  return (
    <motion.div className="flex flex-col items-center justify-center py-12 gap-4">
      {/* Animated loader */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
          />
        ))}
      </div>
      <p className="text-sm text-slate-400">{message}</p>
    </motion.div>
  );
}

/**
 * Smooth state transition animation
 */
export function StateTransition({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ opacity: isLoading ? 0.5 : 1 }}
      transition={{ duration: 0.3 }}
      className={isLoading ? 'pointer-events-none' : ''}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated empty state message
 */
export function EmptyStateMessage({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 space-y-4"
    >
      {Icon && (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <Icon className="w-12 h-12 text-slate-400" />
        </motion.div>
      )}
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto">{description}</p>
    </motion.div>
  );
}
