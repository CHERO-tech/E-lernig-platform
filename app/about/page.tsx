"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Zap, Target, Award, ArrowRight } from "lucide-react";
import { useNotifications } from "@/lib/notifications/useNotifications";

export default function About() {
  const { addNotification } = useNotifications();
  const values = [
    { icon: Zap, title: "Accessibility", desc: "Quality education should be available to everyone, anywhere" },
    { icon: Target, title: "Practicality", desc: "Focus on real-world skills that employers actually value" },
    { icon: Award, title: "Excellence", desc: "Rigorous standards and expert instruction in every course" },
    { icon: Users, title: "Community", desc: "Learning is better together - support and collaborate with peers" },
  ];

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "300+", label: "Courses Available" },
    { number: "15K+", label: "Certificates Issued" },
    { number: "150+", label: "Expert Instructors" },
  ];

  const team = [
    { name: "Sarah Chen", role: "CEO & Founder", desc: "Former VP of Engineering at Tech Corp" },
    { name: "Mike Johnson", role: "CTO", desc: "10+ years building scalable platforms" },
    { name: "Emma Davis", role: "VP of Content", desc: "Education innovator and curriculum designer" },
    { name: "Alex Kumar", role: "VP of Growth", desc: "Built communities for 100K+ learners" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About Forge</h1>
          <p className="text-xl text-forge-soft">Transforming careers through practical, industry-relevant education</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                Forge exists to democratize access to world-class education and career opportunities. We believe that talent and ambition, not background or geography, should determine success.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                By combining hands-on projects, expert mentorship, and real-world feedback, we&apos;re creating a new generation of skilled professionals ready to make an impact.
              </p>
              <Link href="/courses" className="inline-flex items-center gap-2 text-ember-strong hover:text-ember2 font-semibold">
                Explore Courses <ArrowRight size={20} />
              </Link>
            </div>
            <div className="h-96 bg-gradient-to-br from-ember-strong to-ember rounded-lg"></div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-forge-soft rounded-lg p-8 text-center"
              >
                <p className="text-4xl font-bold text-ember-strong mb-2">{stat.number}</p>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-forge-soft rounded-full flex items-center justify-center text-ember-strong mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-ember to-ember-strong rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-ember-strong font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Impact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-forge-soft rounded-lg p-12 mb-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Over the past 3 years, we&apos;ve helped thousands of learners transition into fulfilling tech careers, with an average salary increase of 45% after completing a Forge course. We&apos;re proud to have partnered with 500+ companies to create job opportunities for our graduates.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() =>
                addNotification({
                  type: "system",
                  icon: "📖",
                  title: "Coming Soon",
                  message: "A dedicated success stories page is on the way.",
                })
              }
              className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
            >
              Read Success Stories
            </button>
            <Link href="/courses" className="px-8 py-3 border border-ember-strong text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors">
              Get Started Today
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
