import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select } from "../components/ui";
import { navItems } from "./PlatformAdminDashboard";

interface Institution {
  name: string;
  location: string;
  students: number;
  trainers: number;
  courses: number;
  completionRate: number;
  status: "Active" | "Pending";
}

const statusOptions = ["Active", "Pending"] as const;

type InstitutionForm = {
  name: string;
  location: string;
  students: string;
  trainers: string;
  courses: string;
  completionRate: string;
  status: (typeof statusOptions)[number];
};

const emptyInstitutionForm: InstitutionForm = {
  name: "",
  location: "",
  students: "0",
  trainers: "0",
  courses: "0",
  completionRate: "0",
  status: "Pending",
};

const institutions: Institution[] = [
  { name: "INES-Ruhengeri", location: "Ruhengeri, Northern Province", students: 126, trainers: 8, courses: 12, completionRate: 53, status: "Active" },
  { name: "UR-CST", location: "Kigali, Kigali City", students: 214, trainers: 15, courses: 18, completionRate: 61, status: "Active" },
  { name: "IPRC Kigali", location: "Kigali, Kigali City", students: 187, trainers: 11, courses: 14, completionRate: 58, status: "Active" },
  { name: "IPRC Huye", location: "Huye, Southern Province", students: 94, trainers: 6, courses: 9, completionRate: 47, status: "Active" },
  { name: "RP-IPRC Musanze", location: "Musanze, Northern Province", students: 0, trainers: 0, courses: 0, completionRate: 0, status: "Pending" },
];

export default function InstitutionsPage() {
  const [params] = useSearchParams();
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";

  const [activeKey, setActiveKey] = useState("institutions");
  const [search, setSearch] = useState("");

  const [institutionsList, setInstitutionsList] = useState<Institution[]>(institutions);
  const [formOpen, setFormOpen] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [form, setForm] = useState<InstitutionForm>(emptyInstitutionForm);
  const [deleteName, setDeleteName] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/admin";
  };

  const openAddForm = () => {
    setEditingName(null);
    setForm(emptyInstitutionForm);
    setFormOpen(true);
  };

  const openEditForm = (inst: Institution) => {
    setEditingName(inst.name);
    setForm({
      name: inst.name,
      location: inst.location,
      students: String(inst.students),
      trainers: String(inst.trainers),
      courses: String(inst.courses),
      completionRate: String(inst.completionRate),
      status: inst.status,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingName(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;

    const newInst: Institution = {
      name: form.name,
      location: form.location,
      students: Number(form.students) || 0,
      trainers: Number(form.trainers) || 0,
      courses: Number(form.courses) || 0,
      completionRate: Number(form.completionRate) || 0,
      status: form.status,
    };

    if (editingName) {
      setInstitutionsList((prev) => prev.map((i) => (i.name === editingName ? newInst : i)));
    } else {
      setInstitutionsList((prev) => [newInst, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (name: string) => {
    setInstitutionsList((prev) => prev.filter((i) => i.name !== name));
    setDeleteName(null);
  };

  const filtered = institutionsList.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase())
  );

  const activeInstitutions = institutionsList.filter((i) => i.status === "Active");
  const totalStudents = institutionsList.reduce((sum, i) => sum + i.students, 0);
  const totalTrainers = institutionsList.reduce((sum, i) => sum + i.trainers, 0);
  const avgCompletion = activeInstitutions.length
    ? Math.round(activeInstitutions.reduce((sum, i) => sum + i.completionRate, 0) / activeInstitutions.length)
    : 0;

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./institutions --all</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Institutions</h1>
          <p style={{ color: "#606C66" }}>Partner schools and training centers on the platform</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Institutions" value={institutionsList.length} />
          <StatCard label="Total Students" value={totalStudents.toLocaleString()} />
          <StatCard label="Total Trainers" value={totalTrainers} />
          <StatCard label="Avg Completion Rate" value={`${avgCompletion}%`} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <Input placeholder="Search by name or location..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="primary" onClick={openAddForm}>+ Add Institution</Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingName ? "Edit Institution" : "Add Institution"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                <Select
                  label="Status"
                  options={statusOptions.map((s) => ({ value: s, label: s }))}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as InstitutionForm["status"] })}
                />
                <Input label="Students" type="number" min="0" value={form.students} onChange={(e) => setForm({ ...form, students: e.target.value })} />
                <Input label="Trainers" type="number" min="0" value={form.trainers} onChange={(e) => setForm({ ...form, trainers: e.target.value })} />
                <Input label="Courses" type="number" min="0" value={form.courses} onChange={(e) => setForm({ ...form, courses: e.target.value })} />
                <Input label="Completion Rate (%)" type="number" min="0" max="100" value={form.completionRate} onChange={(e) => setForm({ ...form, completionRate: e.target.value })} />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingName ? "Save Changes" : "Add Institution"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((inst) => (
            <Card key={inst.name} variant="terminal" padding="lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#102019" }}>{inst.name}</p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>{inst.location}</p>
                </div>
                <Badge tone={inst.status === "Active" ? "success" : "warning"} mono>
                  {inst.status}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border">
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{inst.students}</p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Students</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{inst.trainers}</p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Trainers</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{inst.courses}</p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Courses</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>
                    {inst.status === "Active" ? `${inst.completionRate}%` : "—"}
                  </p>
                  <p className="font-mono text-xs" style={{ color: "#606C66" }}>Completion</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-border">
                {deleteName === inst.name ? (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete {inst.name}?</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleDelete(inst.name)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                      <button onClick={() => setDeleteName(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <button onClick={() => openEditForm(inst)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                    <button onClick={() => setDeleteName(inst.name)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
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
