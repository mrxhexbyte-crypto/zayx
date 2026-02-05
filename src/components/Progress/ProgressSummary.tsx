'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/progress.store';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ProgressSummaryProps {
  showDetails?: boolean;
  compact?: boolean;
}

export function ProgressSummary({
  showDetails = true,
  compact = false,
}: ProgressSummaryProps) {
  const { currentStep, completedSteps, progress } = useProgressStore();

  const messages: Record<number, { title: string; description: string }> = {
    0: {
      title: 'Start Browsing',
      description: 'Explore our products and find what you like',
    },
    25: {
      title: 'Great Start!',
      description: 'You have found a product. Keep exploring or add to cart',
    },
    50: {
      title: 'Halfway There!',
      description: 'Your cart is ready. Ready to checkout?',
    },
    75: {
      title: 'Almost Done!',
      description: 'Just a few more steps to complete your order',
    },
    100: {
      title: 'Order Complete!',
      description: 'Thank you for your purchase',
    },
  };

  const getStatusMessage = () => {
    if (progress >= 100) return messages[100];
    if (progress >= 75) return messages[75];
    if (progress >= 50) return messages[50];
    if (progress >= 25) return messages[25];
    return messages[0];
  };

  const status = getStatusMessage();

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-cyan-500/30 rounded-lg"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
        <span className="text-xs text-cyan-100 font-medium">{progress}% Complete</span>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={progress}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-lg space-y-3"
      >
        <div className="flex items-start gap-3">
          {progress === 100 ? (
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h3 className="font-semibold text-cyan-100 text-sm">{status.title}</h3>
            {showDetails && (
              <p className="text-xs text-slate-400 mt-1">{status.description}</p>
            )}
          </div>
        </div>

        {/* Progress Stats */}
        {showDetails && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
            <div className="text-center">
              <p className="text-xl font-bold text-cyan-400">{progress}%</p>
              <p className="text-xs text-slate-400">Progress</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-400">
                {completedSteps.length}
              </p>
              <p className="text-xs text-slate-400">Steps Done</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-blue-400">
                {8 - completedSteps.length}
              </p>
              <p className="text-xs text-slate-400">Steps Left</p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
