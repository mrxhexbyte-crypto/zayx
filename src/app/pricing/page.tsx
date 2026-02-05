'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, X, ArrowRight, Zap, Target, Rocket } from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: billingCycle === 'monthly' ? '$0' : '$0',
      period: 'Forever Free',
      desc: 'Perfect for getting started',
      cta: 'Get Started',
      popular: false,
      features: [
        { name: 'Up to 100 Products', included: true },
        { name: 'Basic AI Chat', included: true },
        { name: 'Essential Analytics', included: true },
        { name: 'Standard Support', included: true },
        { name: 'Mobile App', included: false },
        { name: 'Advanced Customization', included: false },
        { name: 'API Access', included: false },
        { name: 'Priority Support', included: false },
      ]
    },
    {
      name: 'Professional',
      icon: Target,
      price: billingCycle === 'monthly' ? '$99' : '$990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      desc: 'For growing businesses',
      cta: 'Start Free Trial',
      popular: true,
      features: [
        { name: 'Unlimited Products', included: true },
        { name: 'Advanced AI Features', included: true },
        { name: 'Real-Time Analytics', included: true },
        { name: 'Email & Chat Support', included: true },
        { name: 'Mobile App', included: true },
        { name: 'Advanced Customization', included: true },
        { name: 'API Access', included: false },
        { name: 'Priority Support', included: false },
      ]
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 'Custom',
      period: 'Contact us',
      desc: 'For large-scale operations',
      cta: 'Schedule Demo',
      popular: false,
      features: [
        { name: 'Unlimited Everything', included: true },
        { name: 'Advanced AI & IoT', included: true },
        { name: 'Custom Analytics', included: true },
        { name: '24/7 Dedicated Support', included: true },
        { name: 'Mobile App', included: true },
        { name: 'Unlimited Customization', included: true },
        { name: 'Full API Access', included: true },
        { name: 'Priority Support', included: true },
      ]
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black pt-20">
          <motion.div 
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              Choose the plan that's right for your business. No hidden fees.
            </motion.p>

            {/* BILLING TOGGLE */}
            <motion.div 
              className="flex justify-center items-center gap-4 mb-8"
              variants={itemVariants}
            >
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-300 dark:bg-slate-700"
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                Yearly <span className="text-green-600 dark:text-green-400 font-bold">(Save 17%)</span>
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {plans.map((plan, i) => {
                const PlanIcon = plan.icon;
                return (
                  <motion.div
                    key={i}
                    className={`relative rounded-lg border-2 transition-all ${
                      plan.popular
                        ? 'border-blue-600 dark:border-cyan-400 shadow-2xl shadow-blue-500/20 dark:shadow-cyan-500/20'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                    variants={itemVariants}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className={`p-8 ${plan.popular ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800/50 dark:to-slate-800/30' : 'bg-white dark:bg-slate-900/50'}`}>
                      {/* HEADER */}
                      <div className="flex items-center gap-3 mb-4">
                        <PlanIcon className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{plan.desc}</p>

                      {/* PRICING */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                          <span className="text-slate-600 dark:text-slate-400">{plan.period}</span>
                        </div>
                      </div>

                      {/* CTA BUTTON */}
                      <Link href={plan.name === 'Enterprise' ? '/contact' : '/auth/signup'} className="w-full">
                        <Button 
                          className={`w-full py-6 font-semibold mb-8 ${
                            plan.popular
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                              : 'border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {plan.cta}
                        </Button>
                      </Link>

                      {/* FEATURES */}
                      <div className="space-y-4">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {feature.included ? (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500 line-through'}`}>
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Pricing FAQs</h2>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { q: 'Can I upgrade or downgrade anytime?', a: 'Yes, you can change your plan at any time. Changes take effect immediately.' },
                { q: 'Do you offer refunds?', a: 'Yes, we offer 30-day money-back guarantee on all paid plans.' },
                { q: 'Is there a free trial?', a: 'Yes, all paid plans come with a 14-day free trial. No credit card required.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers.' },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-slate-900 dark:to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4"
                variants={itemVariants}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                variants={itemVariants}
              >
                Join thousands of successful stores already using our platform
              </motion.p>
              <Link href="/auth/signup">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-bold gap-2 rounded-lg">
                  Start Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
