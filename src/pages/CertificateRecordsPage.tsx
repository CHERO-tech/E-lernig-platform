import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, EmptyState } from "../components/ui";
import { navItems as trainerNavItems } from "./TrainerDashboard";
import { navItems as schoolAdminNavItems } from "./SchoolAdminDashboard";
import { navItems as platformAdminNavItems } from "./PlatformAdminDashboard";
import { navItems as guardianNavItems } from "./GuardianDashboard";

interface CertRecord {
  student: string;
  institution: string;
  course: string;
  date: string;
  certId: string;
  status: "Issued" | "Revoked";
}

const records: CertRecord[] = [
  { student: "Kagabo Eric", institution: "UR-CST", course: "Web Development", date: "2026-08-14", certId: "CERT-2026-0847", status: "Issued" },
  { student: "Kagabo Eric", institution: "UR-CST", course: "Database Systems", date: "2026-07-02", certId: "CERT-2026-0791", status: "Issued" },
  { student: "Kagabo Eric", institution: "UR-CST", course: "Git & GitHub", date: "2026-05-20", certId: "CERT-2026-0623", status: "Issued" },
  { student: "Ineza Grace Marie", institution: "IPRC Kigali", course: "Graphic Design", date: "2026-08-28", certId: "CERT-2026-0863", status: "Issued" },
  { student: "Ineza Grace Marie", institution: "IPRC Kigali", course: "UI/UX Design", date: "2026-06-11", certId: "CERT-2026-0704", status: "Issued" },
  { student: "Nzeyimana Patrick", institution: "INES-Ruhengeri", course: "Computer Networks", date: "2026-08-03", certId: "CERT-2026-0819", status: "Issued" },
  { student: "Nzeyimana Patrick", institution: "INES-Ruhengeri", course: "Network Security", date: "2026-04-17", certId: "CERT-2026-0512", status: "Revoked" },
  { student: "Amahoro Jean de Dieu", institution: "INES-Ruhengeri", course: "UI/UX Design", date: "2026-09-05", certId: "CERT-2026-0855", status: "Issued" },
  { student: "Amahoro Jean de Dieu", institution: "INES-Ruhengeri", course: "Networking Fundamentals", date: "2026-06-30", certId: "CERT-2026-0731", status: "Issued" },
  { student: "Munyakazi Lisa", institution: "IPRC Huye", course: "Web Development", date: "2026-07-15", certId: "CERT-2026-0768", status: "Issued" },
];

const roleConfig: Record<
  string,
  {
    roleLabel: string;
    navItems: typeof trainerNavItems;
    dashboardHref: string;
    subtitle: string;
    showInstitution: boolean;
    filterStudent?: string;
  }
> = {
  trainer: {
    roleLabel: "Trainer",
    navItems: trainerNavItems,
    dashboardHref: "/trainer",
    subtitle: "Certificates earned by your students",
    showInstitution: false,
  },
  "school-admin": {
    roleLabel: "School Admin",
    navItems: schoolAdminNavItems,
    dashboardHref: "/school-admin",
    subtitle: "Certificates issued across your institution",
    showInstitution: false,
  },
  admin: {
    roleLabel: "Platform Admin",
    navItems: platformAdminNavItems,
    dashboardHref: "/admin",
    subtitle: "Certificates issued platform-wide",
    showInstitution: true,
  },
  guardian: {
    roleLabel: "Guardian",
    navItems: guardianNavItems,
    dashboardHref: "/guardian",
    subtitle: "Certificates earned by your child",
    showInstitution: false,
    filterStudent: "Amahoro Jean de Dieu",
  },
};

export default function CertificateRecordsPage() {
  const [params] = useSearchParams();
  const role = params.get("role") ?? "admin";
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";
  const config = roleConfig[role] ?? roleConfig.admin;

  const [activeKey, setActiveKey] = useState("certificates");
  const [query, setQuery] = useState("");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = config.dashboardHref;
  };

  const scoped = config.filterStudent
    ? records.filter((r) => r.student === config.filterStudent)
    : records;
  const filtered = scoped.filter(
    (r) =>
      r.student.toLowerCase().includes(query.toLowerCase()) ||
      r.course.toLowerCase().includes(query.toLowerCase())
  );

  const issuedCount = scoped.filter((r) => r.status === "Issued").length;
  const revokedCount = scoped.filter((r) => r.status === "Revoked").length;
  const thisMonthCount = scoped.filter((r) => r.date.startsWith("2026-09")).length;
  const institutionCount = new Set(scoped.map((r) => r.institution)).size;

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./certificates --issued</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Certificate Records</h1>
          <p style={{ color: "#606C66" }}>{config.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Issued" value={issuedCount} />
          <StatCard label="Issued This Month" value={thisMonthCount} />
          <StatCard label="Revoked" value={revokedCount} trend={revokedCount > 0 ? `${revokedCount} record${revokedCount === 1 ? "" : "s"}` : undefined} trendTone={revokedCount > 0 ? "down" : "neutral"} />
          <StatCard label="Institutions" value={institutionCount} />
        </div>

        <div className="mb-5 max-w-sm">
          <Input
            placeholder="Search by student or course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No certificates found"
            description="Try a different student name or course."
          />
        ) : (
          <Card variant="terminal" padding="none" title="Issued Certificates">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {[
                    "Student",
                    "Course",
                    ...(config.showInstitution ? ["Institution"] : []),
                    "Date Issued",
                    "Certificate ID",
                    "Status",
                  ].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.certId} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(53,196,122,0.1)", color: "#1F7A4B" }}
                        >
                          {r.student[0]}
                        </div>
                        <p className="text-sm font-medium" style={{ color: "#102019" }}>{r.student}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{r.course}</td>
                    {config.showInstitution && (
                      <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{r.institution}</td>
                    )}
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{r.date}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{r.certId}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={r.status === "Issued" ? "success" : "danger"} mono>
                        {r.status}
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
