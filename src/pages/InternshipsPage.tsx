import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, EmptyState } from "../components/ui";
import { navItems } from "./CompanyPortal";

interface Internship {
  role: string;
  track: string;
  duration: string;
  applicants: number;
  status: "Open" | "Filled" | "Closed";
  posted: string;
}

const internships: Internship[] = [
  { role: "Frontend Developer Intern", track: "Software Dev", duration: "3 months", applicants: 8, status: "Open", posted: "2026-08-15" },
  { role: "Backend Developer Intern", track: "Software Dev", duration: "3 months", applicants: 12, status: "Open", posted: "2026-08-10" },
  { role: "DevOps Intern", track: "Networking", duration: "2 months", applicants: 4, status: "Open", posted: "2026-08-20" },
  { role: "Full-Stack Developer Intern", track: "Software Dev", duration: "6 months", applicants: 15, status: "Filled", posted: "2026-06-01" },
  { role: "QA / Testing Intern", track: "Software Dev", duration: "3 months", applicants: 6, status: "Open", posted: "2026-09-01" },
  { role: "Mobile Developer Intern", track: "Software Dev", duration: "4 months", applicants: 3, status: "Closed", posted: "2026-05-10" },
];

const statusTone: Record<Internship["status"], "success" | "info" | "neutral"> = {
  Open: "success",
  Filled: "info",
  Closed: "neutral",
};

export default function InternshipsPage() {
  const [activeKey, setActiveKey] = useState("internships");
  const [search, setSearch] = useState("");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/company";
  };

  const filtered = internships.filter(
    (i) => i.role.toLowerCase().includes(search.toLowerCase()) || i.track.toLowerCase().includes(search.toLowerCase())
  );

  const openCount = internships.filter((i) => i.status === "Open").length;
  const filledCount = internships.filter((i) => i.status === "Filled").length;
  const totalApplicants = internships.reduce((sum, i) => sum + i.applicants, 0);

  return (
    <DashboardLayout
      role="company"
      roleLabel="Company"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName="TechRwanda Ltd"
      userInitials="TR"
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./internships --posted</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Internships</h1>
          <p style={{ color: "#606C66" }}>Manage your posted internship opportunities</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Postings" value={internships.length} />
          <StatCard label="Open" value={openCount} />
          <StatCard label="Filled" value={filledCount} />
          <StatCard label="Total Applicants" value={totalApplicants} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by role or track..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No internships found" description="Try a different role or track." />
        ) : (
          <Card variant="terminal" padding="none" title="Posted Internships">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Role", "Track", "Duration", "Applicants", "Posted", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((i, idx) => (
                  <tr key={i.role} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5 text-sm font-medium" style={{ color: "#102019" }}>{i.role}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{i.track}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{i.duration}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{i.applicants}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{i.posted}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={statusTone[i.status]} mono>
                        {i.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
