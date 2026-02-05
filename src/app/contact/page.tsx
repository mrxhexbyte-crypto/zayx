'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, Zap, Heart, 
  Send, CheckCircle
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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black pt-20">
          <motion.div 
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Have questions? We'd love to hear from you. Our team is here to help.
            </motion.p>
          </motion.div>
        </section>

        {/* CONTACT METHODS */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Mail, title: 'Email', value: 'hello@zayx.io', href: 'mailto:hello@zayx.io' },
                { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                { icon: MapPin, title: 'Address', value: 'San Francisco, CA', href: '#' },
                { icon: Clock, title: 'Hours', value: '24/7 Support', href: '#' },
              ].map((method, i) => (
                <motion.a
                  key={i}
                  href={method.href}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all text-center"
                  variants={itemVariants}
                >
                  <method.icon className="w-8 h-8 text-blue-600 dark:text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{method.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{method.value}</p>
                </motion.a>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* CONTACT FORM */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="p-8 dark:bg-slate-800/50">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Name
                      </label>
                      <Input 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="dark:bg-slate-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Email
                      </label>
                      <Input 
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="dark:bg-slate-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Subject
                      </label>
                      <Input 
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="dark:bg-slate-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Message
                      </label>
                      <textarea 
                        rows={5}
                        placeholder="Tell us more..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Thank you! We'll get back to you soon.</span>
                      </motion.div>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </Button>
                    )}
                  </form>
                </Card>
              </motion.div>

              {/* SUPPORT CHANNELS */}
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Support Channels</h2>
                </div>

                {[
                  { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our team instantly', time: 'Available now' },
                  { icon: Mail, title: 'Email Support', desc: 'Get detailed responses to your questions', time: 'Reply within 2 hours' },
                  { icon: Zap, title: 'AI Assistant', desc: 'Get instant answers from our AI', time: '24/7 available' },
                  { icon: Heart, title: 'Community', desc: 'Connect with other users', time: 'Always open' },
                ].map((channel, i) => (
                  <motion.div
                    key={i}
                    className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400 transition-all"
                    variants={itemVariants}
                  >
                    <div className="flex items-start gap-4">
                      <channel.icon className="w-6 h-6 text-blue-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">{channel.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{channel.desc}</p>
                        <p className="text-xs text-blue-600 dark:text-cyan-400 mt-2">{channel.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ PREVIEW */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Common Questions</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Get quick answers here</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: 'How do I get started?', a: 'Sign up for free and explore our platform. No credit card required.' },
                { q: 'Is my data secure?', a: 'Yes, we use enterprise-grade encryption and comply with all data protection regulations.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.' },
                { q: 'Can I customize my store?', a: 'Absolutely! Our platform is fully customizable with code access.' },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg border border-slate-200 dark:border-slate-700"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
