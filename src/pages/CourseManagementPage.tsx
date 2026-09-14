import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Badge, Button, StatCard, Input, Select, EmptyState } from "../components/ui";
import { navItems as schoolAdminNavItems } from "./SchoolAdminDashboard";
import { navItems as platformAdminNavItems } from "./PlatformAdminDashboard";
import { allCourses, type Course } from "./CoursesPage";

const trackOptions = ["Software Dev", "Networking", "Multimedia"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const priceOptions = ["Free", "Professional", "Career"] as const;
const tracks = ["All Tracks", ...trackOptions];

type CourseForm = {
  title: string;
  track: string;
  level: string;
  duration: string;
  instructor: string;
  price: string;
  lessons: string;
};

const emptyForm: CourseForm = {
  title: "",
  track: trackOptions[0],
  level: levelOptions[0],
  duration: "",
  instructor: "",
  price: priceOptions[0],
  lessons: "",
};

const slugify = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `course-${Date.now()}`;

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

  const [courses, setCourses] = useState<Course[]>(allCourses);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CourseForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleNav = (key: string) => {
    setActiveKey(key);
    if (key === "dashboard") window.location.href = config.dashboardHref;
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEditForm = (course: Course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      track: course.track,
      level: course.level,
      duration: course.duration,
      instructor: course.instructor,
      price: course.price,
      lessons: String(course.lessons),
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingId) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                title: form.title,
                track: form.track,
                level: form.level as Course["level"],
                duration: form.duration,
                instructor: form.instructor,
                price: form.price as Course["price"],
                lessons: Number(form.lessons) || 0,
              }
            : c
        )
      );
    } else {
      const newCourse: Course = {
        id: slugify(form.title),
        title: form.title,
        track: form.track,
        level: form.level as Course["level"],
        duration: form.duration,
        instructor: form.instructor,
        rating: 0,
        enrolled: 0,
        price: form.price as Course["price"],
        progress: 0,
        image: "",
        desc: "",
        status: "recommended",
        lessons: Number(form.lessons) || 0,
      };
      setCourses((prev) => [newCourse, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
  };

  const filtered = courses.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false;
    if (trackFilter !== "All Tracks" && c.track !== trackFilter) return false;
    return true;
  });

  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const avgRating = courses.length ? (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1) : "0.0";
  const trackCount = new Set(courses.map((c) => c.track)).size;

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
          <StatCard label="Total Courses" value={courses.length} />
          <StatCard label="Total Enrolled" value={totalEnrolled.toLocaleString()} />
          <StatCard label="Avg Rating" value={`${avgRating} ⭐`} />
          <StatCard label="Tracks" value={trackCount} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 items-start">
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
          <Button variant="primary" onClick={openAddForm}>+ Add Course</Button>
        </div>

        {formOpen && (
          <Card variant="terminal" padding="lg" title={editingId ? "Edit Course" : "Add Course"} className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Input
                  label="Course Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <Input
                  label="Instructor"
                  value={form.instructor}
                  onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                  required
                />
                <Select
                  label="Track"
                  options={trackOptions.map((t) => ({ value: t, label: t }))}
                  value={form.track}
                  onChange={(e) => setForm({ ...form, track: e.target.value })}
                />
                <Select
                  label="Level"
                  options={levelOptions.map((l) => ({ value: l, label: l }))}
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                />
                <Input
                  label="Duration"
                  placeholder="e.g. 8 weeks"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                />
                <Input
                  label="Lessons"
                  type="number"
                  min="0"
                  value={form.lessons}
                  onChange={(e) => setForm({ ...form, lessons: e.target.value })}
                  required
                />
                <Select
                  label="Price Tier"
                  options={priceOptions.map((p) => ({ value: p, label: p }))}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="submit" variant="primary">{editingId ? "Save Changes" : "Add Course"}</Button>
                <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        {filtered.length === 0 ? (
          <EmptyState title="No courses found" description="Try a different search term or track." />
        ) : (
          <Card variant="terminal" padding="none" title="Course Catalog">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F7F5", borderBottom: "1px solid #E2E8E4" }}>
                  {["Course", "Instructor", "Duration", "Enrolled", "Rating", "Price", "Actions"].map((h) => (
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
                    <td className="px-6 py-3.5 font-mono text-xs" style={{ color: "#102019" }}>{c.rating > 0 ? `${c.rating} ⭐` : "New"}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={priceTone[c.price]} mono>
                        {c.price}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      {deleteId === c.id ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete?</span>
                          <button onClick={() => handleDelete(c.id)} className="font-mono text-xs font-semibold" style={{ color: "#C92C2C" }}>Yes</button>
                          <button onClick={() => setDeleteId(null)} className="font-mono text-xs" style={{ color: "#606C66" }}>No</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button onClick={() => openEditForm(c)} className="font-mono text-xs" style={{ color: "#1F7A4B" }}>Edit</button>
                          <button onClick={() => setDeleteId(c.id)} className="font-mono text-xs" style={{ color: "#C92C2C" }}>Delete</button>
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
