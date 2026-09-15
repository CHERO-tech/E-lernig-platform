"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import AuthShell from "@/components/AuthShell";

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
    <AuthShell>
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-8">
        {!sent ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1 text-dt">Reset your password</h1>
              <p className="text-sm text-mg">
                Enter the email on your account and we&apos;ll send you a link to reset your
                password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold mb-1.5 text-dt">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-err/5 border border-err/20 rounded text-err text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold mb-3 text-dt">Check your email</h1>
            <p className="text-sm leading-relaxed text-mg">
              If an account exists for <span className="font-semibold text-dt">{email}</span>,
              we&apos;ve sent a link to reset your password.
            </p>
          </div>
        )}
      </div>

      <p className="text-center mt-6 text-sm text-brass/40">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-brass hover:underline">
          Back to login
        </Link>
      </p>
    </AuthShell>
  );
}
