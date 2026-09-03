"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Column - Form */}
        <motion.div
          className="flex flex-col justify-center px-8 lg:px-12 py-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Login</h1>
              <p className="text-slate-600 text-sm">Silahkan input username dan password untuk login</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="imamalik@gmail.com"
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-color-ember focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-color-ember focus:ring-0 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span className="ml-2 text-sm text-slate-600">Ingat saya</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Lupa Kata Sandi?
                </Link>
              </div>

              {error && (
                <motion.div
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 mt-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </form>

            <p className="text-center text-slate-600 text-sm mt-6">
              Belum punya akun?{" "}
              <Link href="/register" className="text-emerald-600 font-semibold hover:text-emerald-700">
                Register disini
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Column - Illustration */}
        <motion.div
          className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-12 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-emerald-300 opacity-20"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-orange-300 opacity-15"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-pink-300 opacity-15"></div>

          <div className="relative z-10 text-center max-w-sm">
            {/* Illustration placeholder */}
            <div className="mb-8 h-64 flex items-center justify-center">
              <svg
                viewBox="0 0 300 300"
                className="w-full max-w-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simple educational illustration */}
                <rect x="50" y="80" width="200" height="150" rx="10" fill="#27AE60" opacity="0.2" />
                <circle cx="100" cy="120" r="20" fill="#27AE60" />
                <circle cx="200" cy="100" r="25" fill="#52B788" />
                <rect x="80" y="180" width="140" height="30" rx="5" fill="#27AE60" opacity="0.3" />
                <circle cx="70" cy="70" r="8" fill="#E67E22" />
                <circle cx="240" cy="150" r="6" fill="#E67E22" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-4">eRKAM</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Bergabunglah dengan platform pembelajaran digital terpadu untuk mengembangkan keterampilan profesional Anda bersama ribuan peserta lainnya.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3 text-left">
              {["Akses 24/7", "Sertifikat Resmi", "Mentor Berpengalaman"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
