import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "progress", label: "Progress", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { key: "certificates", label: "Certificates", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg> },
  { key: "activity", label: "Activity", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg> },
  { key: "profile", label: "Settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /></svg> },
];

const notifications = [
  { type: "success", msg: "Amahoro completed Networking Fundamentals module.", time: "2 hours ago" },
  { type: "warning", msg: "Amahoro has not logged in for 14 days.", time: "14 days ago" },
  { type: "success", msg: "Amahoro earned a certificate in UI/UX Design.", time: "3 weeks ago" },
  { type: "info", msg: "New course available: Mobile Development.", time: "1 month ago" },
];

const courses = [
  { title: "Web Development", progress: 72, status: "On track", lastActive: "Today" },
  { title: "Networking Fundamentals", progress: 45, status: "Needs attention", lastActive: "14 days ago" },
  { title: "UI/UX Design", progress: 100, status: "Completed", lastActive: "3 weeks ago" },
];

export default function GuardianDashboard() {
  const [activeKey, setActiveKey] = useState("dashboard");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "profile") window.location.href = "/settings?role=guardian&roleLabel=Guardian&userName=Jean+de+Dieu+Senior&userInitials=JS";
    if (key === "certificates") window.location.href = "/certificates?role=guardian&userName=Jean+de+Dieu+Senior&userInitials=JS";
  };

  return (
    <DashboardLayout
      role="guardian"
      roleLabel="Guardian"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="Jean de Dieu Senior"
      userInitials="JS"
    >
      <div className="p-8 max-w-3xl">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ whoami — guardian</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Student Progress Overview</h1>
          <p style={{ color: "#606C66" }}>Tracking: <strong style={{ color: "#102019" }}>Amahoro Jean de Dieu</strong></p>
        </div>

        {/* Student card */}
        <div className="rounded-xl p-6 mb-6 flex items-center gap-6" style={{ background: "#0B291A", border: "1px solid rgba(53,196,122,0.15)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: "#35C47A", color: "#071C12" }}>A</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1" style={{ color: "#FFFFFF" }}>Amahoro Jean de Dieu</h2>
            <p className="font-mono text-sm mb-3" style={{ color: "#8BE0B0" }}>INES-Ruhengeri · Software Development</p>
            <div className="flex gap-6">
              <div>
                <p className="font-mono text-xs" style={{ color: "#606C66" }}>Courses Enrolled</p>
                <p className="font-mono text-xl font-bold" style={{ color: "#35C47A" }}>3</p>
              </div>
              <div>
                <p className="font-mono text-xs" style={{ color: "#606C66" }}>Completed</p>
                <p className="font-mono text-xl font-bold" style={{ color: "#35C47A" }}>1</p>
              </div>
              <div>
                <p className="font-mono text-xs" style={{ color: "#606C66" }}>Certificates</p>
                <p className="font-mono text-xl font-bold" style={{ color: "#35C47A" }}>1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
          <div className="px-6 py-4" style={{ borderBottom: "1px solid #E2E8E4" }}>
            <h2 className="font-semibold" style={{ color: "#102019" }}>Learning Progress</h2>
          </div>
          <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
            {courses.map((c) => {
              const statusColor = c.status === "Completed" ? "#1F7A4B" : c.status === "On track" ? "#336AC1" : "#C17F33";
              return (
                <div key={c.title} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm" style={{ color: "#102019" }}>{c.title}</h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${statusColor}15`, color: statusColor }}>{c.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2 rounded-full" style={{ background: "#E2E8E4" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${c.progress}%`, background: c.progress === 100 ? "#35C47A" : "#35C47A" }} />
                    </div>
                    <span className="font-mono text-sm font-bold w-10 text-right" style={{ color: "#1F7A4B" }}>{c.progress}%</span>
                  </div>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Last active: {c.lastActive}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
          <div className="px-6 py-4" style={{ borderBottom: "1px solid #E2E8E4" }}>
            <h2 className="font-semibold" style={{ color: "#102019" }}>Recent Activity Alerts</h2>
          </div>
          <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
            {notifications.map((n, i) => {
              const color = n.type === "success" ? "#35C47A" : n.type === "warning" ? "#C17F33" : "#336AC1";
              return (
                <div key={i} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm mb-1" style={{ color: "#102019" }}>{n.msg}</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
