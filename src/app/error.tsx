'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RotateCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 border border-red-500/50 mb-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Something Went Wrong
        </h1>

        {/* Error Message */}
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        {/* Diagnostic Info */}
        {error.digest && (
          <div className="bg-slate-800/50 border border-red-500/20 rounded-lg p-4 mb-8 text-left">
            <p className="text-xs text-slate-400 mb-2 font-mono">Error ID: {error.digest}</p>
            <p className="text-xs text-slate-500">Please mention this ID if you need support</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold gap-2 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
          >
            <RotateCw className="w-5 h-5" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="border-2 border-slate-400 text-slate-300 hover:bg-white/10 px-8 py-6 text-lg font-semibold gap-2 rounded-lg transition-all w-full sm:w-auto">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
