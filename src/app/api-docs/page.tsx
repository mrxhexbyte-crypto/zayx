'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code2, ArrowRight, Copy, ExternalLink, Zap, Lock, GitBranch } from 'lucide-react';
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

export default function APIDocsPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black pt-20">
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
              API Documentation
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              Build integrations and automate your store with our comprehensive REST & GraphQL APIs
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 gap-2">
                <Code2 className="w-5 h-5" />
                Get Started
              </Button>
              <Button variant="outline" className="border-blue-200 dark:border-cyan-400">
                <GitBranch className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* QUICK START */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Quick Start</h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* AUTHENTICATION */}
              <motion.div variants={itemVariants}>
                <Card className="p-8 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Authentication</h3>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
                    <pre className="text-cyan-400 text-sm font-mono">
                      <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.zayx.io/v1/products`}</code>
                    </pre>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Get your API key from the dashboard. Include it in the Authorization header for all requests.
                  </p>

                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="w-full gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </Card>
              </motion.div>

              {/* BASE URL */}
              <motion.div variants={itemVariants}>
                <Card className="p-8 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Base URL</h3>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <p className="text-cyan-400 text-sm font-mono">
                      https://api.zayx.io/v1
                    </p>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    All API endpoints use this base URL. We currently support v1 of the API.
                  </p>

                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    View API Reference
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* API ENDPOINTS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Core Endpoints</h2>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  category: 'Products',
                  endpoints: [
                    { method: 'GET', path: '/products', desc: 'List all products' },
                    { method: 'POST', path: '/products', desc: 'Create a new product' },
                    { method: 'GET', path: '/products/:id', desc: 'Get product details' },
                    { method: 'PUT', path: '/products/:id', desc: 'Update a product' },
                  ]
                },
                {
                  category: 'Orders',
                  endpoints: [
                    { method: 'GET', path: '/orders', desc: 'List all orders' },
                    { method: 'POST', path: '/orders', desc: 'Create a new order' },
                    { method: 'GET', path: '/orders/:id', desc: 'Get order details' },
                    { method: 'PUT', path: '/orders/:id', desc: 'Update order status' },
                  ]
                },
                {
                  category: 'AI & Recommendations',
                  endpoints: [
                    { method: 'POST', path: '/ai/recommend', desc: 'Get AI recommendations' },
                    { method: 'POST', path: '/ai/chat', desc: 'AI chat endpoint' },
                    { method: 'POST', path: '/ai/voice', desc: 'Voice recognition' },
                  ]
                },
                {
                  category: 'Analytics',
                  endpoints: [
                    { method: 'GET', path: '/analytics/dashboard', desc: 'Dashboard data' },
                    { method: 'GET', path: '/analytics/sales', desc: 'Sales metrics' },
                    { method: 'GET', path: '/analytics/customers', desc: 'Customer data' },
                  ]
                },
              ].map((section, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="bg-white dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{section.category}</h3>
                  </div>
                  
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {section.endpoints.map((endpoint, idx) => (
                      <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <span className={`px-3 py-1 rounded text-xs font-bold text-white ${
                            endpoint.method === 'GET' ? 'bg-blue-600' :
                            endpoint.method === 'POST' ? 'bg-green-600' :
                            endpoint.method === 'PUT' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}>
                            {endpoint.method}
                          </span>
                          <div>
                            <p className="font-mono text-slate-900 dark:text-white">{endpoint.path}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{endpoint.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WEBHOOKS */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Webhooks</h2>
              <p className="text-slate-600 dark:text-slate-400">Real-time event notifications</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { event: 'order.created', desc: 'New order placed' },
                { event: 'order.paid', desc: 'Payment received' },
                { event: 'order.shipped', desc: 'Order shipped' },
                { event: 'product.updated', desc: 'Product information changed' },
              ].map((webhook, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{webhook.event}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{webhook.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SDKs & LIBRARIES */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">SDKs & Libraries</h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: 'JavaScript SDK', lang: 'npm install @zayx/sdk' },
                { name: 'Python SDK', lang: 'pip install zayx-sdk' },
                { name: 'Go SDK', lang: 'go get github.com/zayx/go-sdk' },
              ].map((sdk, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all"
                  variants={itemVariants}
                >
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">{sdk.name}</h3>
                  <div className="bg-slate-900 rounded p-2 mb-4">
                    <code className="text-cyan-400 text-sm font-mono">{sdk.lang}</code>
                  </div>
                  <Button variant="ghost" className="w-full text-blue-600 dark:text-cyan-400 gap-2" size="sm">
                    View Docs <ExternalLink className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
