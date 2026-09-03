"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Opportunities() {
  const [filterType, setFilterType] = useState("all");

  const opportunities = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Tech Startup Inc",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      desc: "Build scalable web applications with React and Node.js",
    },
    {
      id: 2,
      title: "Product Designer Internship",
      company: "Design Studio Co",
      type: "Internship",
      location: "Remote",
      salary: "$20/hour",
      desc: "Create beautiful user experiences for mobile apps",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "AI Solutions Ltd",
      type: "Full-time",
      location: "New York, NY",
      salary: "$130k - $170k",
      desc: "Work with cutting-edge ML models and big data",
    },
    {
      id: 4,
      title: "UX/UI Designer",
      company: "Creative Agency",
      type: "Contract",
      location: "Austin, TX",
      salary: "$80/hour",
      desc: "Design interfaces for enterprise applications",
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "Web Services Corp",
      type: "Full-time",
      location: "Remote",
      salary: "$100k - $140k",
      desc: "Build end-to-end web solutions",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Cloud Infrastructure",
      type: "Full-time",
      location: "Seattle, WA",
      salary: "$110k - $150k",
      desc: "Manage cloud infrastructure and CI/CD pipelines",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <span className="text-2xl font-bold">Forge</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Job Opportunities</h1>
          <p className="text-green-100 text-lg">Find your next career opportunity with top companies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-4 mb-8 flex-wrap">
          {["all", "full-time", "internship", "contract"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filterType === type
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h3>
                  <p className="text-gray-600">{opp.company}</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                  Apply <ArrowRight size={18} />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{opp.desc}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} />
                  <span>{opp.type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{opp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign size={18} />
                  <span>{opp.salary}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to land your dream job?</h2>
          <p className="text-gray-600 mb-8">Upskill with our courses and increase your chances of getting hired</p>
          <Link
            href="/courses"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
