'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SmartWelcome() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(true);

  useEffect(() => {
    // Check if user has seen welcome before
    const welcomeViewed = localStorage.getItem('welcome-viewed');
    if (!welcomeViewed) {
      // Delay showing welcome for better UX
      const timer = setTimeout(() => {
        setShowWelcome(true);
        setHasSeenWelcome(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowWelcome(false);
    localStorage.setItem('welcome-viewed', 'true');
  };

  if (hasSeenWelcome) return null;

  return (
    <AnimatePresence>
      {showWelcome && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-lg p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Welcome Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome!
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    We built this for real people like you. No complicated menus, no hidden fees. Just smart shopping that actually makes sense.
                  </p>
                </div>

                {/* Quick Tips */}
                <div className="space-y-3 bg-white/5 rounded-lg p-4">
                  <div className="flex gap-3">
                    <ShoppingBag className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-cyan-100">
                        Browse & Add
                      </p>
                      <p className="text-xs text-slate-400">
                        Look around. No pressure to buy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-blue-100">
                        Ask Questions
                      </p>
                      <p className="text-xs text-slate-400">
                        Our AI is here to help explain things.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
                >
                  Let me explore
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
