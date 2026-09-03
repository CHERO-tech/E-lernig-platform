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
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12">
        <motion.div
          className="max-w-sm w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600 text-sm mb-8">Silahkan input username dan password untuk login</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="imamalik@gmail.com"
                className="w-full px-3 py-2 border border-green-500 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Kata Sandi</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-green-500 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm"
              />
            </div>

            {/* Checkbox & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded cursor-pointer" />
                <span className="ml-2 text-gray-700">Ingat saya</span>
              </label>
              <Link href="/forgot-password" className="text-green-600 hover:text-green-700 font-medium">
                Lupa Kata Sandi?
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
              className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition-colors disabled:opacity-50 text-sm mt-6"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link href="/register" className="text-green-600 font-semibold hover:text-green-700">
              Register disini
            </Link>
          </div>
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
              {/* People and education theme */}
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

          {/* eRKAM Branding */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl font-bold text-gray-800">eRKAM</span>
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed px-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
