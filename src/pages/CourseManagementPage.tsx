import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, StatCard, Input, Select, EmptyState } from "../components/ui";
import { navItems as schoolAdminNavItems } from "./SchoolAdminDashboard";
import { navItems as platformAdminNavItems } from "./PlatformAdminDashboard";
import { allCourses } from "./CoursesPage";

const tracks = ["All Tracks", "Software Dev", "Networking", "Multimedia"];

const priceTone: Record<string, "success" | "warning" | "danger"> = {
  Free: "success",
  Professional: "warning",
  Career: "danger",
};

const roleConfig: Record<
  string,
  { roleLabel: string; navItems: typeof schoolAdminNavItems; dashboardHref: string; subtitle: string }
> = {
  "school-admin": {
    roleLabel: "School Admin",
    navItems: schoolAdminNavItems,
    dashboardHref: "/school-admin",
    subtitle: "Courses offered at your institution",
  },
  admin: {
    roleLabel: "Platform Admin",
    navItems: platformAdminNavItems,
    dashboardHref: "/admin",
    subtitle: "Every course running on the platform",
  },
};

export default function CourseManagementPage() {
  const [params] = useSearchParams();
  const role = params.get("role") ?? "admin";
  const userName = params.get("userName") ?? "Platform Admin";
  const userInitials = params.get("userInitials") ?? "PA";
  const config = roleConfig[role] ?? roleConfig.admin;

  const [activeKey, setActiveKey] = useState("courses");
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState("All Tracks");

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = config.dashboardHref;
  };

  const filtered = allCourses.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false;
    if (trackFilter !== "All Tracks" && c.track !== trackFilter) return false;
    return true;
  });

  const totalEnrolled = allCourses.reduce((sum, c) => sum + c.enrolled, 0);
  const avgRating = (allCourses.reduce((sum, c) => sum + c.rating, 0) / allCourses.length).toFixed(1);
  const trackCount = new Set(allCourses.map((c) => c.track)).size;

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
          <p className="font-mono text-xs mb-2" style={{ color: "#1F7A4B" }}>$ ls ./courses --manage</p>
          <h1 className="text-page-title mb-1" style={{ color: "#102019" }}>Manage Courses</h1>
          <p style={{ color: "#606C66" }}>{config.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Courses" value={allCourses.length} />
          <StatCard label="Total Enrolled" value={totalEnrolled.toLocaleString()} />
          <StatCard label="Avg Rating" value={`${avgRating} ⭐`} />
          <StatCard label="Tracks" value={trackCount} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[220px]">
            <Input placeholder="Search by course or instructor..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-48">
            <Select
              options={tracks.map((t) => ({ value: t, label: t }))}
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No courses found" description="Try a different search term or track." />
        ) : (
          <Card variant="terminal" padding="none" title="Course Catalog">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Course", "Instructor", "Duration", "Enrolled", "Rating", "Price"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-mono text-xs" style={{ color: "#606C66" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F7F5" : "none" }}>
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-medium" style={{ color: "#102019" }}>{c.title}</p>
                      <p className="font-mono text-xs" style={{ color: "#606C66" }}>{c.track} · {c.level}</p>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{c.instructor}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#606C66" }}>{c.duration}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{c.enrolled.toLocaleString()}</td>
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{c.rating} ⭐</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={priceTone[c.price]} mono>
                        {c.price}
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
