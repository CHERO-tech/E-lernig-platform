import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, EmptyState } from "../components/ui";
import { navItems as trainerNavItems } from "./TrainerDashboard";
import { navItems as schoolAdminNavItems } from "./SchoolAdminDashboard";
import { navItems as platformAdminNavItems } from "./PlatformAdminDashboard";

type PersonRole = "student" | "trainer";

interface Person {
  name: string;
  role: PersonRole;
  track: string;
  institution: string;
  skills: string[];
  stats: { label: string; value: string | number }[];
  level?: string;
}

const trackFormOptions = ["Software Development", "Networking", "Multimedia"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];

type PersonForm = {
  name: string;
  role: PersonRole;
  track: string;
  institution: string;
  level: string;
  skills: string;
  projects: string;
  certs: string;
  score: string;
  experience: string;
  studentsCount: string;
  rating: string;
};

const emptyPersonForm = (role: PersonRole): PersonForm => ({
  name: "",
  role,
  track: trackFormOptions[0],
  institution: "",
  level: levelOptions[0],
  skills: "",
  projects: "0",
  certs: "0",
  score: "0%",
  experience: "0 yrs",
  studentsCount: "0",
  rating: "0.0 ⭐",
});

const people: Person[] = [
  {
    name: "Kagabo Eric", role: "student", track: "Software Development", institution: "UR-CST", level: "Advanced",
    skills: ["React", "Node.js", "PostgreSQL", "Python"],
    stats: [{ label: "Projects", value: 4 }, { label: "Certs", value: 3 }, { label: "Score", value: "94%" }],
  },
  {
    name: "Ineza Grace Marie", role: "student", track: "Multimedia & Design", institution: "IPRC Kigali", level: "Intermediate",
    skills: ["Figma", "UI/UX", "Illustrator", "After Effects"],
    stats: [{ label: "Projects", value: 3 }, { label: "Certs", value: 2 }, { label: "Score", value: "91%" }],
  },
  {
    name: "Nzeyimana Patrick", role: "student", track: "Networking", institution: "INES-Ruhengeri", level: "Advanced",
    skills: ["Cisco", "Network Security", "Linux", "Firewalls"],
    stats: [{ label: "Projects", value: 3 }, { label: "Certs", value: 2 }, { label: "Score", value: "88%" }],
  },
  {
    name: "Amahoro Jean de Dieu", role: "student", track: "Software Development", institution: "INES-Ruhengeri", level: "Intermediate",
    skills: ["JavaScript", "React", "MongoDB", "REST API"],
    stats: [{ label: "Projects", value: 2 }, { label: "Certs", value: 2 }, { label: "Score", value: "85%" }],
  },
  {
    name: "Uwimana Diane", role: "student", track: "Software Development", institution: "UR-CST", level: "Advanced",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    stats: [{ label: "Projects", value: 5 }, { label: "Certs", value: 3 }, { label: "Score", value: "96%" }],
  },
  {
    name: "Munyakazi Lisa", role: "student", track: "Multimedia & Design", institution: "IPRC Huye", level: "Beginner",
    skills: ["Graphic Design", "Illustrator", "Video Editing"],
    stats: [{ label: "Projects", value: 2 }, { label: "Certs", value: 1 }, { label: "Score", value: "82%" }],
  },
  {
    name: "Emmanuel Nkurunziza", role: "trainer", track: "Software Development", institution: "INES-Ruhengeri",
    skills: ["React", "TypeScript", "Web APIs"],
    stats: [{ label: "Experience", value: "8 yrs" }, { label: "Students", value: 12 }, { label: "Rating", value: "4.9 ⭐" }],
  },
  {
    name: "Grace Mukamana", role: "trainer", track: "Multimedia", institution: "IPRC Kigali",
    skills: ["UI/UX Design", "Figma", "User Research"],
    stats: [{ label: "Experience", value: "6 yrs" }, { label: "Students", value: 8 }, { label: "Rating", value: "4.8 ⭐" }],
  },
  {
    name: "Patrick Habimana", role: "trainer", track: "Networking", institution: "UR-CST",
    skills: ["Network Security", "Linux", "TCP/IP"],
    stats: [{ label: "Experience", value: "10 yrs" }, { label: "Students", value: 5 }, { label: "Rating", value: "5.0 ⭐" }],
  },
];

