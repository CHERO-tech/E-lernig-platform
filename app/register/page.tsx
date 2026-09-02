"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                🚀
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Forge
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {step === "role"
                ? "Choose your role to get started"
                : "Create your account"}
            </p>
          </div>

          {step === "role" ? (
            <div className="space-y-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="w-full p-4 border-2 border-slate-200 dark:border-slate-600 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{role.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {role.label}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {role.description}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <div className="flex gap-2 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setStep("role")}
                  className="flex-1 py-2.5 px-4 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Creating..." : "Create Account"}
                  {!loading && <ArrowRight size={18} />}
                </motion.button>
              </div>
            </form>
          )}

          {step === "role" && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                <span className="text-sm text-slate-500 dark:text-slate-400">or</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>

              <p className="text-center text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
