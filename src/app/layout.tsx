import type { Metadata } from 'next';
import { Providers } from './providers';
import { NotificationCenter } from '@/components/Notifications/NotificationCenter';
import { SelfHealingBoundary } from '@/components/ErrorBoundary/SelfHealingBoundary';
import { HintDisplay } from '@/components/Hints/HintDisplay';
import { ProgressBar } from '@/components/Progress/ProgressBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zayx Store - AI-Powered E-Commerce',
  description: 'Ultimate shopping experience with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="font-sans bg-slate-950 text-white">
        <SelfHealingBoundary autoRetry retryDelay={3000}>
          <Providers>
            <ProgressBar />
            {children}
            <NotificationCenter />
            <HintDisplay />
          </Providers>
        </SelfHealingBoundary>
      </body>
    </html>
  );
}
