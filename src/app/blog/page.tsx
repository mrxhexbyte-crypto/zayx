'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
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

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in E-Commerce: What\'s Coming in 2025',
    excerpt: 'Discover how artificial intelligence is revolutionizing online shopping with personalization, voice commerce, and predictive analytics.',
    date: 'Jan 15, 2025',
    author: 'Alex Chen',
    category: 'AI & Technology',
    readTime: '8 min read',
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'How to Optimize Your Product Pages for Conversions',
    excerpt: 'Learn the strategies we use to increase conversion rates by 40% through better product presentation and user experience.',
    date: 'Jan 12, 2025',
    author: 'Sarah Johnson',
    category: 'Business',
    readTime: '6 min read',
    image: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Voice Commerce: The Next Frontier in Retail',
    excerpt: 'Voice shopping is here. We explore how voice commerce is changing customer behavior and driving new sales channels.',
    date: 'Jan 8, 2025',
    author: 'Michael Park',
    category: 'Trends',
    readTime: '7 min read',
    image: 'bg-gradient-to-br from-green-500 to-teal-500'
  },
  {
    id: 4,
    title: 'Real-Time Analytics: Understanding Your Customers Better',
    excerpt: 'Real-time data is the new competitive advantage. Here\'s how to use analytics to make smarter business decisions.',
    date: 'Jan 5, 2025',
    author: 'Emma Davis',
    category: 'Analytics',
    readTime: '9 min read',
    image: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Building Customer Loyalty in the Age of Personalization',
    excerpt: 'Learn how personalization creates lasting customer relationships and increases lifetime value by 3-5x.',
    date: 'Jan 2, 2025',
    author: 'Alex Chen',
    category: 'Marketing',
    readTime: '7 min read',
    image: 'bg-gradient-to-br from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    title: '5 Security Practices Every E-Commerce Store Needs',
    excerpt: 'Security isn\'t optional. Discover the essential practices to protect your store and customers from threats.',
    date: 'Dec 29, 2024',
    author: 'Sarah Johnson',
    category: 'Security',
    readTime: '6 min read',
    image: 'bg-gradient-to-br from-red-500 to-orange-500'
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', 'AI & Technology', 'Business', 'Trends', 'Analytics', 'Marketing', 'Security'];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Latest Insights & Stories
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              Discover trends, best practices, and stories from the world of intelligent commerce
            </motion.p>

            {/* SEARCH BAR */}
            <motion.div 
              className="relative max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* CATEGORIES FILTER */}
        <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex flex-wrap gap-3 items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Filter by:</span>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    (category === 'All' && !selectedCategory) || selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  variants={itemVariants}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* BLOG POSTS GRID */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-slate-600 dark:text-slate-400 text-lg">No articles found matching your search.</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all hover:shadow-lg dark:hover:shadow-cyan-500/10"
                    variants={itemVariants}
                  >
                    {/* IMAGE PLACEHOLDER */}
                    <div className={`h-48 ${post.image} opacity-80`}></div>
                    
                    {/* CONTENT */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400">{post.category}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <User className="w-4 h-4" />
                          <span>By {post.author}</span>
                        </div>
                        
                        <Link href={`/blog/${post.id}`}>
                          <Button 
                            variant="ghost"
                            className="w-full justify-between text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                          >
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-slate-900 dark:to-slate-800 text-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
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
                Get Articles Delivered to Your Inbox
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                variants={itemVariants}
              >
                Subscribe to receive the latest insights and best practices
              </motion.p>
              
              <motion.div 
                className="flex gap-2"
                variants={itemVariants}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 font-semibold">
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
