import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input } from "../components/ui";
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

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = "/admin";
  };

  const filtered = institutions.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase())
  );

  const activeInstitutions = institutions.filter((i) => i.status === "Active");
  const totalStudents = institutions.reduce((sum, i) => sum + i.students, 0);
  const totalTrainers = institutions.reduce((sum, i) => sum + i.trainers, 0);
  const avgCompletion = Math.round(activeInstitutions.reduce((sum, i) => sum + i.completionRate, 0) / activeInstitutions.length);

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
          <StatCard label="Institutions" value={institutions.length} />
          <StatCard label="Total Students" value={totalStudents.toLocaleString()} />
          <StatCard label="Total Trainers" value={totalTrainers} />
          <StatCard label="Avg Completion Rate" value={`${avgCompletion}%`} />
        </div>

        <div className="mb-6 max-w-sm">
          <Input placeholder="Search by name or location..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

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
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
