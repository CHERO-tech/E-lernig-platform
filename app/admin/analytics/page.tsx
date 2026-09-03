"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BarChart3, Users, BookOpen, DollarSign, TrendingUp, Activity } from "lucide-react";
import { useState } from "react";

function AdminAnalyticsContent() {
  const [timeRange, setTimeRange] = useState("30d");

  const platformStats = [
    { label: "Total Revenue", value: "$485,320", change: "+24%", icon: DollarSign, color: "green" },
    { label: "Active Users", value: "12,845", change: "+18%", icon: Users, color: "blue" },
    { label: "Enrolled Courses", value: "8,934", change: "+42%", icon: BookOpen, color: "purple" },
    { label: "Platform Health", value: "99.8%", change: "+0.2%", icon: Activity, color: "yellow" },
  ];

  const userDemographics = [
    { role: "Students", count: 7850, percentage: 61 },
    { role: "Trainers", count: 2120, percentage: 16 },
    { role: "Companies", count: 1240, percentage: 10 },
    { role: "Schools", count: 845, percentage: 7 },
    { role: "Guardians", count: 790, percentage: 6 },
  ];

  const courseMetrics = [
    { category: "Web Development", courses: 245, students: 3420, revenue: "$128,750" },
    { category: "Data Science", courses: 189, students: 2810, revenue: "$105,375" },
    { category: "Design", courses: 156, students: 2145, revenue: "$80,438" },
    { category: "Networking", courses: 134, students: 1890, revenue: "$70,875" },
    { category: "Mobile Dev", courses: 128, students: 1670, revenue: "$62,625" },
  ];

  const monthlyTrend = [
    { month: "Jan", users: 8200, courses: 4500, revenue: 156000 },
    { month: "Feb", users: 9100, courses: 5200, revenue: 172000 },
    { month: "Mar", users: 10400, courses: 6800, revenue: 198000 },
    { month: "Apr", users: 11250, courses: 7500, revenue: 234000 },
    { month: "May", users: 12100, courses: 8200, revenue: 278000 },
    { month: "Jun", users: 12845, courses: 8934, revenue: 318000 },
  ];

  const colorMap: {[key: string]: string} = {
    green: "text-green-600 bg-green-50",
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 size={32} className="text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
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
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colors}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <p className="text-green-600 text-sm font-medium">{stat.change} this period</p>
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">User Demographics</h3>
            <div className="space-y-4">
              {userDemographics.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.role}</p>
                      <p className="text-xs text-gray-500">{item.count.toLocaleString()} users</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{item.percentage}%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Growth Trend (6 months)</h3>
            <div className="space-y-6">
              {monthlyTrend.map((item, i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">{item.month}</p>
                    <span className="text-xs font-semibold text-green-600">${(item.revenue / 1000).toFixed(0)}K</span>
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
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Courses</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Enrolled</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Share</th>
                </tr>
              </thead>
              <tbody>
                {courseMetrics.map((metric, i) => {
                  const totalRevenue = courseMetrics.reduce((sum, m) => sum + parseFloat(m.revenue.replace(/[$,]/g, "")), 0);
                  const share = ((parseFloat(metric.revenue.replace(/[$,]/g, "")) / totalRevenue) * 100).toFixed(1);
                  return (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{metric.category}</td>
                      <td className="py-4 px-4 text-right text-gray-600">{metric.courses}</td>
                      <td className="py-4 px-4 text-right text-gray-600">{metric.students.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-semibold text-green-600">{metric.revenue}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600"
                              style={{ width: `${share}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-900 font-medium w-10 text-right">{share}%</span>
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
          className="bg-green-50 border border-green-200 rounded-lg p-6"
        >
          <h3 className="font-bold text-green-900 mb-2">System Health Status</h3>
          <p className="text-sm text-green-800">All systems operational • API response time: 124ms • Database load: 34% • Storage: 62% used</p>
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
