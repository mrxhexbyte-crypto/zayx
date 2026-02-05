'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      id: 'product-section',
      title: 'Product',
      links: [
        { id: 'shop-link', label: 'Shop', href: '/shop/products' },
        { id: 'pricing-link', label: 'Pricing', href: '/pricing' },
        { id: 'features-link', label: 'Features', href: '/#features' },
        { id: 'case-studies-link', label: 'Case Studies', href: '/case-studies' },
      ],
    },
    {
      id: 'support-section',
      title: 'Support',
      links: [
        { id: 'help-link', label: 'Help Center', href: '/resources' },
        { id: 'faq-link', label: 'FAQ', href: '/faq' },
        { id: 'contact-link', label: 'Contact Us', href: '/contact' },
        { id: 'status-link', label: 'Status', href: '#' },
      ],
    },
    {
      id: 'company-section',
      title: 'Company',
      links: [
        { id: 'about-link', label: 'About Us', href: '/about' },
        { id: 'blog-link', label: 'Blog', href: '/blog' },
        { id: 'careers-link', label: 'Careers', href: '#' },
        { id: 'press-link', label: 'Press', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { id: 'facebook-social', icon: Facebook, label: 'Facebook', href: '#' },
    { id: 'twitter-social', icon: Twitter, label: 'Twitter', href: '#' },
    { id: 'instagram-social', icon: Instagram, label: 'Instagram', href: '#' },
    { id: 'linkedin-social', icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-slate-400">Get notified about new products, AI features, and exclusive offers.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">
                Z
              </div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Zayx</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The future of intelligent commerce powered by AI, offering premium tech and accessories.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>hello@zayx.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all border border-white/10 hover:border-cyan-400/50 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Zayx Store. All rights reserved.
            </p>
            <div className="flex gap-6 flex-wrap justify-center md:justify-end text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-700">•</span>
              <Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-700">•</span>
              <Link href="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
