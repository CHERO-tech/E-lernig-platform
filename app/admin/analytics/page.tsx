"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { usePeople } from "@/lib/people/usePeople";
import { useCourses } from "@/lib/courses/useCourses";
import { BarChart3, Users, BookOpen, DollarSign, Activity, ArrowLeft, Download } from "lucide-react";
import { useState } from "react";

function AdminAnalyticsContent() {
  const [timeRange, setTimeRange] = useState("30d");
  const { people } = usePeople();
  const { courses } = useCourses();

  const totalRevenue = courses.reduce((sum, c) => sum + (c.price * c.students), 0);
  const activeUsers = people.filter(p => p.status === 'active').length;

  const platformStats = [
    { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}k`, change: "+24%", icon: DollarSign, color: "green" },
    { label: "Active Users", value: activeUsers.toString(), change: "+18%", icon: Users, color: "blue" },
    { label: "Total Courses", value: courses.length.toString(), change: "+42%", icon: BookOpen, color: "purple" },
    { label: "Platform Health", value: "99.8%", change: "+0.2%", icon: Activity, color: "yellow" },
  ];

  const roleBreakdown = [
    { role: "Students", count: people.filter(p => p.role === 'student').length },
    { role: "Trainers", count: people.filter(p => p.role === 'trainer').length },
    { role: "Companies", count: people.filter(p => p.role === 'company').length },
    { role: "Schools", count: people.filter(p => p.role === 'school').length },
    { role: "Guardians", count: people.filter(p => p.role === 'guardian').length },
  ];
  const totalRoles = roleBreakdown.reduce((sum, r) => sum + r.count, 0);
  const userDemographics = roleBreakdown.map(r => ({
    ...r,
    percentage: totalRoles > 0 ? Math.round((r.count / totalRoles) * 100) : 0,
  }));

  const courseMetrics = courses.map(c => ({
    category: c.title,
    courses: 1,
    students: c.students,
    revenue: `$${(c.price * c.students).toLocaleString()}`,
  }));

  const monthlyTrend = [
    { month: "Jan", users: 8200, courses: 4500, revenue: 156000 },
    { month: "Feb", users: 9100, courses: 5200, revenue: 172000 },
    { month: "Mar", users: 10400, courses: 6800, revenue: 198000 },
    { month: "Apr", users: 11250, courses: 7500, revenue: 234000 },
    { month: "May", users: 12100, courses: 8200, revenue: 278000 },
    { month: "Jun", users: 12845, courses: 8934, revenue: 318000 },
  ];

  const handleExport = () => {
    const header = ["Category", "Courses", "Enrolled", "Revenue"];
    const rows = courseMetrics.map((m) => [m.category, m.courses, m.students, m.revenue.replace(/[$,]/g, "")]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `forge-course-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const colorMap: {[key: string]: string} = {
    green: "text-ember-strong bg-forge-soft",
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className="min-h-screen bg-ow">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-mg hover:text-dt transition-colors mb-3">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 size={32} className="text-ember-strong" />
              <h1 className="text-3xl font-bold text-dt">Platform Analytics</h1>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                aria-label="Time range"
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-border rounded-lg font-medium text-sm text-dt hover:bg-ow flex items-center gap-2"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {platformStats.map((stat, i) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color];
            return (
              <div key={i} className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-mg text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-dt">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colors}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <p className="text-ember-strong text-sm font-medium">{stat.change} this period</p>
              </div>
            );
          })}
        </motion.div>

        {/* User Demographics & Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* User Demographics */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-xl font-bold text-dt mb-6">User Demographics</h3>
            <div className="space-y-4">
              {userDemographics.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-dt">{item.role}</p>
                      <p className="text-xs text-mg">{item.count.toLocaleString()} users</p>
                    </div>
                    <p className="text-sm font-semibold text-dt">{item.percentage}%</p>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-ember-strong to-ember"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-xl font-bold text-dt mb-6">Growth Trend (6 months)</h3>
            <div className="space-y-6">
              {monthlyTrend.map((item, i) => (
                <div key={i} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-dt">{item.month}</p>
                    <span className="text-xs font-semibold text-ember-strong">${(item.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 h-3 bg-blue-200 rounded-sm" style={{ width: `${(item.users / 13000) * 100}%` }}></div>
                    <div className="flex-1 h-3 bg-purple-200 rounded-sm" style={{ width: `${(item.courses / 9000) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Course Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-border p-6"
        >
          <h2 className="text-2xl font-bold text-dt mb-6">Category Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dt">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-dt">Courses</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-dt">Enrolled</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-dt">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-dt">Share</th>
                </tr>
              </thead>
              <tbody>
                {courseMetrics.map((metric, i) => {
                  const totalRevenue = courseMetrics.reduce((sum, m) => sum + parseFloat(m.revenue.replace(/[$,]/g, "")), 0);
                  const share = ((parseFloat(metric.revenue.replace(/[$,]/g, "")) / totalRevenue) * 100).toFixed(1);
                  return (
                    <tr key={i} className="border-b border-border hover:bg-ow">
                      <td className="py-4 px-4 font-medium text-dt">{metric.category}</td>
                      <td className="py-4 px-4 text-right text-mg">{metric.courses}</td>
                      <td className="py-4 px-4 text-right text-mg">{metric.students.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-semibold text-ember-strong">{metric.revenue}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-ember-strong"
                              style={{ width: `${share}%` }}
                            ></div>
                          </div>
                          <span className="text-dt font-medium w-10 text-right">{share}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* System Health Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-forge-soft border border-brass-soft rounded-lg p-6"
        >
          <h3 className="font-bold text-ember-strong mb-2">System Health Status</h3>
          <p className="text-sm text-ember-strong">All systems operational • API response time: 124ms • Database load: 34% • Storage: 62% used</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminAnalyticsContent />
    </ProtectedRoute>
  );
}
