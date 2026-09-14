"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/useAuth";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-md mx-auto px-6 py-10 bg-white rounded-xl shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {!sent ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">Reset your password</h1>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Enter the email on your account and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-ember-strong rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ember-strong focus:ring-offset-0 text-sm transition-all"
                  required
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-ember-strong hover:bg-ember text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md hover:shadow-lg"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              If an account exists for <span className="font-semibold text-gray-900">{email}</span>, we've sent
              a link to reset your password.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/login" className="text-sm text-ember-strong font-bold hover:text-ember transition-colors">
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
