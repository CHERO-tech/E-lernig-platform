"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import AuthShell from "@/components/AuthShell";
import { ArrowLeft, MailCheck } from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const { user, requestEmailVerification, verifyEmail } = useAuth();
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSendCode = async () => {
    setError("");
    setLoading(true);
    try {
      const generated = await requestEmailVerification();
      setDemoCode(generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyEmail(code.trim());
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (user?.emailVerified || done) {
    return (
      <AuthShell>
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-8 text-center">
          <MailCheck size={40} className="mx-auto mb-4 text-pg2" />
          <h1 className="text-xl font-bold mb-3 text-dt">Email verified</h1>
          <p className="text-sm leading-relaxed mb-6 text-mg">Your email address is confirmed.</p>
          <button
            onClick={() => router.push(`/${user?.role ?? "student"}/dashboard`)}
            className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110"
          >
            Go to dashboard
          </button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <Link href={`/${user?.role ?? "student"}/dashboard`} className="inline-flex items-center gap-1.5 text-sm text-brass hover:text-white transition-colors mb-4">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-dt">Verify your email</h1>
          <p className="text-sm text-mg">
            Confirm <span className="font-semibold text-dt">{user?.email}</span> belongs to you.
          </p>
        </div>

        {!demoCode ? (
          <button
            onClick={handleSendCode}
            disabled={loading}
            className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Sending code..." : "Send verification code"}
          </button>
        ) : (
          <>
            <div className="p-3 bg-warn/5 border border-warn/20 rounded-lg mb-4">
              <p className="text-xs text-warn2 leading-relaxed">
                This demo has no email service, so in a real deployment this code would be sent to{" "}
                <span className="font-semibold">{user?.email}</span> instead of shown here. For now, here it is:
              </p>
              <p className="mt-2 font-mono text-lg font-bold tracking-widest text-dt">{demoCode}</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-xs font-semibold mb-1.5 text-dt">
                  Verification code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the code above"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all bg-ow border border-border text-dt focus:border-pg font-mono"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-err/5 border border-err/20 rounded text-err text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all bg-pg text-dg hover:brightness-110 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify email"}
              </button>
              <button
                type="button"
                onClick={handleSendCode}
                className="w-full text-xs text-mg hover:text-dt transition-colors"
              >
                Resend code
              </button>
            </form>
          </>
        )}
      </div>

      <p className="text-center mt-6 text-sm text-brass/40">
        <Link href={`/${user?.role ?? "student"}/dashboard`} className="font-semibold text-brass hover:underline">
          Skip for now
        </Link>
      </p>
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <ProtectedRoute>
      <VerifyEmailContent />
    </ProtectedRoute>
  );
}
