import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = [
  { key: "student", label: "Student", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 10v6M2 10v6M6.51 9C7.51 5.62 9.12 3 12 3c2.88 0 4.49 2.62 5.51 6M9 17c0 1.66.895 3.11 2.229 3.9M15 17c0 1.66-.895 3.11-2.229 3.9M12 14v.01M8 21h8" /></svg>, path: "/student" },
  { key: "trainer", label: "Trainer", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="4" /><path d="M6 21v-2a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v2" /><path d="M18 8h6M21 5v6" /></svg>, path: "/trainer" },
  { key: "school_admin", label: "School Admin", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>, path: "/school-admin" },
  { key: "company", label: "Company", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="6" y1="12" x2="6" y2="17" /><line x1="12" y1="12" x2="12" y2="17" /><line x1="18" y1="12" x2="18" y2="17" /></svg>, path: "/company" },
  { key: "guardian", label: "Guardian", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="8" r="3" /><path d="M5 12c0-2.21 2-4 4-4s4 1.79 4 4" /><circle cx="16" cy="10" r="3" /><path d="M13 14c0-2 1.5-3 3-3s3 1 3 3" /><path d="M12 18c-2 1-4 2-6 2s-5 0-6-2" /></svg>, path: "/guardian" },
];

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState("student");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find((r) => r.key === selectedRole);
    // Store login state
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", selectedRole);
    navigate(role?.path ?? "/student");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#071C12" }}>
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "#35C47A", color: "#071C12", fontFamily: "monospace" }}>T</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">TVET DIGITAL</p>
              <p className="font-mono text-xs leading-tight" style={{ color: "#35C47A" }}>SKILLS ACADEMY</p>
            </div>
          </Link>
        </div>
        <div className="relative z-10">
          <div className="rounded-xl overflow-hidden" style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.15)" }}>
            <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#35C47A", opacity: 0.6 }} />
              <span className="ml-2 font-mono text-xs" style={{ color: "#606C66" }}>welcome.sh</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-3">
              {[
                { t: "$ whoami", c: "#35C47A" },
                { t: "> tvet-digital-skills-academy", c: "#8BE0B0" },
                { t: "$ cat mission.txt", c: "#35C47A" },
                { t: "> Learn. Build. Prove Your Skills.", c: "#FFFFFF" },
                { t: "$ ls ./achievements", c: "#35C47A" },
                { t: "> certificates/ projects/ portfolio/", c: "#8BE0B0" },
              ].map((l, i) => (
                <div key={i} style={{ color: l.c }}>{l.t}</div>
              ))}
              <span className="terminal-cursor" />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-page-title mb-3" style={{ color: "#FFFFFF" }}>
              Your skills journey<br />starts here.
            </h2>
            <p className="text-sm" style={{ color: "#606C66" }}>
              Join thousands of Rwandan learners building practical digital skills.
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-6">
          {["48+ Projects", "100% Certified", "Career Ready"].map((b) => (
            <div key={b} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#35C47A" }} />
              <span className="font-mono text-xs" style={{ color: "#606C66" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#FFFFFF" }}>
            {/* Tab switcher */}
            <div className="flex" style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="flex-1 py-4 text-sm font-semibold transition-all"
                  style={{
                    background: mode === m ? "#FFFFFF" : "transparent",
                    color: mode === m ? "#102019" : "#606C66",
                    borderBottom: mode === m ? "2px solid #35C47A" : "2px solid transparent",
                  }}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1" style={{ color: "#102019" }}>
                  {mode === "login" ? "Welcome back" : "Join the Academy"}
                </h1>
                <p className="text-sm" style={{ color: "#606C66" }}>
                  {mode === "login" ? "Sign in to continue your learning journey." : "Create your account and start building skills."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Amahoro Jean de Dieu"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", color: "#102019" }}
                      onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
                      onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", color: "#102019" }}
                    onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", color: "#102019" }}
                    onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
                  />
                </div>
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#102019" }}>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", color: "#102019" }}
                      onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
                      onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
                    />
                  </div>
                )}
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "#102019" }}>I am a…</label>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((role) => (
                        <button
                          key={role.key}
                          type="button"
                          onClick={() => setSelectedRole(role.key)}
                          className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg text-xs font-medium transition-all hover:shadow-md active:scale-95"
                          style={{
                            background: selectedRole === role.key ? "rgba(53,196,122,0.08)" : "#F5F7F5",
                            border: `1px solid ${selectedRole === role.key ? "#35C47A" : "#E2E8E4"}`,
                            color: selectedRole === role.key ? "#1F7A4B" : "#606C66",
                          }}
                        >
                          <div style={{ color: selectedRole === role.key ? "#1F7A4B" : "#606C66" }}>{role.icon}</div>
                          {role.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {mode === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="rounded"
                        style={{ accentColor: "#35C47A" }}
                      />
                      <span className="text-sm" style={{ color: "#606C66" }}>Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-medium" style={{ color: "#1F7A4B" }}>Forgot password?</a>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 mt-2"
                  style={{ background: "#35C47A", color: "#071C12" }}
                >
                  {mode === "login" ? "Sign In" : "Create Account"}
                </button>
              </form>

              {mode === "login" && (
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid #E2E8E4" }}>
                  <p className="text-xs text-center mb-3" style={{ color: "#606C66" }}>Sign in as a demo role</p>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.slice(0, 3).map((role) => (
                      <button
                        key={role.key}
                        type="button"
                        onClick={() => navigate(role.path)}
                        className="px-2 py-2 rounded-lg text-xs font-medium transition-all hover:shadow-md hover:bg-white active:scale-95"
                        style={{ background: "#F5F7F5", color: "#606C66", border: "1px solid #E2E8E4" }}
                      >
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px", color: "#1F7A4B" }}>{role.icon}</div>
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center mt-6 text-sm" style={{ color: "rgba(139,224,176,0.4)" }}>
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="font-semibold" style={{ color: "#8BE0B0" }}>
              {mode === "login" ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
