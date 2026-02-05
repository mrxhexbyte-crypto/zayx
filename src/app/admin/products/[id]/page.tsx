'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { apiClient } from '@/lib/api-client';

export default function EditProductPage() {
  const params = useParams() as { id?: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params?.id) return;
      try {
        const response = await apiClient.get(`/products/${params.id}`);
        const data = response.data as { success?: boolean; data?: Product };
        if (data.success && data.data) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
          <p className="text-slate-400">Update product information</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline" className="border-white/20">Back to Products</Button>
        </Link>
      </div>

      {isLoading ? (
        <Card className="p-8 bg-slate-800/50 border border-white/10 text-center text-slate-400">
          Loading product...
        </Card>
      ) : product ? (
        <Card className="p-8 bg-slate-800/50 border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Product Name</label>
                <input type="text" defaultValue={product.name} className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Price</label>
                <input type="number" defaultValue={product.price} className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
              <textarea defaultValue={product.description} className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500 h-24 resize-none"></textarea>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                Save Changes
              </Button>
              <Link href="/admin/products">
                <Button variant="outline" className="border-white/20">Cancel</Button>
              </Link>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="p-8 bg-slate-800/50 border border-white/10 text-center text-slate-400">
          Product not found
        </Card>
      )}
    </div>
  );
}
