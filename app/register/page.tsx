"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/useAuth";
import { UserRole } from "@/lib/auth/types";

const ROLES: Array<{ value: UserRole; label: string; icon: string; description: string }> = [
  { value: "student", label: "Student", icon: "👨‍🎓", description: "Learn & develop skills" },
  { value: "trainer", label: "Trainer", icon: "👨‍🏫", description: "Create & teach courses" },
  { value: "school", label: "School", icon: "🏫", description: "Manage institution" },
  { value: "guardian", label: "Guardian", icon: "👨‍👧", description: "Monitor progress" },
  { value: "company", label: "Company", icon: "🏢", description: "Find & hire talent" },
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12">
        <motion.div
          className="max-w-sm w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === "role" ? "Register" : "Daftar Akun"}
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            {step === "role"
              ? "Pilih peran Anda untuk memulai"
              : "Lengkapi data untuk membuat akun"}
          </p>

          {step === "role" ? (
            <div className="space-y-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="w-full p-3 border border-gray-300 rounded hover:border-green-600 hover:bg-green-50 transition-all text-left group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{role.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{role.label}</p>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Nama Lengkap</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  className="w-full px-3 py-2 border border-green-500 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border border-green-500 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-green-500 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-green-500 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0 text-sm"
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

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("role");
                    setError("");
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors text-sm"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors disabled:opacity-50 text-sm"
                >
                  {loading ? "Mendaftar..." : "Daftar"}
                </button>
              </div>
            </form>
          )}

          {step === "role" && (
            <p className="text-center text-gray-600 text-sm mt-6">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">
                Login
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
              Bergabunglah dengan ribuan peserta untuk mengembangkan keterampilan profesional Anda bersama mentor berpengalaman.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
