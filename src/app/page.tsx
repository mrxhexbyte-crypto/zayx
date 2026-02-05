'use client';

import Link from 'next/link';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/Shop/ProductCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, Zap, MessageCircle, ShoppingBag, Smartphone, Rocket, BarChart3, Shield, Globe, Check, Brain, Mic, Video, Code2, Workflow, Cpu, TrendingUp, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '@/data/sample-products';
import { motion } from 'framer-motion';
import { useHintSequence } from '@/hooks/use-hints';

// Define constant arrays with unique IDs to avoid React key warnings
const FEATURES = [
  { id: 'ai-powered', icon: Brain, title: 'AI-Powered', desc: 'Smart recommendations that adapt to you', color: 'from-blue-500 to-cyan-500' },
  { id: 'lightning-fast', icon: Rocket, title: 'Lightning Fast', desc: 'Optimized for speed and performance', color: 'from-purple-500 to-pink-500' },
  { id: 'secure', icon: Shield, title: 'Secure', desc: 'Enterprise-grade security & encryption', color: 'from-green-500 to-teal-500' },
  { id: 'global', icon: Globe, title: 'Global', desc: 'Access from anywhere, anytime', color: 'from-orange-500 to-red-500' },
];

const CAPABILITIES = [
  { id: 'ai-personalization', icon: Brain, title: 'AI Personalization', desc: 'Machine learning adapts to your preferences over time' },
  { id: 'real-time-analytics', icon: TrendingUp, title: 'Real-Time Analytics', desc: 'Track sales, inventory, and customer behavior in real-time' },
  { id: 'lightning-performance', icon: Zap, title: 'Lightning Performance', desc: 'Optimized for speed with edge computing and caching' },
  { id: 'multi-user', icon: Users, title: 'Multi-User Collaboration', desc: 'Manage team access and permissions with role-based control' },
  { id: 'api-first', icon: Code2, title: 'API-First Architecture', desc: 'Headless CMS design for maximum flexibility' },
  { id: 'iot-ready', icon: Cpu, title: 'IoT Ready', desc: 'Connect and control smart devices from your dashboard' },
];

