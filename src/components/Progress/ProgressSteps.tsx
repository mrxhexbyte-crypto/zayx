'use client';

import { motion } from 'framer-motion';
import { useProgressStore, STEP_LABELS } from '@/store/progress.store';
import { Check } from 'lucide-react';

export function ProgressSteps() {
  const { currentStep, completedSteps, isVisible } = useProgressStore();

  if (!isVisible) return null;

  const steps = Object.entries(STEP_LABELS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8"
    >
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const [stepKey, stepLabel] = step;
          const isCompleted = completedSteps.includes(stepKey as any);
          const isCurrent = currentStep === stepKey;

          return (
            <div key={stepKey} className="flex items-center flex-1">
              {/* Step Circle */}
              <motion.div
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  boxShadow: isCurrent
                    ? '0 0 20px rgba(6, 182, 212, 0.5)'
                    : isCompleted
                      ? '0 0 10px rgba(34, 197, 94, 0.3)'
                      : 'none',
                }}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : isCurrent
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </motion.div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    animate={{
                      width: isCompleted ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex mt-4 text-xs">
        {steps.map((step) => {
          const [stepKey, stepLabel] = step;
          const isCompleted = completedSteps.includes(stepKey as any);
          const isCurrent = currentStep === stepKey;

          return (
            <div
              key={`label-${stepKey}`}
              className="flex-1 text-center"
            >
              <motion.span
                animate={{
                  color: isCurrent ? '#22d3ee' : isCompleted ? '#22c55e' : '#94a3b8',
                }}
                className="font-medium"
              >
                {stepLabel}
              </motion.span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
