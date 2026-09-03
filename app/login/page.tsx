"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "student@example.com",
    password: "password123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/student/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Decorative Design */}
      <div className="hidden lg:flex lg:w-1/4 bg-gradient-to-b from-emerald-50 via-green-50 to-white flex-col justify-center items-center p-8 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-16 left-8 w-20 h-20 rounded-full bg-emerald-200 opacity-20"></div>
        <div className="absolute bottom-24 right-4 w-28 h-28 rounded-full bg-yellow-300 opacity-12"></div>
        <div className="absolute top-1/3 right-6 w-16 h-16 rounded-full bg-orange-300 opacity-15"></div>

        <div className="relative z-10 text-center max-w-xs">
          {/* Illustration */}
          <div className="mb-6 h-48 flex items-center justify-center">
            <svg
              viewBox="0 0 280 280"
              className="w-full max-w-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Learning/Growth theme */}
              <circle cx="140" cy="140" r="110" fill="#86efac" opacity="0.1" />
              <path d="M 80 180 Q 140 120 200 180" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="100" r="18" fill="#4ade80" opacity="0.7" />
              <circle cx="220" cy="110" r="22" fill="#22c55e" opacity="0.8" />
              <circle cx="140" cy="60" r="20" fill="#52B788" opacity="0.9" />
              <rect x="110" y="200" width="60" height="12" rx="6" fill="#22c55e" opacity="0.5" />
              <circle cx="50" cy="50" r="8" fill="#fb923c" opacity="0.6" />
              <circle cx="250" cy="240" r="6" fill="#ec4899" opacity="0.5" />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">Start Learning</h3>
          <p className="text-gray-600 text-xs leading-relaxed">
            Seize the opportunity to develop yourself and pursue your career dreams
          </p>
        </div>
      </div>

      {/* Center Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-12">
        <motion.div
          className="w-full max-w-md mx-auto my-8 px-6 py-10 bg-white rounded-xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">Login</h1>
            <p className="text-gray-600 text-center text-sm leading-relaxed">Enter your email and password to login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
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

            {/* Password */}
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

            {/* Checkbox & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-gray-400 rounded cursor-pointer accent-green-600" />
                <span className="ml-2 text-sm text-gray-700 font-medium">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-8 shadow-md hover:shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 font-bold hover:text-green-700 transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Illustration & Content */}
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 bg-gradient-to-b from-green-50 to-green-100 flex-col justify-center items-center p-6 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-green-300 opacity-20"></div>
        <div className="absolute bottom-16 left-4 w-36 h-36 rounded-full bg-orange-300 opacity-12"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-pink-300 opacity-15"></div>

        {/* Content */}
        <div className="relative z-10 text-center w-full">
          {/* Illustration */}
          <div className="mb-8 h-48 flex items-center justify-center">
            <svg
              viewBox="0 0 320 280"
              className="w-4/5 h-auto drop-shadow"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* People and education theme */}
              <circle cx="160" cy="80" r="35" fill="#22c55e" opacity="0.7" />
              <rect x="80" y="140" width="160" height="100" rx="10" fill="#4ade80" opacity="0.2" />
              <circle cx="110" cy="160" r="20" fill="#22c55e" opacity="0.8" />
              <circle cx="210" cy="150" r="24" fill="#52B788" opacity="0.7" />
              <circle cx="160" cy="220" r="16" fill="#86efac" opacity="0.6" />
              <circle cx="70" cy="60" r="10" fill="#fb923c" opacity="0.7" />
              <circle cx="270" cy="240" r="8" fill="#ec4899" opacity="0.6" />
            </svg>
          </div>

          {/* Forge Branding */}
          <div className="px-2">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Forge</span>
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              Integrated digital learning platform to develop your professional skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
