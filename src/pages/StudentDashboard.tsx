import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Card, Badge, StatCard } from "../components/ui";

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "current-course", label: "Current Course", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
  { key: "courses", label: "My Courses", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "paths", label: "Learning Paths", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { key: "projects", label: "Projects", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> },
  { key: "certificates", label: "Certificates", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg> },
  { key: "portfolio", label: "Portfolio", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg> },
  { key: "notifications", label: "Notifications", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
];

const enrolledCourses = [
  { id: "web-dev", title: "Web Development", instructor: "Emmanuel Nkurunziza", progress: 72, lessons: 18, total: 25, rating: 4.8, enrolled: 342, next: "DOM Manipulation" },
  { id: "networking", title: "Networking Fundamentals", instructor: "Patrick Habimana", progress: 45, lessons: 9, total: 20, rating: 4.7, enrolled: 198, next: "IP Subnetting" },
  { id: "ui-ux", title: "UI/UX Design", instructor: "Grace Mukamana", progress: 30, lessons: 6, total: 20, rating: 4.9, enrolled: 287, next: "Wireframing Basics" },
];

const myProjects = [
  { title: "Portfolio Website", track: "Software Dev", status: "In Progress", deadline: "Sep 20, 2026", skills: ["HTML", "CSS", "JS"] },
  { title: "Office Network Design", track: "Networking", status: "Under Review", deadline: "Sep 15, 2026", skills: ["Cisco", "VLAN"] },
  { title: "Brand Identity", track: "Multimedia", status: "Completed", deadline: "Sep 1, 2026", skills: ["Figma"] },
];

const skillData = [
  { skill: "Frontend", A: 75 },
  { skill: "Backend", A: 42 },
  { skill: "Database", A: 58 },
  { skill: "Networking", A: 48 },
  { skill: "UI/UX", A: 65 },
];

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.5 },
  { day: "Wed", hours: 3.0 },
  { day: "Thu", hours: 2.0 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 1.0 },
];

export default function StudentDashboard() {
  const [activeKey, setActiveKey] = useState("dashboard");

  return (
    <DashboardLayout
      role="student"
      roleLabel="Student"
      navItems={navItems}
      activeKey={activeKey}
      onNav={(k) => {
        setActiveKey(k);
        if (k === "notifications") window.location.href = "/notifications";
        if (k === "current-course") window.location.href = "/current-course";
        if (k === "courses") window.location.href = "/courses?role=student&userName=Amahoro+Jean+de+Dieu&userInitials=AJ";
        if (k === "paths") window.location.href = "/learning-paths?role=student&userName=Amahoro+Jean+de+Dieu&userInitials=AJ";
        if (k === "certificates") window.location.href = "/certificate";
        if (k === "projects") window.location.href = "/projects";
        if (k === "portfolio") window.location.href = "/portfolio/1";
      }}
      userName="Amahoro Jean de Dieu"
      userInitials="AJ"
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ whoami — student</p>
            <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Good morning, Amahoro.</h1>
            <p style={{ color: "#606C66" }}>Continue building your skills.</p>
          </div>
          <Link to="/notifications" className="w-9 h-9 rounded-lg flex items-center justify-center relative" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#606C66" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "#35C47A", color: "#071C12" }}>3</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Courses Enrolled" value="3" />
          <StatCard label="Courses Completed" value="1" />
          <StatCard label="Projects Completed" value="1" />
          <StatCard label="Certificates Earned" value="1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #E2E8E4" }}>
                <h2 className="font-semibold" style={{ color: "#102019" }}>Continue Learning</h2>
                <Link to="/courses?role=student&userName=Amahoro+Jean+de+Dieu&userInitials=AJ" className="font-mono text-xs" style={{ color: "#1F7A4B" }}>View all →</Link>
              </div>
              <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
                {enrolledCourses.map((course) => (
                  <Link key={course.id} to={`/courses/${course.id}?role=student&userName=Amahoro+Jean+de+Dieu&userInitials=AJ`} className="block hover:bg-surface transition-colors">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0" style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}>
                          {course.title[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm" style={{ color: "#102019" }}>{course.title}</p>
                            <div className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#35C47A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                              <span className="font-mono text-xs" style={{ color: "#1F7A4B" }}>{course.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs mb-3" style={{ color: "#606C66" }}>
                            {course.instructor} • {course.enrolled.toLocaleString()} enrolled
                          </p>
                          <p className="font-mono text-xs mb-3" style={{ color: "#606C66" }}>
                            Next: {course.next} · {course.lessons}/{course.total} lessons
                          </p>
                          <div className="h-1.5 rounded-full mb-3" style={{ background: "#E2E8E4" }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, background: "#35C47A" }} />
                          </div>
                          <p className="font-mono text-xs" style={{ color: "#1F7A4B" }}>{course.progress}% complete</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Weekly activity */}
            <div className="mt-5 rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <h2 className="font-semibold mb-5" style={{ color: "#102019" }}>Weekly Learning Activity</h2>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={weeklyData} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" }} axisLine={false} tickLine={false} unit="h" />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 }} formatter={(v) => [`${v}h`, "Learning"]} />
                  <Bar dataKey="hours" fill="#35C47A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Skill radar */}
            <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <h2 className="font-semibold mb-4" style={{ color: "#102019" }}>Skill Progress</h2>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={skillData}>
                  <PolarGrid stroke="#E2E8E4" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "#606C66" }} />
                  <Radar name="Skills" dataKey="A" stroke="#35C47A" fill="#35C47A" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Projects */}
            <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E2E8E4" }}>
                <h2 className="font-semibold" style={{ color: "#102019" }}>My Projects</h2>
                <Link to="/projects" className="font-mono text-xs" style={{ color: "#1F7A4B" }}>All →</Link>
              </div>
              <div className="divide-y" style={{ borderColor: "#E2E8E4" }}>
                {myProjects.map((proj) => (
                  <div key={proj.title} className="p-4 hover:bg-surface">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm" style={{ color: "#102019" }}>{proj.title}</p>
                      <Badge tone={proj.status === "Completed" ? "success" : proj.status === "Under Review" ? "warning" : "brand"} mono>
                        {proj.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.skills.map((s) => (
                        <span key={s} className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "#F5F7F5", color: "#606C66" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Take Assessment", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="12" x2="8" y2="12" /><line x1="12" y1="16" x2="8" y2="16" /></svg>, href: "/assessment" },
                { label: "View Certificate", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M12 2L8 8H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8H16L12 2Z" /><path d="M12 11L14 15H10L12 11Z" /></svg>, href: "/certificate" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="p-4 rounded-xl text-center transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-200"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8E4", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                >
                  <div className="mb-2 flex justify-center">{item.icon}</div>
                  <p className="text-xs font-semibold" style={{ color: "#102019" }}>{item.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
