import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select } from "../components/ui";
import { navItems } from "./PlatformAdminDashboard";

interface Company {
  name: string;
  industry: string;
  location: string;
  hired: number;
  openRoles: number;
  status: "Active" | "Pending";
}

const statusOptions = ["Active", "Pending"] as const;

type CompanyForm = {
  name: string;
  industry: string;
  location: string;
  hired: string;
  openRoles: string;
  status: (typeof statusOptions)[number];
};

const emptyCompanyForm: CompanyForm = {
  name: "",
  industry: "",
  location: "",
  hired: "0",
  openRoles: "0",
  status: "Pending",
};

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

  const [companiesList, setCompaniesList] = useState<Company[]>(companies);
  const [formOpen, setFormOpen] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [form, setForm] = useState<CompanyForm>(emptyCompanyForm);
  const [deleteName, setDeleteName] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/admin";
  };

  const openAddForm = () => {
    setEditingName(null);
    setForm(emptyCompanyForm);
    setFormOpen(true);
  };

  const openEditForm = (company: Company) => {
    setEditingName(company.name);
    setForm({
      name: company.name,
      industry: company.industry,
      location: company.location,
      hired: String(company.hired),
      openRoles: String(company.openRoles),
      status: company.status,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingName(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.industry.trim()) return;

    const newCompany: Company = {
      name: form.name,
      industry: form.industry,
      location: form.location,
      hired: Number(form.hired) || 0,
      openRoles: Number(form.openRoles) || 0,
      status: form.status,
    };

    if (editingName) {
      setCompaniesList((prev) => prev.map((c) => (c.name === editingName ? newCompany : c)));
    } else {
      setCompaniesList((prev) => [newCompany, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (name: string) => {
    setCompaniesList((prev) => prev.filter((c) => c.name !== name));
    setDeleteName(null);
  };

  const filtered = companiesList.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const totalHired = companiesList.reduce((sum, c) => sum + c.hired, 0);
  const totalOpenRoles = companiesList.reduce((sum, c) => sum + c.openRoles, 0);
  const activeCount = companiesList.filter((c) => c.status === "Active").length;

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
          <StatCard label="Companies" value={companiesList.length} />
          <StatCard label="Active Partners" value={activeCount} />
          <StatCard label="Students Hired" value={totalHired} />
          <StatCard label="Open Roles" value={totalOpenRoles} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <Input placeholder="Search by name or industry..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="primary" onClick={openAddForm}>+ Add Company</Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingName ? "Edit Company" : "Add Company"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Company Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} required />
                <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                <Select
                  label="Status"
                  options={statusOptions.map((s) => ({ value: s, label: s }))}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as CompanyForm["status"] })}
                />
                <Input label="Students Hired" type="number" min="0" value={form.hired} onChange={(e) => setForm({ ...form, hired: e.target.value })} />
                <Input label="Open Roles" type="number" min="0" value={form.openRoles} onChange={(e) => setForm({ ...form, openRoles: e.target.value })} />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingName ? "Save Changes" : "Add Company"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

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

              <div className="pt-3 mt-3 border-t border-border">
                {deleteName === c.name ? (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleDelete(c.name)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                      <button onClick={() => setDeleteName(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <button onClick={() => openEditForm(c)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                    <button onClick={() => setDeleteName(c.name)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
