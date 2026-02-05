'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { LiveStats } from '@/components/LiveStats';
import { ModularSection, ModularGrid, ModularCard } from '@/components/Sections/ModularSection';
import { Button } from '@/components/ui/button';
import { useNotificationStore, notify } from '@/store/useNotificationStore';
import { useAutoRefresh } from '@/hooks/use-auto-refresh';
import { cache } from '@/lib/cache';
import { motion } from 'framer-motion';
import {
  Zap,
  Clock,
  Shield,
  Lightbulb,
  RotateCw,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export default function SmartFeaturesPage() {
  const [cacheStats, setCacheStats] = useState(cache.getStats());
  const [demoCounter, setDemoCounter] = useState(0);

  // Auto-refresh cache stats every 5 seconds
  useAutoRefresh({
    interval: 5000,
    onRefresh: async () => {
      setCacheStats(cache.getStats());
    },
    enabled: true,
  });

  const handleShowNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    notify[type](
      `${type.charAt(0).toUpperCase() + type.slice(1)} Message!`,
      `This is a real-time ${type} notification from the smart system.`
    );
  };

  const handleCacheDemo = () => {
    const key = `demo-${Date.now()}`;
    cache.set(key, `Demo data at ${new Date().toLocaleTimeString()}`, 30000);
    notify.success('Cache Updated', `Added to cache with 30s TTL`);
    setDemoCounter(prev => prev + 1);
  };

  const features = [
    {
      icon: Zap,
      title: 'Auto-Updating',
      description: 'Content automatically refreshes at intervals without manual intervention',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Clock,
      title: 'Smart Caching',
      description: 'Intelligent cache with automatic TTL, LRU eviction, and memory management',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Self-Healing',
      description: 'Automatic error recovery with retry logic and fallback UI',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Lightbulb,
      title: 'Real-Time Notifications',
      description: 'Global notification system with auto-dismissal and custom actions',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: RotateCw,
      title: 'Modular Architecture',
      description: 'Reusable components and hooks for rapid development',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Performance Optimized',
      description: 'Bundle optimization, code splitting, and hardware-accelerated animations',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="w-full overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black overflow-hidden pt-20">
          <motion.div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 border border-blue-200 dark:border-white/20 backdrop-blur-md">
                <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Smart, Self-Managing Website
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
              Intelligent <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Auto-Managing
              </span>
              <br /> Website
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Experience a website that automatically handles updates, errors, caching, and more. No manual intervention required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#features">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-semibold">
                  Explore Features
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-blue-200 dark:border-white/20 text-slate-900 dark:text-white px-8 py-6 text-lg font-semibold">
                  Back Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Live Stats */}
        <ModularSection
          className="bg-white dark:bg-slate-900"
          title="Live Dashboard"
          subtitle="Real-time metrics auto-updating every 15 seconds"
        >
          <LiveStats />
        </ModularSection>

        {/* Features */}
        <ModularSection
          id="features"
          className="bg-slate-50 dark:bg-slate-800"
          title="Smart Features"
          subtitle="Everything you need for intelligent web experiences"
        >
          <ModularGrid cols={3}>
            {features.map((feature, idx) => (
              <ModularCard key={idx} className="hover:scale-105 transition-transform">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </ModularCard>
            ))}
          </ModularGrid>
        </ModularSection>

        {/* Interactive Demo */}
        <ModularSection
          className="bg-white dark:bg-slate-900"
          title="Interactive Demo"
          subtitle="Try the smart features in action"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notifications Demo */}
            <ModularCard className="md:col-span-1">
              <h3 className="text-xl font-bold text-white mb-6">Real-Time Notifications</h3>
              <div className="space-y-3">
                <p className="text-slate-400 text-sm mb-4">
                  Click to trigger different notification types with auto-dismiss
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleShowNotification('success')}
                    className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50 gap-2"
                    variant="outline"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Success
                  </Button>
                  <Button
                    onClick={() => handleShowNotification('error')}
                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50 gap-2"
                    variant="outline"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Error
                  </Button>
                  <Button
                    onClick={() => handleShowNotification('warning')}
                    className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/50 gap-2"
                    variant="outline"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Warning
                  </Button>
                  <Button
                    onClick={() => handleShowNotification('info')}
                    className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50 gap-2"
                    variant="outline"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Info
                  </Button>
                </div>
              </div>
            </ModularCard>

            {/* Cache Demo */}
            <ModularCard className="md:col-span-1">
              <h3 className="text-xl font-bold text-white mb-6">Smart Caching</h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/30">
                  <p className="text-slate-400 text-xs mb-3">Cache Statistics</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Cache Hits:</span>
                      <span className="text-cyan-400 font-semibold">{cacheStats.hits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Hit Rate:</span>
                      <span className="text-cyan-400 font-semibold">{cacheStats.hitRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Entries:</span>
                      <span className="text-cyan-400 font-semibold">{cacheStats.entries}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCacheDemo}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Add to Cache ({demoCounter})
                </Button>
              </div>
            </ModularCard>
          </div>
        </ModularSection>

        {/* How It Works */}
        <ModularSection
          className="bg-slate-50 dark:bg-slate-800"
          title="How It Works"
          subtitle="The intelligent architecture behind your smart website"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: '1',
                title: 'Real-Time Data',
                desc: 'Auto-refresh hooks continuously update your content',
              },
              {
                number: '2',
                title: 'Smart Cache',
                desc: 'Intelligent caching prevents unnecessary API calls',
              },
              {
                number: '3',
                title: 'Error Recovery',
                desc: 'Self-healing boundaries auto-retry failed operations',
              },
              {
                number: '4',
                title: 'Live Feedback',
                desc: 'Real-time notifications keep users informed',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                  {item.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </ModularSection>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:bg-gradient-to-r dark:from-cyan-900/30 dark:to-blue-900/30 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Smart Difference
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your website that manages itself. Auto-updates, auto-caching, auto-recovery, and so much more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop/products">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-bold">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
