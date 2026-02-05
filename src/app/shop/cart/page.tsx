'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingBag, Plus, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCartProgress } from '@/hooks/use-progress';
import { ProgressSummary } from '@/components/Progress/ProgressSummary';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, subtotal, tax, shipping, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const { trackCartReview } = useCartProgress();

  // Track cart review progress
  useEffect(() => {
    if (items.length > 0) {
      trackCartReview();
    }
  }, [items, trackCartReview]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShoppingBag className="w-20 h-20 text-slate-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">Your Cart is Empty</h1>
          <p className="text-slate-400 mb-8 text-lg">Add some amazing products to get started!</p>
          <Link href="/shop/products">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 font-semibold">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.toLowerCase() === 'save20') {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const finalTotal = total - discount;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Shopping Cart</h1>
          <p className="text-slate-400 mb-8">Review your items before checkout</p>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProgressSummary compact={false} showDetails={true} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div 
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      {item.product?.image && (
                        <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product?.name || ''}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white mb-2">
                          {item.product?.name || 'Product'}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                          {item.product?.description?.substring(0, 80)}...
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {formatPrice(item.product?.price || 0)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-white/20 rounded-lg bg-slate-700/50">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-2 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-white font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Total for Item */}
                          <div className="text-right ml-auto">
                            <p className="text-xs text-slate-400">Item Total</p>
                            <p className="text-lg font-bold text-cyan-400">
                              {formatPrice((item.product?.price || 0) * item.quantity)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() => removeItem(item.productId)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={clearCart}
                className="w-full border-red-400/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 font-semibold"
                variant="outline"
              >
                Clear Cart
              </Button>
            </motion.div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 sticky top-24 bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-cyan-500/10">
              <h2 className="text-2xl font-bold text-white mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <motion.div
                    className="flex justify-between items-center text-emerald-400"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </motion.div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-white font-semibold">{formatPrice(shipping)}</span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <Link href="/shop/checkout">
                <Button className="w-full mb-4 text-lg py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop/products" className="block">
                <Button variant="outline" className="w-full border-white/20 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 font-semibold">
                  Continue Shopping
                </Button>
              </Link>

              {/* Promo Code */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-4 font-semibold">Have a promo code?</p>
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-semibold">Promo applied!</span>
                  </motion.div>
                )}
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (try: save10)"
                    className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-cyan-400 text-sm"
                  />
                  <Button
                    onClick={handlePromoCode}
                    variant="outline"
                    className="border-white/20 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 font-semibold text-sm"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
