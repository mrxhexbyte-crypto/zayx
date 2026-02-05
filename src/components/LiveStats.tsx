'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Zap } from 'lucide-react';

interface Stats {
  activeUsers: number;
  ordersToday: number;
  revenue: number;
}

export function LiveStats() {
  const [stats, setStats] = useState<Stats>({
    activeUsers: 0,
    ordersToday: 0,
    revenue: 0,
  });

  // Simulate real-time stats updates
  useEffect(() => {
    // Initial values
    setStats({
      activeUsers: Math.floor(Math.random() * 500) + 100,
      ordersToday: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 50000) + 10000,
    });

    // Auto-update every 15 seconds
    const interval = setInterval(() => {
      setStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        ordersToday: prev.ordersToday + (Math.random() > 0.5 ? 1 : 0),
        revenue: prev.revenue + Math.floor(Math.random() * 200),
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: Users,
      label: 'Active Users',
      value: stats.activeUsers.toString(),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      label: 'Orders Today',
      value: stats.ordersToday.toString(),
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Zap,
      label: 'Revenue',
      value: `$${(stats.revenue / 1000).toFixed(1)}k`,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statItems.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 hover:border-white/20 transition-all"
        >
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5`} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="text-white/20"
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            </div>

            <p className="text-slate-400 text-sm mb-2">{item.label}</p>
            <motion.h3
              key={item.value}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
            >
              {item.value}
            </motion.h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