const tracks = ["All Tracks", "Software Development", "Networking", "Multimedia"];

const roleConfig: Record<
  string,
  { roleLabel: string; navItems: typeof trainerNavItems; dashboardHref: string }
> = {
  trainer: { roleLabel: "Trainer", navItems: trainerNavItems, dashboardHref: "/trainer" },
  "school-admin": { roleLabel: "School Admin", navItems: schoolAdminNavItems, dashboardHref: "/school-admin" },
  admin: { roleLabel: "Platform Admin", navItems: platformAdminNavItems, dashboardHref: "/admin" },
};

export default function PeopleDirectoryPage() {
  const [params] = useSearchParams();
  const role = params.get("role") ?? "admin";
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";
  const type = (params.get("type") ?? "all") as PersonRole | "all";
  const institution = params.get("institution");
  const config = roleConfig[role] ?? roleConfig.admin;

  const [activeKey, setActiveKey] = useState(type === "trainer" ? "trainers" : type === "student" ? "students" : "users");
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState("All Tracks");

  const [peopleList, setPeopleList] = useState<Person[]>(people);
  const [formOpen, setFormOpen] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [form, setForm] = useState<PersonForm>(emptyPersonForm(type === "trainer" ? "trainer" : "student"));
  const [deleteName, setDeleteName] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = config.dashboardHref;
  };

  const openAddForm = () => {
    setEditingName(null);
    setForm(emptyPersonForm(type === "trainer" ? "trainer" : "student"));
    setFormOpen(true);
  };

  const openEditForm = (person: Person) => {
    setEditingName(person.name);
    const statVal = (label: string) => person.stats.find((s) => s.label === label)?.value;
    setForm({
      name: person.name,
      role: person.role,
      track: person.track,
      institution: person.institution,
      level: person.level ?? levelOptions[0],
      skills: person.skills.join(", "),
      projects: String(statVal("Projects") ?? "0"),
      certs: String(statVal("Certs") ?? "0"),
      score: String(statVal("Score") ?? "0%"),
      experience: String(statVal("Experience") ?? "0 yrs"),
      studentsCount: String(statVal("Students") ?? "0"),
      rating: String(statVal("Rating") ?? "0.0 ⭐"),
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingName(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const stats =
      form.role === "student"
        ? [
            { label: "Projects", value: Number(form.projects) || 0 },
            { label: "Certs", value: Number(form.certs) || 0 },
            { label: "Score", value: form.score },
          ]
        : [
            { label: "Experience", value: form.experience },
            { label: "Students", value: Number(form.studentsCount) || 0 },
            { label: "Rating", value: form.rating },
          ];

    const skills = form.skills.split(",").map((s) => s.trim()).filter(Boolean);

    const newPerson: Person = {
      name: form.name,
      role: form.role,
      track: form.track,
      institution: form.institution,
      skills,
      stats,
      ...(form.role === "student" ? { level: form.level } : {}),
    };

    if (editingName) {
      setPeopleList((prev) => prev.map((p) => (p.name === editingName ? newPerson : p)));
    } else {
      setPeopleList((prev) => [newPerson, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (name: string) => {
    setPeopleList((prev) => prev.filter((p) => p.name !== name));
    setDeleteName(null);
  };

  const scoped = peopleList
    .filter((p) => (type === "all" ? true : p.role === type))
    .filter((p) => (institution ? p.institution === institution : true));

  const filtered = scoped.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))) return false;
    if (trackFilter !== "All Tracks" && !p.track.toLowerCase().includes(trackFilter.toLowerCase())) return false;
    return true;
  });

  const title = type === "trainer" ? "Trainers" : type === "student" ? "Students" : "Manage Users";
  const subtitle =
    type === "trainer"
      ? institution ? `Trainers at ${institution}` : "All trainers on the platform"
      : type === "student"
        ? institution ? `Students at ${institution}` : "All students on the platform"
        : "Everyone on the platform — students and trainers";

  const studentCount = scoped.filter((p) => p.role === "student").length;
  const trainerCount = scoped.filter((p) => p.role === "trainer").length;

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./people {type !== "all" ? `--role=${type}` : "--all"}</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>{title}</h1>
          <p style={{ color: "#606C66" }}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={scoped.length} />
          <StatCard label="Students" value={studentCount} />
          <StatCard label="Trainers" value={trainerCount} />
          <StatCard label="Institutions" value={new Set(scoped.map((p) => p.institution)).size} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
          <div className="flex-1 min-w-[220px]">
            <Input placeholder="Search by name or skill..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-48">
            <Select
              options={tracks.map((t) => ({ value: t, label: t }))}
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={openAddForm}>
            + Add {type === "trainer" ? "Trainer" : type === "student" ? "Student" : "Person"}
          </Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingName ? "Edit Person" : "Add Person"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} required />
                {type === "all" && (
                  <Select
                    label="Type"
                    options={[{ value: "student", label: "Student" }, { value: "trainer", label: "Trainer" }]}
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as PersonRole })}
                  />
                )}
                <Select
                  label="Track"
                  options={trackFormOptions.map((t) => ({ value: t, label: t }))}
                  value={form.track}
                  onChange={(e) => setForm({ ...form, track: e.target.value })}
                />
                {form.role === "student" && (
                  <Select
                    label="Level"
                    options={levelOptions.map((l) => ({ value: l, label: l }))}
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                  />
                )}
                <div className="md:col-span-2">
                  <Input
                    label="Skills (comma-separated)"
                    value={form.skills}
                    onChange={(e) => setForm({ ...form, skills: e.target.value })}
                    placeholder="React, Node.js, PostgreSQL"
                  />
                </div>
                {form.role === "student" ? (
                  <>
                    <Input label="Projects" type="number" min="0" value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} />
                    <Input label="Certificates" type="number" min="0" value={form.certs} onChange={(e) => setForm({ ...form, certs: e.target.value })} />
                    <Input label="Score" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} placeholder="e.g. 90%" />
                  </>
                ) : (
                  <>
                    <Input label="Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 8 yrs" />
                    <Input label="Students" type="number" min="0" value={form.studentsCount} onChange={(e) => setForm({ ...form, studentsCount: e.target.value })} />
                    <Input label="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} placeholder="e.g. 4.9 ⭐" />
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingName ? "Save Changes" : "Add Person"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {filtered.length === 0 ? (
          <EmptyState title="No one found" description="Try a different name, skill, or track." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <Card key={p.name} variant="terminal" padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0"
                      style={{ background: "rgba(53,196,122,0.12)", color: "#1F7A4B" }}
                    >
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#102019" }}>{p.name}</p>
                      <p className="font-mono text-xs" style={{ color: "#606C66" }}>{p.institution}</p>
                    </div>
                  </div>
                  <Badge tone={p.role === "trainer" ? "info" : "brand"} mono>
                    {p.role === "trainer" ? "Trainer" : "Student"}
                  </Badge>
                </div>

                <p className="text-xs mb-1" style={{ color: "#606C66" }}>{p.track}{p.level ? ` · ${p.level}` : ""}</p>

                <div className="flex flex-wrap gap-1.5 my-3">
                  {p.skills.map((s) => (
                    <span key={s} className="font-mono text-xs px-2 py-1 rounded" style={{ background: "#F5F7F5", color: "#102019", border: "1px solid #E2E8E4" }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 pb-3 border-t border-border">
                  {p.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-mono text-sm font-bold" style={{ color: "#1F7A4B" }}>{s.value}</p>
                      <p className="font-mono text-xs" style={{ color: "#606C66" }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border">
                  {deleteName === p.name ? (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete {p.name}?</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleDelete(p.name)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                        <button onClick={() => setDeleteName(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button onClick={() => openEditForm(p)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                      <button onClick={() => setDeleteName(p.name)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