const BENEFITS = [
  { id: 'free-forever', title: 'Free Forever', desc: 'Start selling without any subscription costs', icon: ShoppingBag },
  { id: 'low-fees', title: 'Low Transaction Fees', desc: 'Only pay when you make a sale', icon: Zap },
  { id: 'full-control', title: 'Full Control', desc: 'Export your data anytime. No vendor lock-in', icon: Code2 },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState(SAMPLE_PRODUCTS.slice(0, 6));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Show hints sequence when page loads
  useHintSequence(['home.hero', 'home.features', 'home.explore']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="w-full overflow-hidden">
        {/* HERO SECTION - Modern & Futuristic */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black overflow-hidden pt-20">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 opacity-20 dark:opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>

          <motion.div 
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div className="text-center space-y-8" variants={itemVariants}>
              {/* Badge */}
              <div className="flex justify-center">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 border border-blue-200 dark:border-white/20 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                    AI-Powered Commerce Platform
                  </span>
                </motion.div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  The Future of
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Intelligent Commerce
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                Shopping should feel personal and intuitive. Our AI learns what you like, offers genuine suggestions, and makes finding what you need actually enjoyable.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/#products">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-semibold gap-2 rounded-xl transition-all hover:shadow-2xl hover:shadow-blue-500/30 dark:shadow-blue-900/50">
                      Explore Store <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="#features">
                    <Button
                      variant="outline"
                      className="border-2 border-blue-200 dark:border-white/20 text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat with AI
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div 
                className="grid grid-cols-3 gap-8 pt-16 border-t border-slate-200 dark:border-white/10 max-w-lg mx-auto"
                variants={itemVariants}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-cyan-400">{SAMPLE_PRODUCTS.length}+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Premium Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-cyan-400">24/7</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">AI Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-cyan-400">100%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Secure</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Built for Real People</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Fast, smart, and genuinely helpful. We focus on what matters: your experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all hover:border-blue-300 dark:hover:border-cyan-400 dark:bg-slate-800/50 h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
        <section id="products" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What are People Loving Right Now</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                These are the products we see customers coming back for. High quality, great prices, and genuinely useful.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href="/shop/products">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold gap-2 rounded-xl transition-all hover:shadow-2xl hover:shadow-cyan-500/30">
                  View All Products <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* AI FEATURES SECTION */}
        <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                AI-Powered <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Intelligence</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Talk, voice command, or interact with our intelligent AI assistant
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI Chat */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-400/30 hover:border-cyan-400/60 transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Smart Chat</h3>
                    <MessageCircle className="w-6 h-6 text-cyan-400" />
                  </div>
                  <p className="text-slate-300 mb-6">AI chatbot that understands your needs and helps you find the perfect products instantly.</p>
                  <ul className="text-sm text-slate-400 space-y-3">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Real-time responses</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Product recommendations</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 24/7 availability</li>
                  </ul>
                </Card>
              </motion.div>

              {/* Voice Control */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-8 bg-gradient-to-br from-purple-800/50 to-slate-900/50 border border-purple-400/30 hover:border-purple-400/60 transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Voice Control</h3>
                    <Mic className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-slate-300 mb-6">Speak naturally and let AI understand your commands. Shop hands-free with voice recognition.</p>
                  <ul className="text-sm text-slate-400 space-y-3">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Voice search</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Natural language</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Multi-language support</li>
                  </ul>
                </Card>
              </motion.div>

              {/* Real-time IoT */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-8 bg-gradient-to-br from-teal-800/50 to-slate-900/50 border border-teal-400/30 hover:border-teal-400/60 transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Real-time Updates</h3>
                    <Zap className="w-6 h-6 text-teal-400" />
                  </div>
                  <p className="text-slate-300 mb-6">Live notifications, inventory tracking, and IoT device integration for seamless shopping.</p>
                  <ul className="text-sm text-slate-400 space-y-3">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> Live inventory</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> Push notifications</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> IoT integration</li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ADVANCED CAPABILITIES */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Advanced Capabilities
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CAPABILITIES.map((capability, index) => (
                <motion.div
                  key={capability.id}
                  className="flex gap-6 p-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex-shrink-0">
                    <capability.icon className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{capability.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{capability.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING / BENEFITS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Free & Open</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">No subscriptions. No hidden fees. Start for free.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  className="p-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-colors text-center"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <benefit.icon className="w-12 h-12 text-blue-600 dark:text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">What Customers Say</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Real stories from real people who love our platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Small Business Owner',
                  quote: 'The AI assistant helped me understand customer needs better. Sales increased by 45% in just 3 months.',
                  avatar: '👩‍💼',
                },
                {
                  name: 'Marco Rodriguez',
                  role: 'E-Commerce Manager',
                  quote: 'The voice interface is game-changing. Customers love being able to speak their orders naturally.',
                  avatar: '👨‍💻',
                },
                {
                  name: 'Yuki Tanaka',
                  role: 'Retail Entrepreneur',
                  quote: 'Zero subscription costs and powerful features. This is exactly what I needed to scale my business.',
                  avatar: '👩‍🔬',
                },
              ].map((testimonial: any, index: number) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400 transition-all"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{testimonial.avatar}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
<<<<<<< HEAD
                  <p className="text-slate-700 dark:text-slate-300 italic">"{testimonial.quote}"</p>
=======
                  <p className="text-slate-700 dark:text-slate-300 italic">&quot;{testimonial.quote}&quot;</p>
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Common Questions</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Everything you need to know</p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  q: 'Do I need to pay any subscription fees?',
                  a: 'No! Our platform is completely free. You only pay when you make a sale, and our transaction fees are among the lowest in the industry.',
                },
                {
                  q: 'Can I export my data?',
                  a: 'Yes, absolutely. You own your data. Export everything at any time in multiple formats (CSV, JSON, etc.). No vendor lock-in.',
                },
                {
                  q: 'How does the AI assistant work?',
                  a: 'Our AI uses advanced machine learning to understand customer needs, provide recommendations, and assist with customer service - all in real-time.',
                },
                {
                  q: 'Is it secure?',
                  a: 'We use enterprise-grade security with end-to-end encryption, regular security audits, and compliance with all major standards.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400 transition-all"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:bg-gradient-to-r dark:from-cyan-900/30 dark:to-blue-900/30 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch?</h2>
              <p className="text-xl mb-8 opacity-90">
                No subscription. No credit card. Start selling anything, anywhere, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/shop/products">
                    <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-bold gap-2 rounded-lg shadow-2xl shadow-white/20">
                      Start Shopping <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth/signup">
                    <Button className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold gap-2 rounded-lg transition-all">
                      Become a Seller <Rocket className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
