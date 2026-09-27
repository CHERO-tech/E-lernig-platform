"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import AuthShell from "@/components/AuthShell";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { requestPasswordReset, resetPasswordWithToken } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [demoToken, setDemoToken] = useState("");

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const token = await requestPasswordReset(email);
      setDemoToken(token);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordWithToken(code.trim().toUpperCase(), newPassword);
      setResetDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-brass hover:text-white transition-colors mb-4">
        <ArrowLeft size={16} />
        Back to Login
      </Link>
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-8">
        {!sent ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1 text-dt">Reset your password</h1>
              <p className="text-sm text-mg">
                Enter the email on your account and we&apos;ll generate a reset code for it.
              </p>
            </div>

            <form onSubmit={handleRequestReset} className="space-y-4">
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
                {loading ? "Generating code..." : "Get reset code"}
              </button>
            </form>
          </>
        ) : !resetDone ? (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-3 text-dt">Enter your reset code</h1>
              <div className="p-3 bg-warn/5 border border-warn/20 rounded-lg mb-4">
                <p className="text-xs text-warn2 leading-relaxed">
                  This demo has no email service, so in a real deployment this code would be sent to{" "}
                  <span className="font-semibold">{email}</span> instead of shown here. For now, here it is:
                </p>
                <p className="mt-2 font-mono text-lg font-bold tracking-widest text-dt">{demoToken}</p>
              </div>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-xs font-semibold mb-1.5 text-dt">
                  Reset code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the code above"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg font-mono uppercase"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-xs font-semibold mb-1.5 text-dt">
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-xs font-semibold mb-1.5 text-dt">
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
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
                {loading ? "Resetting..." : "Reset password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold mb-3 text-dt">Password updated</h1>
            <p className="text-sm leading-relaxed mb-6 text-mg">
              Your password has been reset. Sign in with your new password.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110"
            >
              Go to login
            </button>
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
