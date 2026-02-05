'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, TrendingUp, Users, Zap, Quote,
  ShoppingBag, Smartphone, BarChart3
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

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: 'Fashion Boutique Achieves 320% Revenue Growth',
      company: 'StyleHub Fashion',
      image: 'bg-gradient-to-br from-pink-500 to-rose-500',
      metrics: [
        { label: 'Revenue Growth', value: '320%' },
        { label: 'Customer Retention', value: '85%' },
        { label: 'Avg Order Value', value: '+65%' },
      ],
      story: 'A mid-size fashion retailer implemented our AI recommendations engine and voice shopping feature, resulting in unprecedented growth in just 6 months. Their customers loved the personalized experience.',
      results: [
        'AI recommendations increased AOV by 65%',
        'Voice shopping drove 25% of mobile sales',
        'Customer lifetime value tripled',
        'Automation saved 200 hours/month',
      ],
      testimonial: {
        text: 'The platform transformed how we connect with customers. Our sales team can now focus on strategy while AI handles personalization.',
        author: 'Sarah Chen',
        role: 'CEO, StyleHub Fashion'
      }
    },
    {
      title: 'Electronics Retailer Reduces Support Costs by 60%',
      company: 'TechVault Electronics',
      image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      metrics: [
        { label: 'Support Cost Reduction', value: '60%' },
        { label: 'Customer Satisfaction', value: '4.8/5' },
        { label: 'Response Time', value: '<30s' },
      ],
      story: 'By deploying our AI chatbot with voice support, this electronics retailer automated 80% of customer inquiries, significantly reducing support costs while improving satisfaction.',
      results: [
        'Automated 80% of customer support queries',
        '24/7 AI support in 5 languages',
        'Response time under 30 seconds',
        'Customer satisfaction increased to 4.8/5',
      ],
      testimonial: {
        text: 'Our AI assistant handles more support tickets than our entire team used to. It\'s like hiring 10 people instantly.',
        author: 'Michael Rodriguez',
        role: 'Operations Director, TechVault'
      }
    },
    {
      title: 'Home & Garden Store Expands to 5 New Markets',
      company: 'GreenSpace Home',
      image: 'bg-gradient-to-br from-green-500 to-emerald-500',
      metrics: [
        { label: 'Market Expansion', value: '5 Countries' },
        { label: 'Sales Increase', value: '215%' },
        { label: 'Product Catalog', value: '50K+' },
      ],
      story: 'With our headless CMS and multi-currency support, this retailer successfully expanded globally, managing 50K+ products across 5 countries with unified analytics.',
      results: [
        'Expanded to 5 international markets',
        'Unified 50K+ product catalog',
        'Real-time multi-currency pricing',
        'Global inventory management',
      ],
      testimonial: {
        text: 'The platform made it simple to scale internationally. What used to take months now takes days.',
        author: 'Emma Thompson',
        role: 'Global Growth Manager, GreenSpace'
      }
    },
    {
      title: 'Beauty Brand Achieves Viral Growth Through Personalization',
      company: 'Glow & Radiance Beauty',
      image: 'bg-gradient-to-br from-purple-500 to-pink-500',
      metrics: [
        { label: 'Social Engagement', value: '+450%' },
        { label: 'Repeat Purchase Rate', value: '72%' },
        { label: 'Brand Awareness', value: '+280%' },
      ],
      story: 'Using our AI personalization engine and social integration, this beauty brand created highly targeted campaigns that drove viral growth and unprecedented customer loyalty.',
      results: [
        'AI-powered personalized recommendations',
        'Social media integration for viral campaigns',
        'Repeat purchase rate of 72%',
        'Customer acquisition cost reduced by 40%',
      ],
      testimonial: {
        text: 'The AI understands our customers better than we do. Every recommendation feels personal and authentic.',
        author: 'Jessica Liu',
        role: 'Marketing Director, Glow & Radiance'
      }
    },
  ];

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
              Success Stories From<br />Our Customers
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
              variants={itemVariants}
            >
              See how businesses like yours are achieving extraordinary growth
            </motion.p>
          </motion.div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="space-y-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {caseStudies.map((study, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all"
                  variants={itemVariants}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* IMAGE */}
                    <div className={`h-64 lg:h-80 ${study.image}`}></div>

                    {/* CONTENT */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400">Case Study</span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {study.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 font-medium">
                        {study.company}
                      </p>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {study.story}
                      </p>

                      {/* KEY METRICS */}
                      <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-slate-200 dark:border-slate-700">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
                              {metric.value}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* TESTIMONIAL */}
                      <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border-l-4 border-blue-600 dark:border-cyan-400">
                        <div className="flex gap-2 mb-2">
                          <Quote className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                          <p className="text-sm italic text-slate-700 dark:text-slate-300">
                            "{study.testimonial.text}"
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white ml-6">
                          {study.testimonial.author}, {study.testimonial.role}
                        </p>
                      </div>

                      <Link href="/contact">
                        <Button className="gap-2 text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 border border-blue-200 dark:border-cyan-400/30">
                          Get Started <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Impact By The Numbers
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Users, number: '5000+', label: 'Active Stores' },
                { icon: TrendingUp, number: '$500M+', label: 'Total GMV' },
                { icon: BarChart3, number: '3.5x', label: 'Avg Growth' },
                { icon: Zap, number: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-8 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 text-center"
                  variants={itemVariants}
                >
                  <stat.icon className="w-12 h-12 text-blue-600 dark:text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
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
                Ready to Write Your Success Story?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                variants={itemVariants}
              >
                Join thousands of stores achieving extraordinary growth
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
