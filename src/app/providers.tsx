'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { SmartWelcome } from '@/components/Onboarding/SmartWelcome';

const ChatBot = dynamic(() => import('@/app/components/AI/ChatBot'), {
  ssr: false,
});

function PWARegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log('Service worker registration failed:', error);
      });
    }
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <PWARegistration />
        {children}
        <ChatBot />
        <SmartWelcome />
        <Toaster position="top-right" />
      </CartProvider>
    </AuthProvider>
  );
}
