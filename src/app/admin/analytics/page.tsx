'use client';

import { Card } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
        <p className="text-slate-400">View business insights and performance metrics</p>
      </div>

      <Card className="p-8 bg-slate-800/50 border border-white/10">
        <div className="text-center py-12">
          <p className="text-slate-400">Analytics dashboard coming soon</p>
        </div>
      </Card>
    </div>
  );
}
