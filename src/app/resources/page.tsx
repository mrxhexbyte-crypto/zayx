'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, Code2, Zap, Video, FileText, Lightbulb, 
  ArrowRight, ExternalLink, Download
} from 'lucide-react';

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

export default function ResourcesPage() {
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
              Resources & Documentation
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Everything you need to build, integrate, and succeed with our platform
            </motion.p>
          </motion.div>
        </section>

        {/* MAIN RESOURCES */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: 'Getting Started Guide',
                  desc: 'Step-by-step guide to set up your store in minutes',
                  items: ['Account Setup', 'First Product', 'Customization', 'Go Live'],
                  link: '#'
                },
                {
                  icon: Code2,
                  title: 'API Documentation',
                  desc: 'Complete API reference for developers',
                  items: ['REST API', 'GraphQL', 'Webhooks', 'Authentication'],
                  link: '#'
                },
                {
                  icon: Video,
                  title: 'Video Tutorials',
                  desc: 'Watch our video guides and walkthroughs',
                  items: ['Setup', 'Features', 'Integrations', 'Best Practices'],
                  link: '#'
                },
                {
                  icon: Lightbulb,
                  title: 'Best Practices',
                  desc: 'Strategies to maximize conversions and sales',
                  items: ['Product Optimization', 'Pricing', 'Marketing', 'Analytics'],
                  link: '#'
                },
                {
                  icon: FileText,
                  title: 'Case Studies',
                  desc: 'Real stories from successful stores',
                  items: ['Fashion', 'Tech', 'Beauty', 'Home & Garden'],
                  link: '#'
                },
                {
                  icon: Zap,
                  title: 'Integration Guides',
                  desc: 'Connect with your favorite tools',
                  items: ['Stripe', 'Zapier', 'Make', 'Custom Apps'],
                  link: '#'
                },
              ].map((resource, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all hover:shadow-lg"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={resource.link} className="p-6 flex flex-col h-full">
                    <resource.icon className="w-12 h-12 text-blue-600 dark:text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">{resource.desc}</p>
                    
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {resource.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-cyan-400 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost"
                      className="justify-between text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 w-full"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK START SECTION */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Quick Start</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Get up and running in 5 minutes</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-5 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { step: '1', title: 'Sign Up', desc: 'Create your free account in seconds' },
                { step: '2', title: 'Add Products', desc: 'Upload your first product listing' },
                { step: '3', title: 'Customize', desc: 'Personalize your store branding' },
                { step: '4', title: 'Configure', desc: 'Set up payments and shipping' },
                { step: '5', title: 'Launch', desc: 'Go live and start selling!' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  variants={itemVariants}
                >
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border-2 border-blue-600 dark:border-cyan-400">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-8 -right-8 w-16 h-0.5 bg-blue-300 dark:bg-cyan-500"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* API OVERVIEW */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">API for Developers</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Build powerful integrations with our REST & GraphQL APIs</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* CODE EXAMPLE */}
              <motion.div
                className="p-6 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="text-slate-400 text-sm font-mono">
                  <div className="text-cyan-400">// Get product recommendations</div>
                  <div className="mt-4">
                    <span className="text-pink-400">const</span> response = <span className="text-orange-400">await</span> fetch(
                    <span className="text-green-400">'/api/ai/recommend'</span>, {`{`}
                  </div>
                  <div className="ml-4">method: <span className="text-green-400">'POST'</span>,</div>
                  <div className="ml-4">headers: {`{`}</div>
                  <div className="ml-8">'Content-Type': <span className="text-green-400">'application/json'</span>,</div>
                  <div className="ml-8">'Authorization': <span className="text-green-400">`Bearer ${'${token}'}`</span>,</div>
                  <div className="ml-4">{`}`},</div>
                  <div className="ml-4">body: JSON.stringify({`{`}</div>
                  <div className="ml-8">userId: <span className="text-blue-400">user.id</span>,</div>
                  <div className="ml-8">limit: <span className="text-purple-400">10</span></div>
                  <div className="ml-4">{`}`})</div>
                  <div>{`}`});</div>
                </div>
              </motion.div>

              {/* API INFO */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { title: 'REST API', desc: 'Standard HTTP endpoints for all operations' },
                  { title: 'GraphQL', desc: 'Query exactly what you need, nothing more' },
                  { title: 'Webhooks', desc: 'Real-time event notifications' },
                  { title: '99.9% Uptime', desc: 'SLA-backed reliability' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                    variants={itemVariants}
                  >
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
                
                <Link href="/api-docs">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Code2 className="w-4 h-4" />
                    View Full API Docs
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Download Resources</h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: 'Setup Checklist', size: '2 MB', format: 'PDF' },
                { name: 'Integration Guide', size: '3.5 MB', format: 'PDF' },
                { name: 'API Reference', size: '1.2 MB', format: 'PDF' },
              ].map((resource, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all flex items-center justify-between"
                  variants={itemVariants}
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{resource.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{resource.format} • {resource.size}</p>
                  </div>
                  <Download className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
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
                Need Help?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                variants={itemVariants}
              >
                Our support team is available 24/7 to help you succeed
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <Link href="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 font-semibold">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 font-semibold">
                    View FAQ
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
