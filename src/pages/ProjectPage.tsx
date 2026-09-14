import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const statuses = ["Draft", "Submitted", "Under Review", "Approved"] as const;
type Status = typeof statuses[number];

const statusStyle = (s: Status) => {
  if (s === "Approved") return { bg: "rgba(53,196,122,0.1)", color: "#35C47A", border: "rgba(53,196,122,0.3)" };
  if (s === "Under Review") return { bg: "rgba(51,106,193,0.08)", color: "#336AC1", border: "rgba(51,106,193,0.25)" };
  if (s === "Submitted") return { bg: "rgba(193,127,51,0.08)", color: "#C17F33", border: "rgba(193,127,51,0.25)" };
  return { bg: "rgba(113,128,120,0.08)", color: "#606C66", border: "rgba(113,128,120,0.25)" };
};

export default function ProjectPage() {
  const [params] = useSearchParams();
  const role = params.get("role");
  const dashboardHref = role === "trainer" ? "/trainer" : role === "student" ? "/student" : null;

  const [status, setStatus] = useState<Status>("Draft");
  const [githubUrl, setGithubUrl] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const ss = statusStyle(status);

  return (
    <div className="min-h-screen" style={{ background: "#F5F7F5" }}>
      {dashboardHref && (
        <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
          <div className="max-w-6xl mx-auto px-8 py-3">
            <Link to={dashboardHref} className="text-sm font-medium" style={{ color: "#35C47A" }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      )}
      {/* Header */}
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <p className="font-mono text-xs" style={{ color: "#35C47A" }}>$ project --submit</p>
                <span
                  className="font-mono text-xs px-2.5 py-1 rounded-full font-bold"
                  style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}
                >
                  {status.toUpperCase()}
                </span>
              </div>
              <h1 className="text-page-title mb-2" style={{ color: "#FFFFFF" }}>
                Inventory Management System
              </h1>
              <p className="font-mono text-sm" style={{ color: "#606C66" }}>
                Software Development · Advanced · Deadline: September 20, 2026
              </p>
            </div>
            {/* Status stepper */}
            <div className="hidden md:flex items-center gap-2">
              {statuses.map((s, i) => {
                const si = statuses.indexOf(status);
                const done = i <= si;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                        style={{
                          background: done ? "#35C47A" : "rgba(53,196,122,0.1)",
                          color: done ? "#071C12" : "rgba(53,196,122,0.4)",
                        }}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <span className="font-mono text-xs mt-1" style={{ color: done ? "#35C47A" : "#606C66", fontSize: 10 }}>{s}</span>
                    </div>
                    {i < statuses.length - 1 && (
                      <div className="w-8 h-px mb-4" style={{ background: done && i < si ? "#35C47A" : "rgba(53,196,122,0.2)" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold mb-2" style={{ color: "#102019" }}>Project Description</h3>
            <p className="text-sm mb-4" style={{ color: "#606C66" }}>
              Build a complete inventory management system with product tracking, stock alerts, purchase orders, and reporting.
            </p>
            <div className="rounded-lg p-4" style={{ background: "#F5F7F5", border: "1px solid #E2E8E4" }}>
              <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>Requirements:</p>
              <ul className="space-y-1">
                {[
                  "CRUD operations for products and categories",
                  "Stock level tracking with low-stock alerts",
                  "Purchase order management",
                  "Sales reporting with charts",
                  "User authentication and role management",
                  "Responsive design for mobile and desktop",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2 font-mono text-xs" style={{ color: "#606C66" }}>
                    <span style={{ color: "#1F7A4B" }}>›</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills being assessed */}
          <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold mb-4" style={{ color: "#102019" }}>Skills Being Assessed</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "PostgreSQL", "REST API Design", "Authentication", "Data Visualization", "UI/UX"].map((s) => (
                <span key={s} className="font-mono text-xs px-3 py-1.5 rounded" style={{ background: "rgba(53,196,122,0.08)", color: "#1F7A4B", border: "1px solid rgba(53,196,122,0.2)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Submission */}
          <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold mb-5" style={{ color: "#102019" }}>Your Submission</h3>

            {/* File upload */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: "#102019" }}>Upload Files</label>
              <div
                className="rounded-xl p-8 text-center transition-all"
                style={{
                  border: `2px dashed ${dragOver ? "#35C47A" : "#E2E8E4"}`,
                  background: dragOver ? "rgba(53,196,122,0.04)" : "#F5F7F5",
                }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const dropped = Array.from(e.dataTransfer.files).map((f) => f.name);
                  setFiles((prev) => [...prev, ...dropped]);
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(53,196,122,0.1)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: "#102019" }}>Drop files here or click to browse</p>
                <p className="font-mono text-xs" style={{ color: "#606C66" }}>ZIP, PDF, images — max 50MB</p>
                <label className="mt-4 inline-block px-4 py-2 rounded-lg text-sm font-medium cursor-pointer" style={{ background: "#FFFFFF", color: "#102019", border: "1px solid #E2E8E4" }}>
                  Browse Files
                  <input type="file" multiple className="hidden" onChange={(e) => {
                    const names = Array.from(e.target.files || []).map((f) => f.name);
                    setFiles((prev) => [...prev, ...names]);
                  }} />
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: "#F5F7F5", border: "1px solid #E2E8E4" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>
                      <span className="flex-1 font-mono text-xs" style={{ color: "#102019" }}>{f}</span>
                      <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} style={{ color: "#606C66" }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* GitHub URL */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: "#102019" }}>GitHub Repository URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/inventory-system"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none font-mono"
                style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", color: "#102019" }}
                onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "#102019" }}>Project Summary</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe your implementation, technical decisions, challenges faced, and how you met each requirement..."
                className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", color: "#102019" }}
                onFocus={(e) => (e.target.style.borderColor = "#35C47A")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8E4")}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStatus("Draft")}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-surface"
                style={{ color: "#606C66", border: "1px solid #E2E8E4", background: "#FFFFFF" }}
              >
                Save Draft
              </button>
              <button
                onClick={() => setStatus("Submitted")}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "#35C47A", color: "#071C12" }}
              >
                Submit Project
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Mentor feedback */}
          <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <div className="px-5 py-4" style={{ background: "#0B291A", borderBottom: "1px solid rgba(53,196,122,0.12)" }}>
              <p className="font-mono text-xs mb-0.5" style={{ color: "#35C47A" }}>$ git log --feedback</p>
              <h3 className="font-semibold text-white">Mentor Feedback</h3>
            </div>
            <div className="p-5">
              {status === "Approved" ? (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "#35C47A", color: "#071C12" }}>E</div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#102019" }}>Emmanuel Nkurunziza</p>
                      <p className="font-mono text-xs" style={{ color: "#606C66" }}>2 days ago</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#606C66" }}>
                    Excellent work! Your implementation covers all requirements. The authentication flow is particularly well-designed. Consider adding pagination for the product list in a future iteration.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>92/100</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E2E8E4" }}>
                      <div className="h-full rounded-full" style={{ width: "92%", background: "#35C47A" }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(53,196,122,0.08)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                  </div>
                  <p className="text-sm" style={{ color: "#606C66" }}>
                    {status === "Draft" ? "Submit your project to receive mentor feedback." : "Your project is being reviewed. Feedback will appear here."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Demo status changer */}
          <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <p className="font-mono text-xs mb-3" style={{ color: "#606C66" }}>Demo: Change status</p>
            <div className="space-y-2">
              {statuses.map((s) => {
                const sc = statusStyle(s);
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: status === s ? sc.bg : "#F5F7F5",
                      color: status === s ? (sc.color === "#35C47A" ? "#1F7A4B" : sc.color) : "#606C66",
                      border: `1px solid ${status === s ? sc.border : "#E2E8E4"}`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: status === s ? sc.color : "#E2E8E4" }} />
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#102019" }}>Project Timeline</h3>
            <div className="space-y-3">
              {[
                { label: "Project Assigned", date: "Aug 15, 2026", done: true },
                { label: "Draft Saved", date: "Aug 20, 2026", done: true },
                { label: "Submitted for Review", date: "Sep 5, 2026", done: status !== "Draft" },
                { label: "Mentor Review", date: "Sep 10, 2026", done: status === "Approved" },
                { label: "Deadline", date: "Sep 20, 2026", done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: item.done ? "#35C47A" : "#F5F7F5",
                      border: item.done ? "none" : "1px solid #E2E8E4",
                    }}
                  >
                    {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#071C12" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#102019" }}>{item.label}</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
