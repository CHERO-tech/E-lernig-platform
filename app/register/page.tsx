"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {step === "role" ? "Pilih Role" : "Daftar Akun"}
              </h1>
              <p className="text-slate-600 text-sm">
                {step === "role"
                  ? "Pilih peran Anda untuk memulai"
                  : "Lengkapi data untuk membuat akun"}
              </p>
            </div>

            {step === "role" ? (
              <div className="space-y-3">
                {ROLES.map((role) => (
                  <motion.button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className="w-full p-4 border-2 border-slate-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-all text-left group"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{role.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{role.label}</p>
                        <p className="text-sm text-slate-600">{role.description}</p>
                      </div>
                      <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" size={20} />
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-0 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-0 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-0 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-0 transition-colors"
                  />
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

                <div className="flex gap-2 pt-2">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setStep("role");
                      setError("");
                    }}
                    className="flex-1 py-2.5 px-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all"
                  >
                    Kembali
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {loading ? "Mendaftar..." : "Daftar"}
                  </motion.button>
                </div>
              </form>
            )}

            {step === "role" && (
              <p className="text-center text-slate-600 text-sm mt-6">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
                  Login
                </Link>
              </p>
            )}
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
            {/* Illustration */}
            <div className="mb-8 h-64 flex items-center justify-center">
              <svg
                viewBox="0 0 300 300"
                className="w-full max-w-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              Bergabunglah dengan jutaan pelajar dan profesional untuk mengembangkan keterampilan Anda.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3 text-left">
              {["Pendaftaran Mudah", "Akses Seumur Hidup", "Sertifikat Profesional"].map((feature, idx) => (
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
