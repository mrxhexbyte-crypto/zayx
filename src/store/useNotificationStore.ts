import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // milliseconds, null = persistent
  action?: {
    label: string;
    onClick: () => void;
  };
  autoClose?: boolean;
}

interface NotificationState {
  notifications: Notification[];
  add: (notification: Omit<Notification, 'id'>) => string;
  remove: (id: string) => void;
  clear: () => void;
  update: (id: string, updates: Partial<Notification>) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  add: (notification: Omit<Notification, 'id'>) => {
    const id = uuidv4();
    const fullNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 3000,
      autoClose: notification.autoClose !== false,
    };

    set((state) => ({
      notifications: [...state.notifications, fullNotification],
    }));

    // Auto-remove if autoClose is enabled
    if (fullNotification.autoClose && fullNotification.duration) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, fullNotification.duration);
    }

    return id;
  },

  remove: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clear: () => {
    set({ notifications: [] });
  },

  update: (id: string, updates: Partial<Notification>) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, ...updates } : n
      ),
    }));
  },
}));

// Convenience functions
export const notify = {
  success: (title: string, message: string) =>
    useNotificationStore.getState().add({
      type: 'success',
      title,
      message,
      duration: 3000,
    }),
  
  error: (title: string, message: string) =>
    useNotificationStore.getState().add({
      type: 'error',
      title,
      message,
      duration: 5000,
    }),
  
  info: (title: string, message: string) =>
    useNotificationStore.getState().add({
      type: 'info',
      title,
      message,
      duration: 3000,
    }),
  
  warning: (title: string, message: string) =>
    useNotificationStore.getState().add({
      type: 'warning',
      title,
      message,
      duration: 4000,
    }),
};
