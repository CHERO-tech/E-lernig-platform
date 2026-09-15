"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import AuthShell from "@/components/AuthShell";

const DEMO_ACCOUNTS = [
  { label: "Student", email: "student@example.com" },
  { label: "Trainer", email: "trainer@example.com" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "student@example.com",
    password: "password123",
  });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const doLogin = async (email: string, password: string) => {
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/student/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doLogin(formData.email, formData.password);
  };

  return (
    <AuthShell>
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 text-dt">Welcome back</h1>
            <p className="text-sm text-mg">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold mb-1.5 text-dt">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold mb-1.5 text-dt">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded accent-pg"
                />
                <span className="text-sm text-mg">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-pg2 hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3 bg-err/5 border border-err/20 rounded text-err text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-center mb-3 text-mg">Sign in as a demo role</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => doLogin(acc.email, "password123")}
                  disabled={loading}
                  className="px-2 py-2.5 rounded-lg text-xs font-medium transition-all hover:shadow-md disabled:opacity-50 bg-ow text-mg border border-border"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mt-6 text-sm text-brass/40">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-brass hover:underline">
          Sign up free
        </Link>
      </p>
    </AuthShell>
  );
}
