/**
 * DASHBOARD PAGE TEMPLATE
 * 
 * Optimized for internal tools and admin panels
 * - Sidebar navigation
 * - Stats cards
 * - Data tables
 * - Charts and graphs
 * - Action cards
 */

'use client';

import React, { useState } from 'react';
import {
  // Primitives
  Box,
  VStack,
  HStack,
  Grid,
  Text,
  Flex,
  // Molecules
  Button,
  Card,
  Badge,
  Input,
  // Organisms
  Skeleton,
} from '@/components';
import { useMobile } from '@/hooks';
import {
  Menu,
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Search,
  Download,
  Filter,
  MoreVertical,
} from 'lucide-react';

/**
 * StatCard: Reusable card for KPI display
 */
function StatCard({
  icon: Icon,
  label,
  value,
  change,
  isPositive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <Card variant="elevated">
      <VStack gap="md">
        <HStack justify="space-between" align="start">
          <VStack gap="sm">
            <Text size="sm" className="text-slate-600 dark:text-slate-400">
              {label}
            </Text>
            <Text size="3xl" weight="bold">
              {value}
            </Text>
          </VStack>
          <Box className={`p-3 rounded-lg ${
            isPositive
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {typeof Icon === 'string' ? Icon : <Icon />}
          </Box>
        </HStack>

        <HStack align="center" gap="xs">
          <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
          <Text
            size="sm"
            className={isPositive ? 'text-green-600' : 'text-red-600'}
          >
            {change}
          </Text>
          <Text size="sm" className="text-slate-600 dark:text-slate-400">
            vs last month
          </Text>
        </HStack>
      </VStack>
    </Card>
  );
}

/**
 * DataTable: Simple table component
 */
function DataTable() {
  const isMobile = useMobile();

  return (
    <Card>
      <VStack gap="md">
        {/* Table Header */}
        <HStack justify="space-between" align="center">
          <Text weight="bold" size="lg">
            Recent Orders
          </Text>
          <HStack gap="sm">
            <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
            <Button variant="ghost" size="sm" icon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
          </HStack>
        </HStack>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'ORD-001', customer: 'John Doe', amount: '$1,234', status: 'Completed' },
                { id: 'ORD-002', customer: 'Jane Smith', amount: '$2,456', status: 'Pending' },
                { id: 'ORD-003', customer: 'Bob Johnson', amount: '$890', status: 'Completed' },
                { id: 'ORD-004', customer: 'Alice Williams', amount: '$3,567', status: 'Shipped' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{row.id}</td>
                  <td className="py-3 px-4">{row.customer}</td>
                  <td className="py-3 px-4 font-semibold">{row.amount}</td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      row.status === 'Completed' ? 'success' :
                      row.status === 'Pending' ? 'warning' :
                      'info'
                    }>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <HStack justify="space-between" align="center">
          <Text size="sm" className="text-slate-600 dark:text-slate-400">
            Showing 1-4 of 24 results
          </Text>
          <HStack gap="sm">
            <Button variant="ghost" size="sm">Previous</Button>
            <Button variant="solid" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">Next</Button>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
}

/**
 * Main Dashboard Component
 */
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <HStack gap="md" align="center">
            <Button variant="ghost" size="sm" icon={<Menu className="w-5 h-5" />} />
            <Text weight="bold" size="lg">Dashboard</Text>
          </HStack>

          <HStack gap="md">
            <div className="hidden sm:flex">
              <Input
                placeholder="Search..."
                icon={<Search className="w-4 h-4" />}
                size="sm"
              />
            </div>
            <Button variant="ghost" size="sm">👤</Button>
          </HStack>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <VStack gap="lg" className="mb-8">
          <HStack justify="space-between" align="center">
            <VStack gap="xs">
              <Text as="h1" size="3xl" weight="bold">
                Dashboard
              </Text>
              <Text className="text-slate-600 dark:text-slate-400">
                Welcome back! Here's what's happening with your business today.
              </Text>
            </VStack>
            <Button>
              Generate Report
            </Button>
          </HStack>
        </VStack>

        {/* KPI Stats */}
        <Grid columns={isMobile ? 1 : 2} gap="lg" className="mb-8">
          <StatCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Revenue"
            value="$12,456"
            change="+12.5%"
            isPositive
          />
          <StatCard
            icon={<ShoppingCart className="w-6 h-6" />}
            label="Orders"
            value="245"
            change="+8.2%"
            isPositive
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="Customers"
            value="1,234"
            change="-2.1%"
            isPositive={false}
          />
          <StatCard
            icon={<BarChart3 className="w-6 h-6" />}
            label="Conversion"
            value="3.24%"
            change="+0.5%"
            isPositive
          />
        </Grid>

        {/* Content Grid */}
        <Grid columns={isMobile ? 1 : 3} gap="lg" className="mb-8">
          {/* Chart Placeholder */}
          <Card className="col-span-1 md:col-span-2">
            <VStack gap="md">
              <Text weight="bold">Sales Chart</Text>
              <Box className="h-64 bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg flex items-center justify-center">
                <Text className="text-slate-400">Chart goes here</Text>
              </Box>
            </VStack>
          </Card>

          {/* Quick Actions */}
          <Card variant="primary">
            <VStack gap="md">
              <Text weight="bold" size="lg">Quick Actions</Text>
              <VStack gap="sm">
                <Button variant="secondary" size="sm" fullWidth>
                  Create Order
                </Button>
                <Button variant="secondary" size="sm" fullWidth>
                  Add Customer
                </Button>
                <Button variant="secondary" size="sm" fullWidth>
                  View Analytics
                </Button>
                <Button variant="secondary" size="sm" fullWidth>
                  Download Report
                </Button>
              </VStack>
            </VStack>
          </Card>
        </Grid>

        {/* Data Table */}
        <DataTable />

        {/* Loading State Example */}
        <div className="mt-8">
          <Text weight="bold" className="mb-4">Loading State Example</Text>
          <Grid columns={isMobile ? 1 : 2} gap="lg">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </Grid>
        </div>
      </main>
    </div>
  );
}
