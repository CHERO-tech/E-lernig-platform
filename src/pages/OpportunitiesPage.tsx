import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, EmptyState } from "../components/ui";
import { navItems } from "./CompanyPortal";

interface Opportunity {
  role: string;
  track: string;
  type: "Full-time" | "Contract";
  salary: string;
  applicants: number;
  status: "Open" | "Filled" | "Closed";
  posted: string;
}

const opportunities: Opportunity[] = [
  { role: "Junior Frontend Developer", track: "Software Dev", type: "Full-time", salary: "RWF 350K–450K/mo", applicants: 14, status: "Open", posted: "2026-08-25" },
  { role: "Backend Engineer", track: "Software Dev", type: "Full-time", salary: "RWF 500K–650K/mo", applicants: 9, status: "Open", posted: "2026-08-18" },
  { role: "Network Administrator", track: "Networking", type: "Full-time", salary: "RWF 400K–500K/mo", applicants: 5, status: "Open", posted: "2026-09-02" },
  { role: "UI/UX Designer", track: "Multimedia", type: "Contract", salary: "RWF 300K–380K/mo", applicants: 7, status: "Filled", posted: "2026-07-10" },
  { role: "DevOps Engineer", track: "Networking", type: "Full-time", salary: "RWF 550K–700K/mo", applicants: 3, status: "Open", posted: "2026-09-05" },
  { role: "QA Engineer", track: "Software Dev", type: "Full-time", salary: "RWF 380K–450K/mo", applicants: 6, status: "Closed", posted: "2026-06-15" },
];

const statusTone: Record<Opportunity["status"], "success" | "info" | "neutral"> = {
  Open: "success",
  Filled: "info",
  Closed: "neutral",
};

export default function OpportunitiesPage() {
  const [activeKey, setActiveKey] = useState("opportunities");
  const [search, setSearch] = useState("");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/company";
  };

  const filtered = opportunities.filter(
    (o) => o.role.toLowerCase().includes(search.toLowerCase()) || o.track.toLowerCase().includes(search.toLowerCase())
  );

  const openCount = opportunities.filter((o) => o.status === "Open").length;
  const filledCount = opportunities.filter((o) => o.status === "Filled").length;
  const totalApplicants = opportunities.reduce((sum, o) => sum + o.applicants, 0);

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./opportunities --full-time</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Opportunities</h1>
          <p style={{ color: "#606C66" }}>Full-time and contract roles for graduates</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Openings" value={opportunities.length} />
          <StatCard label="Open" value={openCount} />
          <StatCard label="Filled" value={filledCount} />
          <StatCard label="Total Applicants" value={totalApplicants} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by role or track..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No opportunities found" description="Try a different role or track." />
        ) : (
          <Card variant="terminal" padding="none" title="Posted Opportunities">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Role", "Track", "Type", "Salary", "Applicants", "Posted", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, idx) => (
                  <tr key={o.role} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5 text-sm font-medium" style={{ color: "#102019" }}>{o.role}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{o.track}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{o.type}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{o.salary}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{o.applicants}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{o.posted}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={statusTone[o.status]} mono>
                        {o.status}
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
