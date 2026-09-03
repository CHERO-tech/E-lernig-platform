"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Search, MessageCircle, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function Help() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Getting Started",
      items: [
        {
          q: "How do I create an account?",
          a: "Visit the Register page and select your role (Student, Trainer, School, Guardian, Company). Fill in your email, password, and profile information, then click Submit.",
        },
        {
          q: "What are the different user roles?",
          a: "Forge supports 5 roles: Students (learn from courses), Trainers (create and manage courses), Schools (manage learning programs), Guardians (monitor student progress), and Companies (post job opportunities).",
        },
        {
          q: "How do I reset my password?",
          a: "Click the 'Forgot Password' link on the login page, enter your email, and follow the instructions sent to your email to reset your password.",
        },
      ],
    },
    {
      category: "Courses & Learning",
      items: [
        {
          q: "How do I enroll in a course?",
          a: "Browse available courses, click on any course card, review the details, and click the 'Enroll Now' button. You'll immediately get access to the course content.",
        },
        {
          q: "Can I get a refund for a course?",
          a: "Yes! We offer a 30-day money-back guarantee for all course purchases. If you're not satisfied, contact our support team for a full refund.",
        },
        {
          q: "How long do I have access to a course?",
          a: "Once enrolled, you have lifetime access to the course. You can learn at your own pace and revisit materials anytime.",
        },
        {
          q: "Are certificates included?",
          a: "Yes, certificates are included in Professional and Enterprise plans. Certificates are issued upon course completion and can be shared on professional profiles.",
        },
      ],
    },
    {
      category: "Billing & Plans",
      items: [
        {
          q: "What's the difference between the plans?",
          a: "Basic ($29): 50+ courses with email support. Professional ($79): 300+ courses with priority support and certificates. Enterprise (Custom): Unlimited courses for teams with dedicated support.",
        },
        {
          q: "Can I change my plan anytime?",
          a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately on your next billing cycle.",
        },
        {
          q: "Do you offer discounts for annual billing?",
          a: "Yes! Switch to annual billing and save 20% compared to monthly payments. Contact our sales team for enterprise discounts.",
        },
      ],
    },
    {
      category: "Technical Support",
      items: [
        {
          q: "What browsers are supported?",
          a: "Forge works on all modern browsers including Chrome, Firefox, Safari, and Edge. For best experience, use the latest version of your browser.",
        },
        {
          q: "Is there a mobile app?",
          a: "The platform is fully responsive and works great on mobile devices through your browser. Native iOS and Android apps are coming soon.",
        },
        {
          q: "I'm having technical issues. How do I get help?",
          a: "Contact our support team via the Help Center, email support@forgelearning.com, or call 1-800-FORGE-1. Our team responds within 24 hours.",
        },
      ],
    },
    {
      category: "Account & Privacy",
      items: [
        {
          q: "How is my data secured?",
          a: "We use industry-standard encryption and security practices to protect your personal and payment information. Your data is never shared with third parties without your consent.",
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can delete your account from Settings > Security > Delete Account. This action is permanent and removes all your data.",
        },
        {
          q: "How do I download my data?",
          a: "Visit Settings > Security and select 'Download My Data'. We'll prepare a file with all your personal information and course history.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs
    .map(category => ({
      ...category,
      items: category.items.filter(
        item =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-green-100 text-lg mb-8">Find answers to common questions or reach out to our team</p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3 text-green-200" size={20} />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* FAQ Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-6">
              {filteredFaqs.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = catIndex * 10 + itemIndex;
                      const isExpanded = expandedFaq === globalIndex;

                      return (
                        <button
                          key={globalIndex}
                          onClick={() => setExpandedFaq(isExpanded ? null : globalIndex)}
                          className="w-full text-left p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">{item.q}</p>
                            <ChevronDown
                              size={20}
                              className={`text-gray-600 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </div>

                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-200 text-gray-600"
                            >
                              {item.a}
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No results found for "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Didn't find what you're looking for?</h2>
          <p className="text-gray-600 mb-8">Our support team is here to help. Reach out to us through any of these channels:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, label: "Chat", desc: "Live chat support", link: "#" },
              { icon: Mail, label: "Email", desc: "support@forgelearning.com", link: "mailto:support@forgelearning.com" },
              { icon: Phone, label: "Phone", desc: "1-800-FORGE-1", link: "tel:1-800-367-4341" },
            ].map((contact, i) => {
              const Icon = contact.icon;
              return (
                <a key={i} href={contact.link} className="p-4 bg-white rounded-lg border border-green-200 hover:shadow-lg transition-shadow">
                  <Icon size={24} className="text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 mb-1">{contact.label}</p>
                  <p className="text-sm text-gray-600">{contact.desc}</p>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Getting Started Guide", desc: "Learn the basics of Forge in just 10 minutes" },
              { title: "Video Tutorials", desc: "Step-by-step video guides for common tasks" },
              { title: "Best Practices", desc: "Tips for getting the most out of your courses" },
              { title: "Community Forum", desc: "Connect with other learners and share experiences" },
            ].map((resource, i) => (
              <button key={i} className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.desc}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
