'use client';

import { useHintsStore } from '@/store/hints.store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

export function HintDisplay() {
  const { currentHint, hideHint } = useHintsStore();

  return (
    <AnimatePresence mode="wait">
      {currentHint && (
        <motion.div
          key={currentHint.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40 max-w-md"
        >
          <div className="relative">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300" />

            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-lg p-4 shadow-xl shadow-cyan-500/10 backdrop-blur-sm">
              {/* Header with icon and title */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-shrink-0 pt-0.5">
                    <Lightbulb className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-cyan-100">
                    {currentHint.title}
                  </h3>
                </div>
                <button
                  onClick={hideHint}
                  className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-white/5 rounded"
                  aria-label="Close hint"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message */}
              <p className="text-sm text-slate-300 leading-relaxed pl-7">
                {currentHint.message}
              </p>

              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{
                  duration: currentHint.duration / 1000,
                  ease: 'linear',
                }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 origin-left rounded-b-lg"
                style={{ transformOrigin: 'left center' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
