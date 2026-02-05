'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { User } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user accounts (for testing without Supabase)
const DEMO_ACCOUNTS = {
  'admin@zayx.com': {
    password: 'Admin123!',
    user: {
      id: 'admin-uuid',
      email: 'admin@zayx.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin' as const,
      isActive: true,
    },
  },
  'user@zayx.com': {
    password: 'User123!',
    user: {
      id: 'user-uuid',
      email: 'user@zayx.com',
      firstName: 'Demo',
      lastName: 'Customer',
      role: 'customer' as const,
      isActive: true,
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useLocalStorage<User | null>('auth_user', null);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage (demo accounts)
        if (storedUser) {
          setUser(storedUser);
          setIsLoading(false);
          return;
        }

        // Try Supabase if configured
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser(profile);
              setStoredUser(profile);
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [storedUser, setStoredUser]);

  const login = useCallback(async (email: string, password: string) => {
    // Check demo accounts first
    const demoAccount = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS];
    if (demoAccount && demoAccount.password === password) {
      const demoUser = {
        ...demoAccount.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(demoUser);
      setStoredUser(demoUser);
      return;
    }

    // Try Supabase if configured
    if (!supabase) {
      throw new Error('Database not configured. Use demo accounts (admin@zayx.com or user@zayx.com)');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          setUser(profile);
          setStoredUser(profile);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    }
  }, [setStoredUser]);

  const signup = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    // For demo, create a local account
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      role: 'customer',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      // Try Supabase first if configured
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (!error && data.user) {
          // Create user profile in Supabase
          await supabase.from('users').insert({
            id: data.user.id,
            email,
            firstName,
            lastName,
            role: 'customer',
            isActive: true,
          });

          setUser(newUser);
          setStoredUser(newUser);
          return;
        }
      }
    } catch (error) {
      console.warn('Supabase signup failed, using local auth:', error);
    }

    // Fallback to local storage
    setUser(newUser);
    setStoredUser(newUser);
  }, [setStoredUser]);

  const logout = useCallback(async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.warn('Supabase logout failed:', error);
    }
    setUser(null);
    setStoredUser(null);
  }, [setStoredUser]);

  const updateProfile = useCallback(async (profileData: Partial<User>) => {
    if (!user) return;

    try {
      // Try Supabase if configured
      if (supabase) {
        const { error } = await supabase
          .from('users')
          .update(profileData)
          .eq('id', user.id);

        if (!error) {
          const updated = { ...user, ...profileData };
          setUser(updated);
          setStoredUser(updated);
          return;
        }
      }
    } catch (error) {
      console.warn('Supabase update failed, using local auth:', error);
    }

    // Fallback to local storage
    const updated = { ...user, ...profileData };
    setUser(updated);
    setStoredUser(updated);
  }, [user, setStoredUser]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
