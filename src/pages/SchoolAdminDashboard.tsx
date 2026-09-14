import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { colors } from "../components/ui/tokens";

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
  { key: "students", label: "Students", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="8" r="4" /><path d="M1 20c0-4 4-6 8-6s8 2 8 6" /><circle cx="17" cy="8" r="4" /><path d="M13 20c1-2 2-3 4-3" /></svg> },
  { key: "trainers", label: "Trainers", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="4" /><path d="M2 20c0-4 5-7 10-7s10 3 10 7" /><path d="M14 14c0-2 1-3 2-3s2 1 2 3" /></svg> },
  { key: "courses", label: "Courses", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v10H6.5A2.5 2.5 0 0 1 4 9.5v-5A2.5 2.5 0 0 1 6.5 2z" /></svg> },
  { key: "reports", label: "Reports", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3h18v18H3z" /><path d="M9 17V9" /><path d="M15 17V5" /><path d="M12 17v-3" /></svg> },
  { key: "certificates", label: "Certificates", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L8 8H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8H16L12 2Z" /><path d="M12 11L14 15H10L12 11Z" /></svg> },
  { key: "settings", label: "Settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m4.24-4.24l4.24-4.24" /></svg> },
];

const progressData = [
  { month: "Apr", enrolled: 45, completed: 12 },
  { month: "May", enrolled: 62, completed: 18 },
  { month: "Jun", enrolled: 78, completed: 31 },
  { month: "Jul", enrolled: 91, completed: 42 },
  { month: "Aug", enrolled: 108, completed: 58 },
  { month: "Sep", enrolled: 126, completed: 67 },
];

const skillDist = [
  { name: "Software Dev", students: 58, color: colors.chart1 },
  { name: "Networking", students: 41, color: colors.chart2 },
  { name: "Multimedia", students: 27, color: colors.chart3 },
];

const topStudents = [
  { name: "Kagabo Eric", program: "Software Dev", score: 94, certs: 3 },
  { name: "Ineza Grace Marie", program: "Multimedia", score: 91, certs: 2 },
  { name: "Nzeyimana Patrick", program: "Networking", score: 88, certs: 2 },
  { name: "Amahoro Jean", program: "Software Dev", score: 85, certs: 2 },
  { name: "Munyakazi Lisa", program: "Software Dev", score: 82, certs: 1 },
];

const atRisk = [
  { name: "Bizimana Robert", lastSeen: "18 days ago", progress: 12, course: "Web Development" },
  { name: "Uwera Claudine", lastSeen: "15 days ago", progress: 8, course: "Networking" },
  { name: "Habimana Samuel", lastSeen: "21 days ago", progress: 5, course: "UI/UX Design" },
];

export default function SchoolAdminDashboard() {
  const [activeKey, setActiveKey] = useState("dashboard");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "settings") window.location.href = "/settings?role=school-admin&roleLabel=School+Admin&userName=Immacul%C3%A9e+Nyiransengimana&userInitials=IN";
    if (key === "certificates") window.location.href = "/certificates?role=school-admin&userName=Immacul%C3%A9e+Nyiransengimana&userInitials=IN";
    if (key === "students") window.location.href = "/people?type=student&institution=INES-Ruhengeri&role=school-admin&userName=Immacul%C3%A9e+Nyiransengimana&userInitials=IN";
    if (key === "trainers") window.location.href = "/people?type=trainer&institution=INES-Ruhengeri&role=school-admin&userName=Immacul%C3%A9e+Nyiransengimana&userInitials=IN";
  };

  return (
    <DashboardLayout
      role="school-admin"
      roleLabel="School Admin"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="Immaculée Nyiransengimana"
      userInitials="IN"
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ whoami — school-admin</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Institution Overview</h1>
          <p style={{ color: "#606C66" }}>INES-Ruhengeri · September 2026</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Students", value: "126" },
            { label: "Active Students", value: "89" },
            { label: "Courses Running", value: "12" },
            { label: "Completion Rate", value: "53%" },
            { label: "Certificates Issued", value: "67" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <p className="font-mono text-2xl font-bold mb-1" style={{ color: "#1F7A4B" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "#606C66" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 rounded-xl p-6 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h2 className="font-semibold mb-5" style={{ color: "#102019" }}>Enrollment & Completion Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="enrolled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#35C47A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#35C47A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart2} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors.chart2} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }} />
                <Area type="monotone" dataKey="enrolled" stroke={colors.chart1} fill="url(#enrolled)" strokeWidth={2} name="Enrolled" />
                <Area type="monotone" dataKey="completed" stroke={colors.chart2} fill="url(#completed)" strokeWidth={2} name="Completed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-6 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h2 className="font-semibold mb-5" style={{ color: "#102019" }}>Students by Track</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={skillDist} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }} />
                <Bar dataKey="students" radius={[0, 4, 4, 0]}>
                  {skillDist.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top students */}
          <div className="rounded-xl overflow-hidden transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid #E2E8E4" }}>
              <h2 className="font-semibold" style={{ color: "#102019" }}>Top Performing Students</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["#", "Student", "Track", "Score", "Certs"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topStudents.map((s, i) => (
                  <tr key={s.name} style={{ borderBottom: i < topStudents.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-4 py-3 font-mono text-sm font-bold" style={{ color: i === 0 ? "#1F7A4B" : "#606C66" }}>#{i + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "#102019" }}>{s.name}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "#606C66" }}>{s.program}</td>
                    <td className="px-4 py-3 font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{s.score}%</td>
                    <td className="px-4 py-3 font-mono text-xs text-center" style={{ color: "#102019" }}>{s.certs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* At risk */}
          <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid #E2E8E4" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C17F33" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              <h2 className="font-semibold" style={{ color: "#102019" }}>Students Needing Attention</h2>
            </div>
            <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
              {atRisk.map((s) => (
                <div key={s.name} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm" style={{ color: "#102019" }}>{s.name}</p>
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(193,127,51,0.1)", color: "#C17F33" }}>
                      Inactive {s.lastSeen}
                    </span>
                  </div>
                  <p className="font-mono text-xs mb-3" style={{ color: "#606C66" }}>{s.course}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E2E8E4" }}>
                      <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: "#C17F33" }} />
                    </div>
                    <span className="font-mono text-xs" style={{ color: "#606C66" }}>{s.progress}%</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs font-semibold px-3 py-1.5 rounded transition-all hover:shadow-md hover:bg-surface" style={{ background: "#F5F7F5", color: "#102019", border: "1px solid #E2E8E4" }}>Send Nudge</button>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded transition-all hover:shadow-md hover:bg-opacity-80" style={{ background: "rgba(53,196,122,0.08)", color: "#1F7A4B", border: "1px solid rgba(53,196,122,0.15)" }}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
