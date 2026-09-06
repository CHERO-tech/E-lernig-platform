import { useState } from "react";
import { Link } from "react-router-dom";

const allNotifications = [
  { id: 1, type: "success", title: "Certificate Issued", msg: "Your Web Development certificate is ready. Download it now.", time: "2 hours ago", read: false, action: { label: "View Certificate", href: "/certificate" } },
  { id: 2, type: "info", title: "Assignment Reviewed", msg: "Your Portfolio Website submission has been reviewed by Emmanuel Nkurunziza.", time: "5 hours ago", read: false, action: { label: "View Feedback", href: "/projects" } },
  { id: 3, type: "success", title: "Assessment Passed", msg: "You scored 92% on the Web Development assessment. Well done!", time: "1 day ago", read: false, action: { label: "View Results", href: "/assessment" } },
  { id: 4, type: "info", title: "New Course Available", msg: "Mobile Development with React Native is now available on the platform.", time: "2 days ago", read: true, action: { label: "Explore Course", href: "/courses" } },
  { id: 5, type: "warning", title: "Assignment Due Soon", msg: "Your Networking project is due in 3 days. Make sure to submit before the deadline.", time: "3 days ago", read: true, action: { label: "Go to Project", href: "/projects" } },
  { id: 6, type: "success", title: "Payment Successful", msg: "Your Professional Plan subscription has been renewed for October 2026.", time: "1 week ago", read: true, action: null },
  { id: 7, type: "info", title: "Mentor Session Scheduled", msg: "Your 1:1 mentor session with Emmanuel is confirmed for September 12 at 10:00 AM.", time: "1 week ago", read: true, action: null },
  { id: 8, type: "warning", title: "Inactivity Alert", msg: "You haven't logged in for 7 days. Keep up your learning streak!", time: "2 weeks ago", read: true, action: { label: "Resume Learning", href: "/courses" } },
];

const typeIcon = (type: string) => {
  if (type === "success") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  );
  if (type === "warning") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /></svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
  );
};

const typeColor = (type: string) => {
  if (type === "success") return { bg: "rgba(53,196,122,0.08)", icon: "rgba(53,196,122,0.12)" };
  if (type === "warning") return { bg: "rgba(217,119,6,0.06)", icon: "rgba(217,119,6,0.12)" };
  return { bg: "rgba(59,130,246,0.06)", icon: "rgba(59,130,246,0.12)" };
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id: number) => setNotifications((n) => n.map((x) => x.id === id ? { ...x, read: true } : x));

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="min-h-screen" style={{ background: "#F5F7F5" }}>
      {/* Header */}
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-2xl mx-auto px-8 py-3">
          <Link to="/student" className="text-sm font-medium" style={{ color: "#35C47A" }}>
            ← Back to Dashboard
          </Link>
        </div>
        <div className="max-w-2xl mx-auto px-8 py-7">
          <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>$ notifications --list</p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}>Notifications</h1>
              {unreadCount > 0 && (
                <p className="font-mono text-sm mt-1" style={{ color: "#718078" }}>
                  <span style={{ color: "#35C47A" }}>{unreadCount}</span> unread
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{ background: "rgba(53,196,122,0.1)", color: "#35C47A", border: "1px solid rgba(53,196,122,0.2)" }}
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={{
                background: filter === f ? "#35C47A" : "#FFFFFF",
                color: filter === f ? "#071C12" : "#718078",
                border: `1px solid ${filter === f ? "#35C47A" : "#E2E8E4"}`,
              }}
            >
              {f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(53,196,122,0.08)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /></svg>
              </div>
              <p className="font-semibold" style={{ color: "#102019" }}>All caught up!</p>
              <p className="text-sm mt-1" style={{ color: "#718078" }}>No unread notifications.</p>
            </div>
          ) : (
            filtered.map((n) => {
              const tc = typeColor(n.type);
              return (
                <div
                  key={n.id}
                  className="rounded-xl p-5 transition-all hover:shadow-sm"
                  style={{
                    background: n.read ? "#FFFFFF" : tc.bg,
                    border: `1px solid ${n.read ? "#E2E8E4" : "rgba(53,196,122,0.12)"}`,
                  }}
                  onClick={() => markRead(n.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: tc.icon }}
                    >
                      {typeIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm" style={{ color: "#102019" }}>{n.title}</p>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#35C47A" }} />
                        )}
                      </div>
                      <p className="text-sm leading-relaxed mb-2" style={{ color: "#718078" }}>{n.msg}</p>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs" style={{ color: "#718078" }}>{n.time}</span>
                        {n.action && (
                          <Link
                            to={n.action.href}
                            className="font-mono text-xs font-semibold"
                            style={{ color: "#35C47A" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {n.action.label} →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="text-center mt-8">
          <Link to="/student" className="font-mono text-sm" style={{ color: "#718078" }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
