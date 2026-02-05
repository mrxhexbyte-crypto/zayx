'use client';

import { useNotificationStore } from '@/store/useNotificationStore';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const notificationColors = {
  success: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400',
  error: 'bg-red-500/10 border-red-500/50 text-red-400',
  info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
  warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
};

export function NotificationCenter() {
  const notifications = useNotificationStore((state) => state.notifications);
  const remove = useNotificationStore((state) => state.remove);

  return (
    <div className="fixed top-6 right-6 z-50 max-w-md space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = notificationIcons[notification.type];
          const colorClass = notificationColors[notification.type];

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, x: 400 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 400 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`p-4 rounded-lg border backdrop-blur-md ${colorClass} animate-in fade-in slide-in-from-right`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                  <p className="text-xs opacity-90 line-clamp-2">{notification.message}</p>
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      className="mt-2 text-xs font-medium underline hover:opacity-75 transition-opacity"
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => remove(notification.id)}
                  className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
