import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, EmptyState } from "../components/ui";
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

const statusOptions = ["Issued", "Revoked"] as const;

type CertForm = {
  student: string;
  institution: string;
  course: string;
  date: string;
  status: (typeof statusOptions)[number];
};

const emptyCertForm: CertForm = {
  student: "",
  institution: "",
  course: "",
  date: new Date().toISOString().slice(0, 10),
  status: "Issued",
};

let certCounter = 900;
const nextCertId = () => `CERT-2026-${(certCounter++).toString().padStart(4, "0")}`;

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
    canEdit: boolean;
  }
> = {
  trainer: {
    roleLabel: "Trainer",
    navItems: trainerNavItems,
    dashboardHref: "/trainer",
    subtitle: "Certificates earned by your students",
    showInstitution: false,
    canEdit: true,
  },
  "school-admin": {
    roleLabel: "School Admin",
    navItems: schoolAdminNavItems,
    dashboardHref: "/school-admin",
    subtitle: "Certificates issued across your institution",
    showInstitution: false,
    canEdit: true,
  },
  admin: {
    roleLabel: "Platform Admin",
    navItems: platformAdminNavItems,
    dashboardHref: "/admin",
    subtitle: "Certificates issued platform-wide",
    showInstitution: true,
    canEdit: true,
  },
  guardian: {
    roleLabel: "Guardian",
    navItems: guardianNavItems,
    dashboardHref: "/guardian",
    subtitle: "Certificates earned by your child",
    showInstitution: false,
    filterStudent: "Amahoro Jean de Dieu",
    // Guardians view their child's records; issuing/revoking a
    // certificate is an institution/trainer action, not a parent's —
    // this role never gets the add/edit/delete UI, on purpose.
    canEdit: false,
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

  const [recordsList, setRecordsList] = useState<CertRecord[]>(records);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [form, setForm] = useState<CertForm>(emptyCertForm);
  const [deleteCertId, setDeleteCertId] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = config.dashboardHref;
  };

  const openAddForm = () => {
    setEditingCertId(null);
    setForm(emptyCertForm);
    setFormOpen(true);
  };

  const openEditForm = (record: CertRecord) => {
    setEditingCertId(record.certId);
    setForm({
      student: record.student,
      institution: record.institution,
      course: record.course,
      date: record.date,
      status: record.status,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingCertId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.student.trim() || !form.course.trim()) return;

    if (editingCertId) {
      setRecordsList((prev) =>
        prev.map((r) =>
          r.certId === editingCertId
            ? { ...r, student: form.student, institution: form.institution, course: form.course, date: form.date, status: form.status }
            : r
        )
      );
    } else {
      const newRecord: CertRecord = {
        student: form.student,
        institution: form.institution,
        course: form.course,
        date: form.date,
        certId: nextCertId(),
        status: form.status,
      };
      setRecordsList((prev) => [newRecord, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (certId: string) => {
    setRecordsList((prev) => prev.filter((r) => r.certId !== certId));
    setDeleteCertId(null);
  };

  const scoped = config.filterStudent
    ? recordsList.filter((r) => r.student === config.filterStudent)
    : recordsList;
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

        <div className="flex flex-wrap gap-3 mb-5 items-start">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <Input
              placeholder="Search by student or course..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {config.canEdit && (
            <Button variant="primary" onClick={openAddForm}>+ Issue Certificate</Button>
          )}
        </div>

        {config.canEdit && formOpen && (
          <Card variant="terminal" padding="lg" title={editingCertId ? "Edit Certificate" : "Issue Certificate"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Student" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} required />
                <Input label="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required />
                <Input label="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} required />
                <Input label="Date Issued" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                <Select
                  label="Status"
                  options={statusOptions.map((s) => ({ value: s, label: s }))}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as CertForm["status"] })}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingCertId ? "Save Changes" : "Issue Certificate"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

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
                    ...(config.canEdit ? ["Actions"] : []),
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
                    {config.canEdit && (
                      <td className="px-6 py-3.5">
                        {deleteCertId === r.certId ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                            <button onClick={() => handleDelete(r.certId)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                            <button onClick={() => setDeleteCertId(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <button onClick={() => openEditForm(r)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                            <button onClick={() => setDeleteCertId(r.certId)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                          </div>
                        )}
                      </td>
                    )}
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
