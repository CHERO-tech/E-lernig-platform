import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input } from "../components/ui";
import { navItems } from "./PlatformAdminDashboard";

interface Company {
  name: string;
  industry: string;
  location: string;
  hired: number;
  openRoles: number;
  status: "Active" | "Pending";
}

const companies: Company[] = [
  { name: "TechRwanda Ltd", industry: "Software Development", location: "Kigali", hired: 6, openRoles: 3, status: "Active" },
  { name: "Bank of Kigali", industry: "Finance & Fintech", location: "Kigali", hired: 12, openRoles: 5, status: "Active" },
  { name: "MTN Rwanda", industry: "Telecommunications", location: "Kigali", hired: 9, openRoles: 4, status: "Active" },
  { name: "Zipline Rwanda", industry: "Logistics & Drone Tech", location: "Muhanga", hired: 4, openRoles: 2, status: "Active" },
  { name: "Andela Rwanda", industry: "Software Development", location: "Kigali", hired: 15, openRoles: 6, status: "Active" },
  { name: "Inzozi Media", industry: "Multimedia & Design", location: "Kigali", hired: 5, openRoles: 2, status: "Active" },
  { name: "KLab", industry: "Tech Incubator", location: "Kigali", hired: 7, openRoles: 3, status: "Active" },
  { name: "Irembo", industry: "Software Development", location: "Kigali", hired: 8, openRoles: 3, status: "Active" },
  { name: "Rwanda Online Platform Ltd", industry: "Software Development", location: "Kigali", hired: 0, openRoles: 0, status: "Pending" },
];

export default function CompaniesPage() {
  const [params] = useSearchParams();
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";

  const [activeKey, setActiveKey] = useState("companies");
  const [search, setSearch] = useState("");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/admin";
  };

  const filtered = companies.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const totalHired = companies.reduce((sum, c) => sum + c.hired, 0);
  const totalOpenRoles = companies.reduce((sum, c) => sum + c.openRoles, 0);
  const activeCount = companies.filter((c) => c.status === "Active").length;

  return (
    <DashboardLayout
      role="admin"
      roleLabel="Platform Admin"
      navItems={navItems}
      activeKey={activeKey}
      onNav={handleNav}
      userName={userName}
      userInitials={userInitials}
    >
      <div className="p-8">
        <div className="mb-8">
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./companies --partners</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Companies</h1>
          <p style={{ color: "#606C66" }}>Hiring partners connected to the platform</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Companies" value={companies.length} />
          <StatCard label="Active Partners" value={activeCount} />
          <StatCard label="Students Hired" value={totalHired} />
          <StatCard label="Open Roles" value={totalOpenRoles} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by name or industry..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <Card key={c.name} variant="terminal" padding="lg">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0"
                  style={{ background: "rgba(53,196,122,0.12)", color: "#1F7A4B" }}
                >
                  {c.name[0]}
                </div>
                <Badge tone={c.status === "Active" ? "success" : "warning"} mono>
                  {c.status}
                </Badge>
              </div>

              <p className="text-sm font-semibold mb-1" style={{ color: "#102019" }}>{c.name}</p>
              <p className="font-mono text-xs mb-4" style={{ color: "#606C66" }}>{c.industry} · {c.location}</p>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{c.status === "Active" ? c.hired : "—"}</p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Hired</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{c.status === "Active" ? c.openRoles : "—"}</p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Open Roles</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
