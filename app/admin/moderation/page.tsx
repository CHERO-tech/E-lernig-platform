"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, CheckCircle, XCircle, Eye, Flag } from "lucide-react";
import { useState } from "react";

function ModerationContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [reports, setReports] = useState([
    { id: 1, type: "Comment", content: "Inappropriate language in course review", reporter: "Alex Johnson", reported: "5 hours ago", status: "pending" as const },
    { id: 2, type: "User Profile", content: "Suspicious profile picture", reporter: "Sarah Chen", reported: "1 day ago", status: "pending" as const },
    { id: 3, type: "Course Content", content: "Copyright violation claim", reporter: "Admin Team", reported: "2 days ago", status: "reviewing" as const },
    { id: 4, type: "Comment", content: "Hate speech detected", reporter: "System Auto", reported: "3 days ago", status: "resolved" as const },
    { id: 5, type: "User Profile", content: "Fake credentials in bio", reporter: "Mike Davis", reported: "4 days ago", status: "resolved" as const },
  ]);

  const [suspiciousActivities, setSuspiciousActivities] = useState([
    { id: 1, user: "John Doe", activity: "Multiple failed login attempts", risk: "High", detected: "2 hours ago" },
    { id: 2, user: "Jane Smith", activity: "Unusual course enrollment pattern", risk: "Medium", detected: "5 hours ago" },
    { id: 3, user: "Bob Wilson", activity: "Large file upload attempts", risk: "High", detected: "1 day ago" },
    { id: 4, user: "Alice Brown", activity: "Rapid course completion", risk: "Low", detected: "2 days ago" },
  ]);

  const [blockedContent, setBlockedContent] = useState([
    { id: 1, content: "Adult material link in course description", user: "User123", blocked: "3 days ago", reason: "Policy Violation" },
    { id: 2, content: "Malware detection in download link", user: "User456", blocked: "5 days ago", reason: "Security" },
    { id: 3, content: "Spam course promotion", user: "User789", blocked: "1 week ago", reason: "Spam" },
  ]);

  const toggleSelect = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const approveReport = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' as const } : r));
    setSelectedItems(prev => prev.filter(i => i !== id));
  };

  const markReviewing = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'reviewing' as const } : r));
  };

  const removeReport = (id: number) => {
    setReports(prev => prev.filter(r => r.id !== id));
    setSelectedItems(prev => prev.filter(i => i !== id));
  };

  const investigate = (id: number) => {
    setSuspiciousActivities(prev =>
      prev.map(a => a.id === id ? { ...a, risk: 'High' } : a)
    );
  };

  const dismissActivity = (id: number) => {
    setSuspiciousActivities(prev => prev.filter(a => a.id !== id));
  };

  const unblock = (id: number) => {
    setBlockedContent(prev => prev.filter(c => c.id !== id));
  };

  const permanentlyDelete = (id: number) => {
    setBlockedContent(prev => prev.filter(c => c.id !== id));
  };

  const bulkApprove = () => {
    setReports(prev =>
      prev.map(r =>
        selectedItems.includes(r.id) ? { ...r, status: 'resolved' as const } : r
      )
    );
    setSelectedItems([]);
  };

  const bulkReject = () => {
    setReports(prev => prev.filter(r => !selectedItems.includes(r.id)));
    setSelectedItems([]);
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      High: "bg-red-100 text-red-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Low: "bg-forge-soft text-ember2",
    };
    return colors[risk] || colors.Low;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      reviewing: "bg-blue-50 text-blue-700 border-blue-200",
      resolved: "bg-forge-soft text-ember2 border-brass-soft",
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Go back">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
            <p className="text-gray-600">Review and manage reported content and suspicious activities</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 border-b border-gray-200"
        >
          {["reports", "suspicious", "blocked"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-medium transition-colors capitalize border-b-2 ${
                activeTab === tab
                  ? "text-ember-strong border-ember-strong"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {tab === "reports" ? "User Reports" : tab === "suspicious" ? "Suspicious Activity" : "Blocked Content"}
            </button>
          ))}
        </motion.div>

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {reports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4 items-start">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(report.id)}
                    onChange={() => toggleSelect(report.id)}
                    className="mt-1 w-5 h-5 accent-ember-strong"
                    aria-label={`Select report: ${report.type}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex gap-2 items-center mb-1">
                          <Flag size={18} className="text-red-600" />
                          <span className="font-bold text-gray-900">{report.type}</span>
                        </div>
                        <p className="text-gray-600">{report.content}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(report.status)} capitalize`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500 mt-3">
                      <span>Reported by: {report.reporter}</span>
                      <span>{report.reported}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => markReviewing(report.id)}
                      className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                      title="Review"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => approveReport(report.id)}
                      className="p-2 hover:bg-forge-soft rounded-lg text-ember-strong" title="Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => removeReport(report.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-red-600" title="Remove">
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Suspicious Activity Tab */}
        {activeTab === "suspicious" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {suspiciousActivities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{activity.user}</p>
                    <p className="text-gray-600 text-sm mt-1">{activity.activity}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(activity.risk)}`}>
                    {activity.risk} Risk
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Detected: {activity.detected}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => investigate(activity.id)}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                      Investigate
                    </button>
                    <button
                      onClick={() => dismissActivity(activity.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Blocked Content Tab */}
        {activeTab === "blocked" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {blockedContent.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{item.content}</p>
                    <p className="text-gray-600 text-sm mt-1">Posted by: {item.user}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {item.reason}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Blocked: {item.blocked}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => unblock(item.id)}
                      className="px-3 py-1 bg-forge-soft text-ember-strong rounded-lg text-sm font-medium hover:bg-forge-soft">
                      Unblock
                    </button>
                    <button
                      onClick={() => permanentlyDelete(item.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100">
                      Permanently Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 bg-white rounded-lg border border-gray-200 p-4 shadow-lg"
          >
            <p className="text-sm text-gray-600 mb-3">{selectedItems.length} item(s) selected</p>
            <div className="flex gap-2">
              <button
                onClick={bulkApprove}
                className="px-4 py-2 bg-forge-soft text-ember-strong rounded-lg text-sm font-medium hover:bg-forge-soft">
                Approve
              </button>
              <button
                onClick={bulkReject}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100">
                Reject
              </button>
              <button onClick={() => setSelectedItems([])} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function AdminModeration() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ModerationContent />
    </ProtectedRoute>
  );
}
