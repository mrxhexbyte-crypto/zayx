'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Search, Zap, ShoppingBag, Lock, Cpu, Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';

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

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      faqs: [
        {
          q: 'How do I create an account?',
          a: 'Click the Sign Up button in the top right, enter your email and password, and verify your email. You\'ll have instant access to the platform.'
        },
        {
          q: 'Is there a free trial?',
          a: 'Yes! You can use all features free forever. We only charge transaction fees when you make a sale.'
        },
        {
          q: 'Do I need a credit card to get started?',
          a: 'No, you can sign up and explore completely free without any payment method.'
        },
        {
          q: 'How long does it take to set up my store?',
          a: 'You can have your first product live in under 5 minutes. It\'s that simple!'
        },
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping & Products',
      icon: ShoppingBag,
      faqs: [
        {
          q: 'How do I search for products?',
          a: 'Use the search bar at the top or browse by category. You can also use voice search by clicking the microphone icon.'
        },
        {
          q: 'Can AI recommend products for me?',
          a: 'Absolutely! Our AI learns your preferences and suggests products tailored just for you. The more you shop, the smarter it gets.'
        },
        {
          q: 'What if I can\'t find what I\'m looking for?',
          a: 'Ask our AI assistant! Just click the chat button and describe what you need. We\'ll help you find it.'
        },
        {
          q: 'How accurate are product recommendations?',
          a: 'Our AI achieves 92% accuracy in personalization. It uses machine learning to understand your exact preferences.'
        },
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: ShoppingBag,
      faqs: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers.'
        },
        {
          q: 'Is my payment information safe?',
          a: 'Yes, all payments are processed through Stripe with PCI-DSS Level 1 compliance and end-to-end encryption.'
        },
        {
          q: 'Will I be charged for browsing?',
          a: 'Never. You\'re only charged when you complete a purchase.'
        },
        {
          q: 'Can I get a refund?',
          a: 'Yes, we offer full refunds within 30 days of purchase. No questions asked.'
        },
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Lock,
      faqs: [
        {
          q: 'How do you protect my data?',
          a: 'We use enterprise-grade encryption (AES-256), secure authentication, and regular security audits. Your data is encrypted at rest and in transit.'
        },
        {
          q: 'Do you sell my data?',
          a: 'Absolutely not. We never sell or share your personal data with third parties. We comply with GDPR, CCPA, and all privacy regulations.'
        },
        {
          q: 'What happens if there\'s a security breach?',
          a: 'We monitor 24/7 with AI threat detection. If any issue occurs, we notify users within 24 hours and provide a detailed report.'
        },
        {
          q: 'How do I enable two-factor authentication?',
          a: 'Go to Settings → Security → Two-Factor Authentication and follow the prompts. We support authenticator apps and SMS.'
        },
      ]
    },
    {
      id: 'technical',
      title: 'Technical & Features',
      icon: Cpu,
      faqs: [
        {
          q: 'What browsers do you support?',
          a: 'We support all modern browsers (Chrome, Firefox, Safari, Edge). We also have PWA support for offline access.'
        },
        {
          q: 'Can I use the platform on mobile?',
          a: 'Yes! We have a fully responsive mobile experience and a PWA that works offline.'
        },
        {
          q: 'Can I integrate third-party tools?',
          a: 'Yes, we have a comprehensive API and webhooks for integrations with tools like Zapier, Make, and custom applications.'
        },
        {
          q: 'What\'s the uptime guarantee?',
          a: 'We guarantee 99.9% uptime backed by SLA. We use multi-region redundancy and 24/7 monitoring.'
        },
      ]
    },
    {
      id: 'support',
      title: 'Support & Help',
      icon: Mail,
      faqs: [
        {
          q: 'What support channels are available?',
          a: 'We offer 24/7 AI chat support, email support (2-hour response), live chat, and community forums.'
        },
        {
          q: 'How do I contact customer support?',
          a: 'Click the chat button on any page, email hello@zayx.io, or visit our Contact page.'
        },
        {
          q: 'Do you offer phone support?',
          a: 'For enterprise customers, yes. Reach out to our sales team to learn about premium support options.'
        },
        {
          q: 'Where can I find documentation?',
          a: 'Visit our Resources page for guides, tutorials, API docs, and video walkthroughs.'
        },
      ]
    },
  ];

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.faqs.length > 0);

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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              Find answers to common questions about our platform
            </motion.p>

            {/* SEARCH BAR */}
            <motion.div 
              className="relative max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ CATEGORIES */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 text-lg">No results found. Try a different search.</p>
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                  >
                    <button
                      onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                      className="w-full flex items-center justify-between p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <category.icon className="w-6 h-6 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 text-slate-600 dark:text-slate-400 transition-transform ${
                          openCategory === category.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openCategory === category.id && (
                      <motion.div 
                        className="mt-4 space-y-4 pl-4 border-l-2 border-blue-400 dark:border-cyan-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.faqs.map((faq, idx) => (
                          <motion.div
                            key={idx}
                            className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CATEGORY QUICK LINKS */}
        {!searchQuery && (
          <section className="py-20 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Browse by Category</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {faqCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setOpenCategory(category.id)}
                    className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all text-left group"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <category.icon className="w-8 h-8 text-blue-600 dark:text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-slate-900 dark:text-white">{category.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{category.faqs.length} questions</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-slate-900 dark:to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
<<<<<<< HEAD
              <h2 className="text-4xl font-bold mb-4">Didn't find your answer?</h2>
=======
              <h2 className="text-4xl font-bold mb-4">Didn&apos;t find your answer?</h2>
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
              <p className="text-xl mb-8 opacity-90">
                Our AI assistant and support team are here to help 24/7
              </p>
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-bold rounded-lg">
                  Contact Support
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
