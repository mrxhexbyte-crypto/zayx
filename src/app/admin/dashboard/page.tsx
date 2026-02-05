'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, ShoppingBag, Users, DollarSign, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '@/data/sample-products';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/login');
      return;
    }

    // Calculate stats from sample data
    setStats({
      totalProducts: SAMPLE_PRODUCTS.length,
      totalRevenue: SAMPLE_PRODUCTS.reduce((sum, p) => sum + (p.price * 5), 0),
      totalOrders: Math.floor(Math.random() * 150) + 50,
      totalCustomers: Math.floor(Math.random() * 300) + 100,
    });
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome back, {user?.firstName}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/settings">
              <Button variant="outline" className="border-white/20 text-slate-300 hover:text-cyan-400 gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-2">Total Products</p>
                <p className="text-4xl font-bold text-white">{stats.totalProducts}</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Active in catalog</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-emerald-400/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-2">Total Revenue</p>
                <p className="text-4xl font-bold text-emerald-400">${(stats.totalRevenue / 1000).toFixed(1)}k</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">All time</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-purple-400/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-2">Total Orders</p>
                <p className="text-4xl font-bold text-purple-400">{stats.totalOrders}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">This month</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-blue-400/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-2">Total Customers</p>
                <p className="text-4xl font-bold text-blue-400">{stats.totalCustomers}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Active users</p>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Management */}
          <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Products</h2>
                <p className="text-slate-400">Manage your product catalog</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">You have {stats.totalProducts} products in your catalog</p>
              <Link href="/admin/products">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold">
                  Manage Products
                </Button>
              </Link>
            </div>
          </Card>

          {/* Orders Management */}
          <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-emerald-400/50 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Orders</h2>
                <p className="text-slate-400">Track and manage orders</p>
              </div>
              <BarChart3 className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">You have {stats.totalOrders} orders this month</p>
              <Link href="/admin/orders">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold">
                  View Orders
                </Button>
              </Link>
            </div>
          </Card>

          {/* Customers Management */}
          <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-purple-400/50 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Customers</h2>
                <p className="text-slate-400">View customer information</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">You have {stats.totalCustomers} active customers</p>
              <Link href="/admin/customers">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold">
                  View Customers
                </Button>
              </Link>
            </div>
          </Card>

          {/* Analytics */}
          <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-blue-400/50 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Analytics</h2>
                <p className="text-slate-400">View business insights</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">Track sales, revenue, and trends</p>
              <Link href="/admin/analytics">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold">
                  View Analytics
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/products/new">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                + Add Product
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                View Orders
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Manage Customers
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                See Reports
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
