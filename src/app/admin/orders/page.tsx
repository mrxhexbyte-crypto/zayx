'use client';

import { Card } from '@/components/ui/card';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Orders Management</h1>
        <p className="text-slate-400">Track and manage customer orders</p>
      </div>

      <Card className="p-8 bg-slate-800/50 border border-white/10">
        <div className="text-center py-12">
          <p className="text-slate-400">Orders list coming soon</p>
        </div>
      </Card>
    </div>
  );
}
