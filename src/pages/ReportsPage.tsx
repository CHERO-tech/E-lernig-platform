import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import { Card, StatCard, colors } from "../components/ui";
import { navItems as trainerNavItems } from "./TrainerDashboard";
import { navItems as schoolAdminNavItems } from "./SchoolAdminDashboard";
import { navItems as platformAdminNavItems } from "./PlatformAdminDashboard";
import { growthData, certData } from "./PlatformAdminDashboard";
import { completionData } from "./TrainerDashboard";

const roleConfig: Record<
  string,
  { roleLabel: string; navItems: typeof trainerNavItems; dashboardHref: string; subtitle: string; activeKey: string }
> = {
  trainer: {
    roleLabel: "Trainer",
    navItems: trainerNavItems,
    dashboardHref: "/trainer",
    subtitle: "Your courses' performance over time",
    activeKey: "analytics",
  },
  "school-admin": {
    roleLabel: "School Admin",
    navItems: schoolAdminNavItems,
    dashboardHref: "/school-admin",
    subtitle: "Your institution's performance over time",
    activeKey: "reports",
  },
  admin: {
    roleLabel: "Platform Admin",
    navItems: platformAdminNavItems,
    dashboardHref: "/admin",
    subtitle: "Platform-wide performance over time",
    activeKey: "reports",
  },
};

const chartTick = { fontSize: 11, fontFamily: "JetBrains Mono", fill: "#606C66" };
const tooltipStyle = { background: "#FFFFFF", border: "1px solid #E2E8E4", borderRadius: 8, fontFamily: "JetBrains Mono", fontSize: 12 };

export default function ReportsPage() {
  const [params] = useSearchParams();
  const role = params.get("role") ?? "admin";
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";
  const config = roleConfig[role] ?? roleConfig.admin;

  const [activeKey, setActiveKey] = useState(config.activeKey);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = config.dashboardHref;
  };

  const latest = growthData[growthData.length - 1];
  const latestCerts = certData[certData.length - 1];
  const avgCompletion = Math.round(completionData.reduce((sum, c) => sum + c.rate, 0) / completionData.length);

  return (
    <DashboardLayout
      role={role}
      roleLabel={config.roleLabel}
      navItems={config.navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName={userName}
      userInitials={userInitials}
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./reports --generate</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Reports & Analytics</h1>
          <p style={{ color: "#606C66" }}>{config.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Students" value={latest.students.toLocaleString()} />
          <StatCard label="Monthly Revenue" value={`RWF ${(latest.revenue / 1000000).toFixed(1)}M`} />
          <StatCard label="Certificates This Month" value={latestCerts.certs} />
          <StatCard label="Avg Completion Rate" value={`${avgCompletion}%`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="terminal" title="Student Growth">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="reportsStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart1} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors.chart1} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                <XAxis dataKey="month" tick={chartTick} axisLine={false} tickLine={false} />
                <YAxis tick={chartTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="students" stroke={colors.chart1} fill="url(#reportsStudents)" strokeWidth={2.5} name="Students" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card variant="terminal" title="Revenue Trend">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="reportsRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart2} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={colors.chart2} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                <XAxis dataKey="month" tick={chartTick} axisLine={false} tickLine={false} />
                <YAxis tick={chartTick} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`RWF ${(Number(v) / 1000000).toFixed(1)}M`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke={colors.chart2} fill="url(#reportsRevenue)" strokeWidth={2.5} name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card variant="terminal" title="Certificates Issued">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={certData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                <XAxis dataKey="month" tick={chartTick} axisLine={false} tickLine={false} />
                <YAxis tick={chartTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="certs" fill={colors.chart3} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card variant="terminal" title="Course Completion Rates">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" vertical={false} />
                <XAxis dataKey="course" tick={chartTick} axisLine={false} tickLine={false} />
                <YAxis tick={chartTick} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Completion"]} />
                <Bar dataKey="rate" fill={colors.pg2} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
