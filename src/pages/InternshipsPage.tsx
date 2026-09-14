import { useState, type FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, EmptyState } from "../components/ui";
import { navItems } from "./CompanyPortal";

interface Internship {
  role: string;
  track: string;
  duration: string;
  applicants: number;
  status: "Open" | "Filled" | "Closed";
  posted: string;
}

const trackOptions = ["Software Dev", "Networking", "Multimedia"];
const statusOptions = ["Open", "Filled", "Closed"] as const;

type InternshipForm = {
  role: string;
  track: string;
  duration: string;
  status: (typeof statusOptions)[number];
};

const emptyInternshipForm = (): InternshipForm => ({
  role: "",
  track: trackOptions[0],
  duration: "",
  status: "Open",
});

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

function nextPostedDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function InternshipsPage() {
  const [activeKey, setActiveKey] = useState("internships");
  const [search, setSearch] = useState("");

  const [internshipsList, setInternshipsList] = useState<Internship[]>(internships);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [form, setForm] = useState<InternshipForm>(emptyInternshipForm());
  const [deleteRole, setDeleteRole] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/company";
  };

  const openAddForm = () => {
    setEditingRole(null);
    setForm(emptyInternshipForm());
    setFormOpen(true);
  };

  const openEditForm = (i: Internship) => {
    setEditingRole(i.role);
    setForm({ role: i.role, track: i.track, duration: i.duration, status: i.status });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingRole(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.role.trim() || !form.duration.trim()) return;

    if (editingRole) {
      setInternshipsList((prev) =>
        prev.map((i) =>
          i.role === editingRole
            ? { ...i, role: form.role, track: form.track, duration: form.duration, status: form.status }
            : i
        )
      );
    } else {
      const newInternship: Internship = {
        role: form.role,
        track: form.track,
        duration: form.duration,
        applicants: 0,
        status: form.status,
        posted: nextPostedDate(),
      };
      setInternshipsList((prev) => [newInternship, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (role: string) => {
    setInternshipsList((prev) => prev.filter((i) => i.role !== role));
    setDeleteRole(null);
  };

  const filtered = internshipsList.filter(
    (i) => i.role.toLowerCase().includes(search.toLowerCase()) || i.track.toLowerCase().includes(search.toLowerCase())
  );

  const openCount = internshipsList.filter((i) => i.status === "Open").length;
  const filledCount = internshipsList.filter((i) => i.status === "Filled").length;
  const totalApplicants = internshipsList.reduce((sum, i) => sum + i.applicants, 0);

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
          <StatCard label="Total Postings" value={internshipsList.length} />
          <StatCard label="Open" value={openCount} />
          <StatCard label="Filled" value={filledCount} />
          <StatCard label="Total Applicants" value={totalApplicants} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <Input placeholder="Search by role or track..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="primary" onClick={openAddForm}>+ Add Internship</Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingRole ? "Edit Internship" : "Add Internship"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
                <Select
                  label="Track"
                  options={trackOptions.map((t) => ({ value: t, label: t }))}
                  value={form.track}
                  onChange={(e) => setForm({ ...form, track: e.target.value })}
                />
                <Input label="Duration" placeholder="e.g. 3 months" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
                <Select
                  label="Status"
                  options={statusOptions.map((s) => ({ value: s, label: s }))}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as InternshipForm["status"] })}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingRole ? "Save Changes" : "Add Internship"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {filtered.length === 0 ? (
          <EmptyState title="No internships found" description="Try a different role or track." />
        ) : (
          <Card variant="terminal" padding="none" title="Posted Internships">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Role", "Track", "Duration", "Applicants", "Posted", "Status", "Actions"].map((h) => (
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
                    <td className="px-6 py-3.5">
                      {deleteRole === i.role ? (
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                          <button onClick={() => handleDelete(i.role)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                          <button onClick={() => setDeleteRole(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <button onClick={() => openEditForm(i)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                          <button onClick={() => setDeleteRole(i.role)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                        </div>
                      )}
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
