'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your store and account settings</p>
      </div>

      <Card className="p-8 bg-slate-800/50 border border-white/10 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-slate-300">Store Name</span>
              <Button variant="outline" className="border-white/20">Edit</Button>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-slate-300">Email</span>
              <Button variant="outline" className="border-white/20">Edit</Button>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-300">Password</span>
              <Button variant="outline" className="border-white/20">Change</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
