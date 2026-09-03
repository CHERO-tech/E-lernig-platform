"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    { icon: Mail, title: "Email", value: "support@forgelearning.com", desc: "Response within 24 hours" },
    { icon: Phone, title: "Phone", value: "1-800-FORGE-1", desc: "Mon-Fri, 9AM-6PM EST" },
    { icon: MessageSquare, title: "Live Chat", value: "Available on site", desc: "Instant support" },
    { icon: MapPin, title: "Office", value: "San Francisco, CA", desc: "Visit us anytime" },
  ];

  const faqs = [
    { q: "How do I get started?", a: "Simply create an account, choose your learning path, and enroll in a course. You'll have immediate access to all materials." },
    { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee on all courses. No questions asked." },
    { q: "Can I get help with a specific course?", a: "Absolutely! Email our support team or use live chat with course details and we'll assist within 24 hours." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-green-100 text-lg">Have questions? We're here to help!</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-green-600 font-medium text-sm mb-2">{method.value}</p>
                  <p className="text-gray-600 text-xs">{method.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact Form and Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Contact Us?</h2>
              <p className="text-gray-600 mb-4">
                Whether you have questions about courses, need technical support, or want to partner with us, our team is ready to help. We typically respond within 24 hours.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex gap-3 mb-4">
                <Clock size={20} className="text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Business Hours</p>
                  <p className="text-sm text-gray-600">Monday - Friday: 9 AM - 6 PM EST</p>
                  <p className="text-sm text-gray-600">Saturday - Sunday: 10 AM - 4 PM EST</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">Common Inquiries</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Course recommendations</li>
                <li>✓ Technical issues</li>
                <li>✓ Billing questions</li>
                <li>✓ Partnership opportunities</li>
                <li>✓ Instructor applications</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quick Answers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <p className="font-bold text-gray-900 mb-3">{faq.q}</p>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-green-100 mb-8 text-lg">Join thousands of students transforming their careers on Forge</p>
          <Link href="/courses" className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
            Explore Courses
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
