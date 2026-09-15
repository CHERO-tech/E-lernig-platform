"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { UserRole } from "@/lib/auth/types";
import AuthShell from "@/components/AuthShell";

const ROLES: Array<{ value: UserRole; label: string; icon: React.ReactNode; description: string }> = [
  {
    value: "student",
    label: "Student",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10v6M6.51 9C7.51 5.62 9.12 3 12 3c2.88 0 4.49 2.62 5.51 6M9 17c0 1.66.895 3.11 2.229 3.9M15 17c0 1.66-.895 3.11-2.229 3.9M12 14v.01M8 21h8" /></svg>,
    description: "Learn & develop skills",
  },
  {
    value: "trainer",
    label: "Trainer",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M6 21v-2a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v2" /></svg>,
    description: "Create & teach courses",
  },
  {
    value: "school",
    label: "School",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    description: "Manage institution",
  },
  {
    value: "guardian",
    label: "Guardian",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="3" /><path d="M5 12c0-2.21 2-4 4-4s4 1.79 4 4" /><circle cx="16" cy="10" r="3" /><path d="M13 14c0-2 1.5-3 3-3s3 1 3 3" /></svg>,
    description: "Monitor progress",
  },
  {
    value: "company",
    label: "Company",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
    description: "Find & hire talent",
  },
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
    <AuthShell>
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 text-dt">
              {step === "role" ? "Join Forge" : "Create Account"}
            </h1>
            <p className="text-sm text-mg">
              {step === "role"
                ? "Choose your role to get started."
                : "Complete your information to create an account."}
            </p>
          </div>

          {step === "role" ? (
            <div className="space-y-3">
              {ROLES.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="w-full p-3 rounded-lg text-left transition-all bg-ow border border-border hover:border-pg hover:bg-pg/[0.06]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-pg/10 text-pg2">
                      {role.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-dt">{role.label}</p>
                      <p className="text-xs mt-0.5 text-mg">{role.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold mb-1.5 text-dt">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold mb-1.5 text-dt">
                  Email
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

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold mb-1.5 text-dt">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg"
                />
              </div>

              {error && (
                <div className="p-3 bg-err/5 border border-err/20 rounded text-err text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("role");
                    setError("");
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all bg-white text-dt border border-border hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <p className="text-center mt-6 text-sm text-brass/40">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brass hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
