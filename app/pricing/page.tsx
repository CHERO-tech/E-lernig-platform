"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      desc: "Perfect to get started",
      features: ["Access to 50+ courses", "Community support", "Email support", "30-day refund"],
      cta: "Get Started",
    },
    {
      name: "Professional",
      price: "$79",
      desc: "Most popular choice",
      features: ["Access to 300+ courses", "Priority email support", "Live chat support", "30-day refund", "Certificates", "Project portfolio"],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For teams & companies",
      features: ["Unlimited courses", "24/7 dedicated support", "Custom training paths", "Team analytics", "SSO integration", "SLA guarantee"],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-green-100 text-lg">Choose the plan that fits your learning journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-lg border-2 p-8 ${
                plan.highlighted
                  ? "border-green-600 bg-green-50 ring-2 ring-green-600 relative"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.desc}</p>
              <p className="text-4xl font-bold text-gray-900 mb-6">{plan.price}</p>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 transition-colors ${
                  plan.highlighted
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "border border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200 text-left">
              <p className="font-semibold text-gray-900 mb-2">Can I change my plan?</p>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade anytime. Changes take effect immediately.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 text-left">
              <p className="font-semibold text-gray-900 mb-2">Do you offer refunds?</p>
              <p className="text-gray-600 text-sm">All plans come with a 30-day money-back guarantee. No questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
