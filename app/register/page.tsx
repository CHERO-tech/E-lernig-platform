"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/useAuth";
import { UserRole } from "@/lib/auth/types";

const ROLES: Array<{ value: UserRole; label: string; icon: React.ReactNode; description: string }> = [
  {
    value: "student",
    label: "Student",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>,
    description: "Learn & develop skills"
  },
  {
    value: "trainer",
    label: "Trainer",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
    description: "Create & teach courses"
  },
  {
    value: "school",
    label: "School",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9v2h22V9L12 3m0 4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m8 8H4v6h16z"/></svg>,
    description: "Manage institution"
  },
  {
    value: "guardian",
    label: "Guardian",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.5-2c1.93 0 3.5-1.57 3.5-3.5S18.43 4 16.5 4 13 5.57 13 7.5s1.57 3.5 3.5 3.5zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
    description: "Monitor progress"
  },
  {
    value: "company",
    label: "Company",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2z"/></svg>,
    description: "Find & hire talent"
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [step, setStep] = useState<"role" | "details">("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep("details");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedRole) {
      setError("Please select a role");
      setLoading(false);
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.fullName, selectedRole);
      router.push(`/${selectedRole}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-12">
        <motion.div
          className="w-full max-w-md mx-auto my-8 px-6 py-10 bg-white rounded-xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
              {step === "role" ? "Register" : "Create Account"}
            </h1>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              {step === "role"
                ? "Choose your role to get started"
                : "Complete your information to create an account"}
            </p>
          </div>

          {step === "role" ? (
            <div className="space-y-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="w-full p-3 border border-gray-300 rounded hover:border-green-600 hover:bg-green-50 transition-all text-left group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {role.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{role.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{role.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-gray-800 mb-3 uppercase tracking-wide">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-800 mb-3 uppercase tracking-wide">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-800 mb-3 uppercase tracking-wide">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-800 mb-3 uppercase tracking-wide">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm transition-all"
                />
              </div>

              {error && (
                <motion.div
                  className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep("role");
                    setError("");
                  }}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md hover:shadow-lg"
                >
                  {loading ? "Creating..." : "Register"}
                </button>
              </div>
            </form>
          )}

          {step === "role" && (
            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">
                Login here
              </Link>
            </p>
          )}
        </motion.div>
      </div>

      {/* Right Column - Illustration & Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-green-50 to-green-100 flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-8 right-12 w-24 h-24 rounded-full bg-green-300 opacity-15"></div>
        <div className="absolute bottom-16 left-8 w-40 h-40 rounded-full bg-orange-300 opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-pink-300 opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-yellow-300 opacity-10"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          {/* Illustration */}
          <div className="mb-8 h-56 flex items-center justify-center">
            <svg
              viewBox="0 0 320 280"
              className="w-full max-w-sm drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="60" y="90" width="200" height="140" rx="12" fill="#22c55e" opacity="0.15" />
              <circle cx="110" cy="140" r="22" fill="#22c55e" opacity="0.8" />
              <circle cx="220" cy="110" r="28" fill="#4ade80" opacity="0.7" />
              <circle cx="160" cy="180" r="18" fill="#86efac" opacity="0.6" />
              <rect x="85" y="200" width="150" height="35" rx="6" fill="#22c55e" opacity="0.2" />
              <circle cx="75" cy="65" r="10" fill="#fb923c" opacity="0.7" />
              <circle cx="260" cy="170" r="8" fill="#fb923c" opacity="0.6" />
              <circle cx="90" cy="250" r="6" fill="#ec4899" opacity="0.5" />
            </svg>
          </div>

          {/* Forge Branding */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Forge</span>
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed px-2">
              Join thousands of participants to develop your professional skills with experienced mentors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
