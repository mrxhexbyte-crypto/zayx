'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-black pt-20">
          <motion.div 
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Last updated: January 2025
            </p>
          </motion.div>
        </section>

        {/* CONTENT */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="prose prose-invert max-w-none"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
<<<<<<< HEAD
                    Zayx ("we", "us", "our", or "Company") operates the zayx.io website and the Zayx mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
=======
                    Zayx (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Company&quot;) operates the zayx.io website and the Zayx mobile application (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
>>>>>>> 1770abf (Update package.json and improve text formatting across multiple components)
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">2. Information Collection and Use</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    We collect several different types of information for various purposes to provide and improve our Service to you.
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Types of Data Collected:</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                    <li>Personal Data: Name, email address, phone number, address, payment information</li>
                    <li>Usage Data: IP address, browser type, pages visited, time and date of visit</li>
                    <li>Device Data: Device type, operating system, device identifiers</li>
                    <li>Location Data: City, country, and approximate geographic location</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">3. Use of Data</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Zayx uses the collected data for various purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information so we can improve the Service</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent and address technical and security issues</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">4. Security of Data</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    We implement security measures including AES-256 encryption, regular security audits, and compliance with GDPR and CCPA regulations.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">5. Your Rights</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Data portability</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">6. Third-Party Services</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our Service may contain links to other sites that are not operated by us. This Privacy Policy does not apply to third-party websites and we are not responsible for their privacy practices. We encourage you to review their privacy policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">7. Contact Us</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    Email: privacy@zayx.io<br />
                    Website: www.zayx.io<br />
                    Address: San Francisco, CA
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
