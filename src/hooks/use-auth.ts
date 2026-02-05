'use client';

import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '@/context/AuthContext';

// Default auth context for SSR
const defaultContext: AuthContextType = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
};

export function useAuth() {
  const context = useContext(AuthContext);

  // Return default context if provider is not available (e.g., during SSR)
  if (!context) {
    return defaultContext;
  }

  return context;
}
