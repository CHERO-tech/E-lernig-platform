import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar,
} from "recharts";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
  { key: "users", label: "Manage Users", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="8" r="4" /><path d="M1 20c0-4 4-6 8-6s8 2 8 6" /><circle cx="17" cy="8" r="4" /><path d="M13 20c1-2 2-3 4-3" /></svg> },
  { key: "courses", label: "Manage Courses", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v10H6.5A2.5 2.5 0 0 1 4 9.5v-5A2.5 2.5 0 0 1 6.5 2z" /></svg> },
  { key: "institutions", label: "Institutions", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { key: "companies", label: "Companies", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="6" y1="12" x2="6" y2="17" /><line x1="12" y1="12" x2="12" y2="17" /><line x1="18" y1="12" x2="18" y2="17" /></svg> },
  { key: "payments", label: "Payments", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2.5" /><line x1="1" y1="10" x2="23" y2="10" /><circle cx="8" cy="16" r="1.5" /></svg> },
  { key: "certificates", label: "Certificates", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L8 8H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8H16L12 2Z" /><path d="M12 11L14 15H10L12 11Z" /></svg> },
  { key: "reports", label: "Reports", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3h18v18H3z" /><path d="M9 17V9" /><path d="M15 17V5" /><path d="M12 17v-3" /></svg> },
  { key: "settings", label: "System Settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m4.24-4.24l4.24-4.24" /></svg> },
];

const growthData = [
  { month: "Jan", students: 420, revenue: 3200000 },
  { month: "Feb", students: 580, revenue: 4100000 },
  { month: "Mar", students: 740, revenue: 5300000 },
  { month: "Apr", students: 920, revenue: 6800000 },
  { month: "May", students: 1100, revenue: 8200000 },
  { month: "Jun", students: 1340, revenue: 9700000 },
  { month: "Jul", students: 1520, revenue: 11200000 },
  { month: "Aug", students: 1780, revenue: 13100000 },
  { month: "Sep", students: 2060, revenue: 15400000 },
];

const certData = [
  { month: "Jun", certs: 42 },
  { month: "Jul", certs: 68 },
  { month: "Aug", certs: 91 },
  { month: "Sep", certs: 124 },
];

const alerts = [
  { type: "warning", msg: "Server load at 78% — consider scaling", time: "2 min ago" },
  { type: "success", msg: "124 new certificates issued this month", time: "1 hour ago" },
  { type: "info", msg: "INES-Ruhengeri onboarded successfully", time: "3 hours ago" },
  { type: "warning", msg: "3 payment failures detected", time: "5 hours ago" },
  { type: "success", msg: "Platform uptime: 99.97% this month", time: "1 day ago" },
];

const alertColor = (type: string) => {
  if (type === "success") return { bg: "rgba(53,196,122,0.08)", color: "#35C47A", border: "rgba(53,196,122,0.2)" };
  if (type === "warning") return { bg: "rgba(193,127,51,0.08)", color: "#C17F33", border: "rgba(193,127,51,0.2)" };
  return { bg: "rgba(51,106,193,0.08)", color: "#336AC1", border: "rgba(51,106,193,0.2)" };
};

export default function PlatformAdminDashboard() {
  const [activeKey, setActiveKey] = useState("dashboard");

  return (
    <DashboardLayout
      role="admin"
      roleLabel="Platform Admin"
      navItems={navItems}
      activeKey={activeKey}
      onNav={setActiveKey}
      userName="Platform Admin"
      userInitials="PA"
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ sudo systemctl status academy</p>
            <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Platform Overview</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#35C47A" }} />
              <span className="font-mono text-xs" style={{ color: "#1F7A4B" }}>All systems operational</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:bg-surface hover:shadow-md" style={{ background: "#F5F7F5", color: "#102019", border: "1px solid #E2E8E4" }}>Export Report</button>
            <button className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:brightness-110" style={{ background: "#35C47A", color: "#071C12" }}>System Settings</button>
          </div>
        </div>

        {/* Big stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Students", value: "2,060", change: "+280 this month" },
            { label: "Total Trainers", value: "38", change: "+3 this month" },
            { label: "Institutions", value: "12", change: "+1 this month" },
            { label: "Companies", value: "9", change: "Hiring partners" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <p className="text-xs mb-3" style={{ color: "#606C66" }}>{s.label}</p>
              <p className="font-mono text-3xl font-bold mb-1" style={{ color: "#1F7A4B" }}>{s.value}</p>
              <p className="font-mono text-xs" style={{ color: "#606C66" }}>{s.change}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Courses", value: "48", change: "3 tracks" },
            { label: "Projects Submitted", value: "847", change: "+124 this month" },
            { label: "Certificates Issued", value: "1,247", change: "+124 this month" },
            { label: "Monthly Revenue", value: "RWF 15.4M", change: "+18% vs last month" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <p className="text-xs mb-3" style={{ color: "#606C66" }}>{s.label}</p>
              <p className="font-mono text-3xl font-bold mb-1" style={{ color: "#1F7A4B" }}>{s.value}</p>
              <p className="font-mono text-xs" style={{ color: "#606C66" }}>{s.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* User growth */}
            <div className="rounded-xl p-6 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 className="font-semibold mb-5" style={{ color: "#102019" }}>Platform Growth — Students</h2>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="studentGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#35C47A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#35C47A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }} />
                  <Area type="monotone" dataKey="students" stroke="#35C47A" fill="url(#studentGrowth)" strokeWidth={2.5} name="Students" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue + certs side by side */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.12)", boxShadow: "0 8px 16px rgba(53,196,122,0.1)" }}>
                <p className="font-mono text-xs mb-1" style={{ color: "#35C47A" }}>Monthly Revenue</p>
                <p className="font-mono text-2xl font-bold mb-4" style={{ color: "#FFFFFF" }}>RWF 15.4M</p>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={growthData.slice(-4)}>
                    <Line type="monotone" dataKey="revenue" stroke="#35C47A" strokeWidth={2} dot={false} />
                    <Tooltip contentStyle={{ background: "#071C12", border: "1px solid rgba(53,196,122,0.2)", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 11 }} formatter={(v: number) => [`RWF ${(v/1000000).toFixed(1)}M`, "Revenue"]} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <p className="font-mono text-xs mb-1" style={{ color: "#606C66" }}>Certificates Issued</p>
                <p className="font-mono text-2xl font-bold mb-4" style={{ color: "#1F7A4B" }}>+124 this month</p>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={certData} barSize={18}>
                    <Bar dataKey="certs" fill="#35C47A" radius={[3, 3, 0, 0]} />
                    <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 11 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Admin actions */}
            <div className="rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "#102019" }}>Admin Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Manage Users", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><circle cx="9" cy="8" r="4" /><path d="M1 20c0-4 4-6 8-6s8 2 8 6" /><circle cx="17" cy="8" r="4" /><path d="M13 20c1-2 2-3 4-3" /></svg> },
                  { label: "Manage Courses", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v10H6.5A2.5 2.5 0 0 1 4 9.5v-5A2.5 2.5 0 0 1 6.5 2z" /></svg> },
                  { label: "Institutions", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
                  { label: "Companies", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="6" y1="12" x2="6" y2="17" /><line x1="12" y1="12" x2="12" y2="17" /><line x1="18" y1="12" x2="18" y2="17" /></svg> },
                  { label: "Payments", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2.5" /><line x1="1" y1="10" x2="23" y2="10" /><circle cx="8" cy="16" r="1.5" /></svg> },
                  { label: "Certificates", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M12 2L8 8H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8H16L12 2Z" /><path d="M12 11L14 15H10L12 11Z" /></svg> },
                  { label: "Reports", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M3 3h18v18H3z" /><path d="M9 17V9" /><path d="M15 17V5" /><path d="M12 17v-3" /></svg> },
                  { label: "System Settings", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m4.24-4.24l4.24-4.24" /></svg> },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all hover:shadow-lg hover:border-green-300 active:scale-95"
                    style={{ background: "#F5F7F5", border: "1px solid #E2E8E4", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  >
                    <div>{a.icon}</div>
                    <span className="font-mono text-xs" style={{ color: "#606C66" }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div>
            <div className="rounded-xl overflow-hidden transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid #E2E8E4", background: "#071C12" }}>
                <p className="font-mono text-xs mb-0.5" style={{ color: "#35C47A" }}>$ tail -f system.log</p>
                <h3 className="font-semibold text-white">System Activity</h3>
              </div>
              <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
                {alerts.map((a, i) => {
                  const ac = alertColor(a.type);
                  return (
                    <div key={i} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: ac.color }} />
                        <div>
                          <p className="text-sm" style={{ color: "#102019" }}>{a.msg}</p>
                          <p className="font-mono text-xs mt-1" style={{ color: "#606C66" }}>{a.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System health */}
            <div className="mt-5 rounded-xl p-5 transition-all hover:shadow-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "#102019" }}>System Health</h3>
              {[
                { label: "API Response", value: "98ms", status: "good" },
                { label: "Database Load", value: "42%", status: "good" },
                { label: "Server CPU", value: "78%", status: "warn" },
                { label: "Storage", value: "61%", status: "good" },
                { label: "Uptime", value: "99.97%", status: "good" },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs" style={{ color: "#606C66" }}>{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: metric.status === "warn" ? "#915F27" : "#1F7A4B" }}>{metric.value}</span>
                    <span className="w-2 h-2 rounded-full" style={{ background: metric.status === "warn" ? "#C17F33" : "#35C47A" }} />
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
