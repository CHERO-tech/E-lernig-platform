import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "courses", label: "My Courses", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
  { key: "lessons", label: "Lessons", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg> },
  { key: "assignments", label: "Assignments", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> },
  { key: "projects", label: "Projects", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> },
  { key: "students", label: "Students", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  { key: "assessments", label: "Assessments", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg> },
  { key: "analytics", label: "Analytics", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
  { key: "certificates", label: "Certificates", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg> },
  { key: "profile", label: "Profile", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
];

const enrollmentData = [
  { week: "W1", students: 12 },
  { week: "W2", students: 19 },
  { week: "W3", students: 25 },
  { week: "W4", students: 31 },
  { week: "W5", students: 28 },
  { week: "W6", students: 38 },
  { week: "W7", students: 42 },
  { week: "W8", students: 47 },
];

export const completionData = [
  { course: "Web Dev", rate: 68 },
  { course: "Networking", rate: 54 },
  { course: "UI/UX", rate: 72 },
  { course: "Databases", rate: 61 },
];

const pendingReviews = [
  { student: "Amahoro Jean", project: "Portfolio Website", submitted: "2 hours ago", track: "Software Dev" },
  { student: "Ineza Grace", project: "Office Network", submitted: "5 hours ago", track: "Networking" },
  { student: "Kagabo Eric", project: "Brand Identity", submitted: "1 day ago", track: "Multimedia" },
  { student: "Munyakazi Lisa", project: "E-Commerce UI", submitted: "2 days ago", track: "Software Dev" },
];

const recentStudents = [
  { name: "Amahoro Jean de Dieu", email: "amahoro@example.com", progress: 72, course: "Web Development" },
  { name: "Ineza Grace Marie", email: "ineza@example.com", progress: 45, course: "Networking" },
  { name: "Kagabo Eric", email: "kagabo@example.com", progress: 88, course: "UI/UX Design" },
  { name: "Munyakazi Lisa", email: "munyakazi@example.com", progress: 31, course: "Web Development" },
  { name: "Nzeyimana Patrick", email: "nzeyimana@example.com", progress: 60, course: "Networking" },
];

export default function TrainerDashboard() {
  const [activeKey, setActiveKey] = useState("dashboard");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "courses") window.location.href = "/manage-courses?role=trainer&userName=Emmanuel+Nkurunziza&userInitials=EN";
    if (key === "projects") window.location.href = "/projects";
    if (key === "profile") window.location.href = "/settings?role=trainer&roleLabel=Trainer&userName=Emmanuel+Nkurunziza&userInitials=EN";
    if (key === "certificates") window.location.href = "/certificates?role=trainer&userName=Emmanuel+Nkurunziza&userInitials=EN";
    if (key === "students") window.location.href = "/people?type=student&institution=INES-Ruhengeri&role=trainer&userName=Emmanuel+Nkurunziza&userInitials=EN";
    if (key === "analytics") window.location.href = "/reports?role=trainer&userName=Emmanuel+Nkurunziza&userInitials=EN";
    if (key === "lessons") window.location.href = "/lessons";
    if (key === "assignments") window.location.href = "/assignments";
    if (key === "assessments") window.location.href = "/assessments";
  };

  return (
    <DashboardLayout
      role="trainer"
      roleLabel="Trainer"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="Emmanuel Nkurunziza"
      userInitials="EN"
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ whoami — trainer</p>
            <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Trainer Dashboard</h1>
            <p style={{ color: "#606C66" }}>Welcome back, Emmanuel. You have 4 pending project reviews.</p>
          </div>
          <button
            className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#35C47A", color: "#071C12" }}
          >
            + Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Students", value: "126", trend: "+12 this week", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><circle cx="9" cy="8" r="4" /><path d="M1 20c0-4 4-6 8-6s8 2 8 6" /><circle cx="17" cy="8" r="4" /><path d="M13 20c1-2 2-3 4-3" /></svg> },
            { label: "Active Students", value: "89", trend: "71% active rate", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
            { label: "Courses", value: "4", trend: "3 active", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v10H6.5A2.5 2.5 0 0 1 4 9.5v-5A2.5 2.5 0 0 1 6.5 2z" /></svg> },
            { label: "Projects Submitted", value: "47", trend: "4 pending review", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg> },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs" style={{ color: "#606C66" }}>{s.label}</p>
                <div>{s.icon}</div>
              </div>
              <p className="font-mono text-3xl font-bold mb-1" style={{ color: "#1F7A4B" }}>{s.value}</p>
              <p className="font-mono text-xs" style={{ color: "#606C66" }}>{s.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Enrollment chart */}
            <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <h2 className="font-semibold mb-5" style={{ color: "#102019" }}>Student Enrollment — Last 8 Weeks</h2>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }} />
                  <Line type="monotone" dataKey="students" stroke="#35C47A" strokeWidth={2.5} dot={{ fill: "#35C47A", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Completion rates */}
            <div className="rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <h2 className="font-semibold mb-5" style={{ color: "#102019" }}>Course Completion Rates</h2>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={completionData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                  <XAxis dataKey="course" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }} formatter={(v) => [`${v}%`, "Completion"]} />
                  <Bar dataKey="rate" fill="#35C47A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Student list */}
            <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #E2E8E4" }}>
                <h2 className="font-semibold" style={{ color: "#102019" }}>My Students</h2>
                <button className="font-mono text-xs" style={{ color: "#1F7A4B" }}>View all →</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                    {["Student", "Course", "Progress", "Action"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((s, i) => (
                    <tr key={s.email} style={{ borderBottom: i < recentStudents.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}>
                            {s.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#102019" }}>{s.name}</p>
                            <p className="font-mono text-xs" style={{ color: "#606C66" }}>{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{s.course}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E2E8E4" }}>
                            <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: s.progress >= 70 ? "#35C47A" : s.progress >= 40 ? "#C17F33" : "#606C66" }} />
                          </div>
                          <span className="font-mono text-xs w-8 text-right" style={{ color: "#102019" }}>{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <button className="font-mono text-xs" style={{ color: "#1F7A4B" }}>View →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending reviews */}
          <div>
            <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid #E2E8E4", background: "#0B291A" }}>
                <p className="font-mono text-xs mb-1" style={{ color: "#35C47A" }}>$ projects --pending-review</p>
                <h2 className="font-semibold text-white">Pending Reviews</h2>
              </div>
              <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
                {pendingReviews.map((item) => (
                  <div key={item.student} className="p-5 hover:bg-surface">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}>
                        {item.student[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: "#102019" }}>{item.student}</p>
                        <p className="font-mono text-xs" style={{ color: "#606C66" }}>{item.submitted}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-1" style={{ color: "#102019" }}>{item.project}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(53,196,122,0.08)", color: "#1F7A4B", border: "1px solid rgba(53,196,122,0.15)" }}>{item.track}</span>
                      <Link to="/projects" className="font-mono text-xs font-semibold" style={{ color: "#1F7A4B" }}>Review →</Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ borderTop: "1px solid #E2E8E4" }}>
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#F5F7F5", color: "#102019", border: "1px solid #E2E8E4" }}>
                  View All Submissions
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-5 rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: "#102019" }}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Upload Lesson", href: "/lessons", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg> },
                  { label: "Create Quiz", href: "/assessments", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
                  { label: "Send Announcement", href: "/announcements", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
                  { label: "Grade Assignments", href: "/assignments", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={action.href ? () => { window.location.href = action.href; } : undefined}
                    disabled={!action.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition-all active:scale-95 ${action.href ? "hover:shadow-md hover:bg-white" : "opacity-50 cursor-not-allowed"}`}
                    style={{ background: "#F5F7F5", color: "#102019", border: "1px solid #E2E8E4" }}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
