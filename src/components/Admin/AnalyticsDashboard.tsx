'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';

interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

interface ProductPerformance {
  productId: string;
  name: string;
  views: number;
  sales: number;
  conversionRate: number;
  revenue: number;
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalViews: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    topCategories: [] as string[],
  });

  const [performingProducts, setPerformingProducts] = useState<ProductPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data from your API
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard');
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setPerformingProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const StatCard = ({ icon: Icon, label, value, change }: any) => (
    <Card className="p-6 dark:bg-slate-800/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={ShoppingCart}
            label="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            change={12}
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            change={8}
          />
          <StatCard
            icon={Activity}
            label="Total Views"
            value={stats.totalViews.toLocaleString()}
            change={15}
          />
          <StatCard
            icon={TrendingUp}
            label="Conversion Rate"
            value={`${(stats.conversionRate * 100).toFixed(2)}%`}
            change={3}
          />
          <StatCard
            icon={DollarSign}
            label="Avg Order Value"
            value={`$${stats.avgOrderValue.toFixed(2)}`}
            change={5}
          />
          <StatCard
            icon={BarChart3}
            label="Top Category"
            value={stats.topCategories[0] || 'N/A'}
          />
        </div>
      </div>

      {/* Top Performing Products */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Product</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Views</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Conversion</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {performingProducts.slice(0, 5).map(product => (
                <tr key={product.productId} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-4 text-sm text-slate-900 dark:text-white font-medium">{product.name}</td>
                  <td className="text-right py-4 px-4 text-sm text-slate-600 dark:text-slate-400">{product.views.toLocaleString()}</td>
                  <td className="text-right py-4 px-4 text-sm text-slate-600 dark:text-slate-400">{product.sales}</td>
                  <td className="text-right py-4 px-4 text-sm">
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {(product.conversionRate * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="text-right py-4 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                    ${product.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          <TrendingUp className="w-6 h-6 inline mr-2" />
          Smart Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 dark:bg-slate-800/50">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Insights</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>✓ Top performing category this week</li>
              <li>✓ Users prefer products in {stats.topCategories[0]} category</li>
              <li>✓ Average order value is ${stats.avgOrderValue.toFixed(2)}</li>
              <li>✓ Conversion rate is {(stats.conversionRate * 100).toFixed(2)}%</li>
            </ul>
          </Card>
          <Card className="p-6 dark:bg-slate-800/50">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recommendations</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>📊 Focus on {stats.topCategories[0]} category products</li>
              <li>🎯 Optimize products with low conversion rates</li>
              <li>💰 Increase visibility of high-revenue items</li>
              <li>🔄 Personalize recommendations for returning customers</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
