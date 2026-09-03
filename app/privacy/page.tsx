"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-green-100">Last updated: September 3, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                Forge ("Company," "we," "us," or "our") operates the Platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">We may collect information about you in a variety of ways. The information we may collect on the Platform includes:</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Name and email address</li>
                <li>Phone number</li>
                <li>Billing information (payment card, address)</li>
                <li>User profile information</li>
                <li>Learning history and progress</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatic Data Collection</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Cookie data and tracking information</li>
                <li>Device information (type, OS)</li>
                <li>Location data (with permission)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Your Information</h2>
              <p className="text-gray-600 mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Platform to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Create and manage your account</li>
                <li>Process your transactions and deliver purchased courses</li>
                <li>Generate invoices and send billing information</li>
                <li>Send administrative information and course updates</li>
                <li>Fulfill and manage your orders and surveys</li>
                <li>Perform analytics and improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclosure of Your Information</h2>
              <p className="text-gray-600 mb-4">We may share information we have collected about you in certain situations:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li><strong>By Law or to Protect Rights:</strong> If required by law or if we believe disclosure is necessary to protect our rights</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your data with vendors who assist us (payment processors, analytics providers)</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security of Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use administrative, technical, and physical security measures to protect your personal information. However, perfect security does not exist on the Internet. We cannot guarantee absolute security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us and CCPA</h2>
              <p className="text-gray-600 mb-4">
                If you are a California resident, you have the right to know what personal information is collected, used, shared, or sold. You have the right to delete personal information collected from you and the right to opt-out of the sale or sharing of your personal information.
              </p>
              <p className="text-gray-600 mb-4">
                To exercise any of these rights, please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-600 mb-4">
                Our Platform uses cookies to enhance your experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browsers are a bit different, look at your browser's Help Menu to learn the correct way to modify your cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-600 mb-4">
                The Platform may contain links to third-party websites. We are not responsible for the privacy practices or the content of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. Your continued use of the Platform following the posting of revised Privacy Policy means that you accept and agree to the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Forge Learning Platform</p>
                <p className="text-gray-700">Email: privacy@forgelearning.com</p>
                <p className="text-gray-700">Phone: 1-800-FORGE-1</p>
                <p className="text-gray-700">Address: San Francisco, CA</p>
              </div>
            </section>
          </div>

          <div className="mt-12 p-6 bg-green-50 rounded-lg">
            <p className="text-gray-700">
              This Privacy Policy is effective as of September 3, 2026, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately upon posting.
            </p>
          </div>

          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
              Contact Us
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/help" className="text-green-600 hover:text-green-700 font-medium">
              Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
