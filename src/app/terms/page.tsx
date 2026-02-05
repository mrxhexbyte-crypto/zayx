'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsPage() {
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
              Terms of Service
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
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">1. Agreement to Terms</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    These Terms of Service ("Terms") constitute a legal agreement between you and Zayx regarding your use of our website, mobile application, and services. By accessing or using Zayx, you agree to be bound by these Terms. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">2. Use License</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials (information or software) on Zayx's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transmit the materials to anyone else or "mirror" the materials on any other server</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">3. User Accounts</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of these Terms, which may result in immediate termination of your account on our Service.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">4. Disclaimer of Warranties</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    The materials on Zayx's website are provided on an 'as is' basis. Zayx makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">5. Limitations of Liability</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    In no event shall Zayx or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zayx's website, even if Zayx or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">6. Accuracy of Materials</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    The materials appearing on Zayx's website could include technical, typographical, or photographic errors. Zayx does not warrant that any of the materials on its website are accurate, complete, or current. Zayx may make changes to the materials contained on its website at any time without notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">7. Links</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Zayx has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Zayx of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">8. Modifications</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Zayx may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">9. Governing Law</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    These Terms and Conditions are governed by and construed in accordance with the laws of the State of California, United States, and you irrevocably submit to the exclusive jurisdiction of the courts located in San Francisco, California.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">10. Contact Information</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    Email: legal@zayx.io<br />
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
