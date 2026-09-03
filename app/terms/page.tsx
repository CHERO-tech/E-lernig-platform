"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Forge ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Forge for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the Platform</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                The materials on Forge are provided on an 'as is' basis. Forge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
              <p className="text-gray-600 mb-4">
                In no event shall Forge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Forge, even if Forge or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p className="text-gray-600 mb-4">
                The materials appearing on Forge could include technical, typographical, or photographic errors. Forge does not warrant that any of the materials on its Internet web site are accurate, complete, or current. Forge may make changes to the materials contained on its web site at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Links</h2>
              <p className="text-gray-600 mb-4">
                Forge has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Forge of the site. Use of any such linked web site is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
              <p className="text-gray-600 mb-4">
                Forge may revise these terms of service for its web site at any time without notice. By using this web site, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of California, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                If you create an account on Forge, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property Rights</h2>
              <p className="text-gray-600 mb-4">
                All content included on the Platform, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Forge or its content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Refund Policy</h2>
              <p className="text-gray-600 mb-4">
                Forge offers a 30-day money-back guarantee on all course purchases. If you are not satisfied with a course within 30 days of purchase, you can request a full refund with no questions asked. After 30 days, no refunds will be issued.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Forge Learning Platform</p>
                <p className="text-gray-700">Email: legal@forgelearning.com</p>
                <p className="text-gray-700">Phone: 1-800-FORGE-1</p>
              </div>
            </section>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <p className="text-gray-700">
              By using Forge, you acknowledge that you have read these Terms of Service and agree to be bound by them. If you do not agree with any part of these terms, please do not use our Platform.
            </p>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
