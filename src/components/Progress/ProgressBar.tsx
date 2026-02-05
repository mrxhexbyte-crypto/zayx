'use client';

import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/progress.store';
import { Zap } from 'lucide-react';

export function ProgressBar() {
  const { progress, isVisible } = useProgressStore();

  if (!isVisible || progress === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/30 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0" />

          {/* Progress Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-sm font-medium text-cyan-100">
                You are {progress}% through your journey
              </span>
              <span className="text-xs text-slate-400">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/50"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
