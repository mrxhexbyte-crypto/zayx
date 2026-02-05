'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/formatters';
import { useEffect, useState } from 'react';
import { useCheckoutProgress } from '@/hooks/use-progress';
import { ProgressSteps } from '@/components/Progress/ProgressSteps';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [shippingCompleted, setShippingCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { trackCheckoutStart, trackShippingInfo, trackPaymentInfo, trackOrderConfirmed } = useCheckoutProgress();

  // Track checkout start
  useEffect(() => {
    trackCheckoutStart();
  }, [trackCheckoutStart]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">No items in cart</h1>
          <Link href="/shop/products">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Checkout</h1>
          <p className="text-slate-400 mb-8">Complete your purchase securely</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="mb-12 px-4 py-8 bg-slate-900/50 border border-cyan-500/20 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProgressSteps />
        </motion.div>

        <div className="space-y-8">
          {/* Shipping Info */}
          <Card className="p-8 bg-slate-800/50 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">City</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="City" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">State</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="ST" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">ZIP</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="12345" />
                </div>
              </div>
            </form>
          </Card>

          {/* Payment Info */}
          <Card className="p-8 bg-slate-800/50 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Card Number</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Expiry Date</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">CVV</label>
                  <input type="text" className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500" placeholder="123" />
                </div>
              </div>
            </form>
          </Card>

          {/* Order Summary */}
          <Card className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between text-slate-300">
                  <span>{item.product?.name} x {item.quantity}</span>
                  <span>{formatPrice((item.product?.price || 0) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{formatPrice(total)}</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={() => {
                trackPaymentInfo();
                trackOrderConfirmed();
              }}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg py-6 font-bold"
            >
              Place Order
            </Button>
            <Link href="/shop/cart" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 text-slate-300 hover:text-cyan-400 text-lg py-6">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
