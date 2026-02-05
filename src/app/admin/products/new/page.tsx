'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Product</h1>
          <p className="text-slate-400">Add a new product to your catalog</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline" className="border-white/20">Back to Products</Button>
        </Link>
      </div>

      <Card className="p-8 bg-slate-800/50 border border-white/10">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Product Name</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="Enter product name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Price</label>
              <input type="number" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="0.00" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
            <textarea className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500 h-24 resize-none" placeholder="Enter product description"></textarea>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
              Create Product
            </Button>
            <Link href="/admin/products">
              <Button variant="outline" className="border-white/20">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
