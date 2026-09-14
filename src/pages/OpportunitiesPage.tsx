import { useState, type FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, EmptyState } from "../components/ui";
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

const trackOptions = ["Software Dev", "Networking", "Multimedia"];
const typeOptions = ["Full-time", "Contract"] as const;
const statusOptions = ["Open", "Filled", "Closed"] as const;

type OpportunityForm = {
  role: string;
  track: string;
  type: (typeof typeOptions)[number];
  salary: string;
  status: (typeof statusOptions)[number];
};

const emptyOpportunityForm = (): OpportunityForm => ({
  role: "",
  track: trackOptions[0],
  type: "Full-time",
  salary: "",
  status: "Open",
});

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

function nextPostedDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function OpportunitiesPage() {
  const [activeKey, setActiveKey] = useState("opportunities");
  const [search, setSearch] = useState("");

  const [opportunitiesList, setOpportunitiesList] = useState<Opportunity[]>(opportunities);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [form, setForm] = useState<OpportunityForm>(emptyOpportunityForm());
  const [deleteRole, setDeleteRole] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/company";
  };

  const openAddForm = () => {
    setEditingRole(null);
    setForm(emptyOpportunityForm());
    setFormOpen(true);
  };

  const openEditForm = (o: Opportunity) => {
    setEditingRole(o.role);
    setForm({ role: o.role, track: o.track, type: o.type, salary: o.salary, status: o.status });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingRole(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.role.trim() || !form.salary.trim()) return;

    if (editingRole) {
      setOpportunitiesList((prev) =>
        prev.map((o) =>
          o.role === editingRole
            ? { ...o, role: form.role, track: form.track, type: form.type, salary: form.salary, status: form.status }
            : o
        )
      );
    } else {
      const newOpportunity: Opportunity = {
        role: form.role,
        track: form.track,
        type: form.type,
        salary: form.salary,
        applicants: 0,
        status: form.status,
        posted: nextPostedDate(),
      };
      setOpportunitiesList((prev) => [newOpportunity, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (role: string) => {
    setOpportunitiesList((prev) => prev.filter((o) => o.role !== role));
    setDeleteRole(null);
  };

  const filtered = opportunitiesList.filter(
    (o) => o.role.toLowerCase().includes(search.toLowerCase()) || o.track.toLowerCase().includes(search.toLowerCase())
  );

  const openCount = opportunitiesList.filter((o) => o.status === "Open").length;
  const filledCount = opportunitiesList.filter((o) => o.status === "Filled").length;
  const totalApplicants = opportunitiesList.reduce((sum, o) => sum + o.applicants, 0);

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
          <StatCard label="Total Openings" value={opportunitiesList.length} />
          <StatCard label="Open" value={openCount} />
          <StatCard label="Filled" value={filledCount} />
          <StatCard label="Total Applicants" value={totalApplicants} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <Input placeholder="Search by role or track..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="primary" onClick={openAddForm}>+ Add Opportunity</Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingRole ? "Edit Opportunity" : "Add Opportunity"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
                <Select
                  label="Track"
                  options={trackOptions.map((t) => ({ value: t, label: t }))}
                  value={form.track}
                  onChange={(e) => setForm({ ...form, track: e.target.value })}
                />
                <Select
                  label="Type"
                  options={typeOptions.map((t) => ({ value: t, label: t }))}
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as OpportunityForm["type"] })}
                />
                <Input label="Salary" placeholder="e.g. RWF 400K–500K/mo" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
                <Select
                  label="Status"
                  options={statusOptions.map((s) => ({ value: s, label: s }))}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as OpportunityForm["status"] })}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingRole ? "Save Changes" : "Add Opportunity"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {filtered.length === 0 ? (
          <EmptyState title="No opportunities found" description="Try a different role or track." />
        ) : (
          <Card variant="terminal" padding="none" title="Posted Opportunities">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Role", "Track", "Type", "Salary", "Applicants", "Posted", "Status", "Actions"].map((h) => (
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
                    <td className="px-6 py-3.5">
                      {deleteRole === o.role ? (
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                          <button onClick={() => handleDelete(o.role)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                          <button onClick={() => setDeleteRole(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <button onClick={() => openEditForm(o)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                          <button onClick={() => setDeleteRole(o.role)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
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
