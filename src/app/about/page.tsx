'use client';

import Link from 'next/link';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Award, Users, Zap, Globe, TrendingUp, Heart, Code2, Rocket,
  CheckCircle, ArrowRight, MessageCircle, Lightbulb, Target
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

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black pt-20">
          <div className="absolute inset-0 opacity-20 dark:opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <motion.div 
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                Building the Future of
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Intelligent Commerce
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              We're on a mission to revolutionize online shopping with AI, real-time intelligence, and unparalleled customer experience.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href="#story">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-semibold gap-2 rounded-xl">
                  Read Our Story <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* OUR STORY */}
        <section id="story" className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">From vision to reality in the age of AI</p>
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: 'The Beginning',
                  desc: 'Founded in 2024 with a bold vision: what if shopping could be as intelligent as talking to a friend? We started with a simple question and a powerful idea.'
                },
                {
                  title: 'Innovation & Growth',
                  desc: 'Leveraging cutting-edge AI, real-time databases, and voice technology, we built a platform that understands customer needs before they do.'
                },
                {
                  title: 'Enterprise Scale',
                  desc: 'Today, we serve thousands of users with lightning-fast performance, 24/7 AI support, and features that redefine e-commerce.'
                },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="p-8 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MISSION & VALUES */}
        <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Lightbulb, title: 'Innovation', desc: 'Constantly pushing the boundaries of what\'s possible in e-commerce' },
                { icon: Heart, title: 'Customer First', desc: 'Every decision is made with the customer experience in mind' },
                { icon: Globe, title: 'Global Impact', desc: 'Making intelligent commerce accessible worldwide' },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  className="p-8 bg-slate-800/50 rounded-lg border border-cyan-400/30 hover:border-cyan-400/60 transition-all text-center"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <value.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-300">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Meet Our Team</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Passionate experts driving innovation</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Alex Chen', role: 'Founder & CEO', specialty: 'AI & Vision' },
                { name: 'Sarah Johnson', role: 'CTO', specialty: 'Engineering' },
                { name: 'Michael Park', role: 'Head of Product', specialty: 'Design' },
                { name: 'Emma Davis', role: 'Lead AI Engineer', specialty: 'Machine Learning' },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all text-center"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{member.role}</p>
                  <p className="text-xs text-blue-600 dark:text-cyan-400 mt-2">{member.specialty}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">By The Numbers</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Users, number: '50K+', label: 'Active Users' },
                { icon: TrendingUp, number: '$5M+', label: 'GMV Processed' },
                { icon: Award, number: '99.9%', label: 'Uptime' },
                { icon: Zap, number: '<100ms', label: 'Avg Response' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-8 text-center"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <stat.icon className="w-12 h-12 text-blue-600 dark:text-cyan-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-slate-900 dark:to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Journey</h2>
              <p className="text-xl mb-8 opacity-90">
                Be part of the revolution in intelligent commerce
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-bold gap-2 rounded-lg">
                    Get In Touch <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/shop/products">
                  <Button className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold gap-2 rounded-lg">
                    Explore Products
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
