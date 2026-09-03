"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BarChart3, TrendingUp, Users, DollarSign, Clock, Star } from "lucide-react";
import { useState } from "react";

function AnalyticsContent() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    { label: "Total Revenue", value: "$12,450", change: "+12%", icon: DollarSign, color: "green" },
    { label: "Active Students", value: "342", change: "+8%", icon: Users, color: "blue" },
    { label: "Avg. Course Rating", value: "4.7/5", change: "+0.3", icon: Star, color: "yellow" },
    { label: "Avg. Completion", value: "78%", change: "+5%", icon: TrendingUp, color: "purple" },
  ];

  const coursePerformance = [
    { id: 1, title: "Advanced React Patterns", students: 128, revenue: "$3,840", rating: 4.8, completion: 82 },
    { id: 2, title: "Web Dev Fundamentals", students: 95, revenue: "$2,850", rating: 4.6, completion: 71 },
    { id: 3, title: "UI/UX Design", students: 67, revenue: "$2,010", rating: 4.9, completion: 85 },
    { id: 4, title: "Python for Data Science", students: 52, revenue: "$1,560", rating: 4.5, completion: 69 },
  ];

  const studentEngagement = [
    { week: "Week 1", active: 280, new: 45 },
    { week: "Week 2", active: 310, new: 58 },
    { week: "Week 3", active: 295, new: 42 },
    { week: "Week 4", active: 342, new: 62 },
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
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
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
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => {
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

        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Rating</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Completion</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{course.title}</td>
                    <td className="py-4 px-4 text-right text-gray-600">{course.students}</td>
                    <td className="py-4 px-4 text-right font-semibold text-green-600">{course.revenue}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900 font-medium">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600"
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900 font-medium w-8 text-right">{course.completion}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Student Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Student Engagement Trend</h3>
            <div className="space-y-4">
              {studentEngagement.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">{item.week}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.active} active</p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                      style={{ width: `${(item.active / 350) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.new} new students</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Breakdown</h3>
            <div className="space-y-4">
              {[
                { name: "Subscriptions", value: 45, amount: "$5,605" },
                { name: "One-time Purchases", value: 35, amount: "$4,338" },
                { name: "Certificates", value: 20, amount: "$2,507" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">{item.name}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.amount}</p>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <ProtectedRoute requiredRole="trainer">
      <AnalyticsContent />
    </ProtectedRoute>
  );
}
