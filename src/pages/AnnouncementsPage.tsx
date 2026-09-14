import { useState, type FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Button, Input, Select, Textarea, StatCard } from "../components/ui";
import { navItems } from "./TrainerDashboard";

interface Announcement {
  subject: string;
  audience: string;
  message: string;
  date: string;
}

const audiences = ["All My Students", "Web Development", "Database Systems"];

const seedAnnouncements: Announcement[] = [
  {
    subject: "Module 3 Quiz deadline extended",
    audience: "Web Development",
    message: "Hi everyone, I've extended the Module 03 Quiz deadline to Friday to give you more time to review JavaScript fundamentals.",
    date: "2026-08-20",
  },
  {
    subject: "New office hours starting this week",
    audience: "All My Students",
    message: "I'll be holding office hours every Wednesday 2-4pm for anyone who wants extra help with assignments.",
    date: "2026-08-05",
  },
  {
    subject: "Great work on the Dashboard project!",
    audience: "Web Development",
    message: "Really impressed with the Styling a Dashboard submissions this week — keep it up.",
    date: "2026-07-10",
  },
];

export default function AnnouncementsPage() {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [announcements, setAnnouncements] = useState<Announcement[]>(seedAnnouncements);
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState(audiences[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/trainer";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    setAnnouncements((prev) => [{ subject, audience, message, date: today }, ...prev]);
    setSubject("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <DashboardLayout
      role="trainer"
      roleLabel="Trainer"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="Emmanuel Nkurunziza"
      userInitials="EN"
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ./send-announcement --compose</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Announcements</h1>
          <p style={{ color: "#606C66" }}>Send updates to your students</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Sent" value={announcements.length} />
          <StatCard label="Audiences" value={new Set(announcements.map((a) => a.audience)).size} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="terminal" padding="lg" title="Compose">
            <form onSubmit={handleSubmit}>
              <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              <Select
                label="Send To"
                options={audiences.map((a) => ({ value: a, label: a }))}
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
              <Textarea
                label="Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" variant="primary">{sent ? "✓ Sent" : "Send Announcement"}</Button>
            </form>
          </Card>

          <Card variant="terminal" padding="none" title="Sent Announcements">
            <div className="divide-y divide-border">
              {announcements.map((a, i) => (
                <div key={`${a.subject}-${i}`} className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold" style={{ color: "#102019" }}>{a.subject}</p>
                    <p className="font-mono text-xs" style={{ color: "#606C66" }}>{a.date}</p>
                  </div>
                  <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>{a.audience}</p>
                  <p className="text-sm" style={{ color: "#606C66" }}>{a.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
