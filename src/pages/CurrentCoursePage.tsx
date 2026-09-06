import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, Button, EmptyState } from "../components/ui";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "current-course", label: "Current Course", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
  { key: "courses", label: "My Courses", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { key: "paths", label: "Learning Paths", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
  { key: "projects", label: "Projects", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> },
];

const currentCourse = {
  id: "web-dev",
  title: "Web Development",
  instructor: "Emmanuel Nkurunziza",
  rating: 4.8,
  enrolled: 342,
  progress: 72,
  lessons: 18,
  totalLessons: 25,
  nextLesson: "DOM Manipulation",
  description: "Master HTML, CSS, JavaScript and React to build modern web applications.",
};

export default function CurrentCoursePage() {
  const hasEnrolledCourse = true; // In a real app, this would come from localStorage/auth state

  if (!hasEnrolledCourse) {
    return (
      <DashboardLayout
        role="student"
        roleLabel="Student"
        navItems={navItems}
        activeKey="current-course"
        onNav={(key) => {
          if (key === "dashboard") window.location.href = "/student";
          if (key === "courses") window.location.href = "/courses";
        }}
        userName="Amahoro Jean de Dieu"
        userInitials="AJ"
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>$ whoami — student</p>
              <h1 className="text-3xl font-bold" style={{ color: "#102019", letterSpacing: "-0.02em" }}>Current Course</h1>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-96">
            <EmptyState
              icon={
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="1.5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              }
              title="No Active Course"
              description="You're not currently enrolled in any course. Browse available courses and start learning today!"
              action={
                <Link to="/courses">
                  <Button variant="primary">Browse Courses</Button>
                </Link>
              }
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      role="student"
      roleLabel="Student"
      navItems={navItems}
      activeKey="current-course"
      onNav={(key) => {
        if (key === "dashboard") window.location.href = "/student";
        if (key === "courses") window.location.href = "/courses";
      }}
      userName="Amahoro Jean de Dieu"
      userInitials="AJ"
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>$ whoami — student</p>
            <h1 className="text-3xl font-bold" style={{ color: "#102019", letterSpacing: "-0.02em" }}>Current Course</h1>
            <p style={{ color: "#718078" }}>Continue your learning journey</p>
          </div>
          <Link to={`/courses/${currentCourse.id}`}>
            <Button variant="primary">View Full Course</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main course card */}
          <div className="lg:col-span-2">
            <Card padding="lg" title={currentCourse.title} className="mb-6">
              <div className="space-y-4">
                <p style={{ color: "#718078" }}>{currentCourse.description}</p>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b" style={{ borderColor: "#E2E8E4" }}>
                  <div>
                    <p className="text-xs" style={{ color: "#718078" }}>Instructor</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#35C47A", color: "#071C12" }}>
                        {currentCourse.instructor.charAt(0)}
                      </div>
                      <p className="text-sm font-medium" style={{ color: "#102019" }}>{currentCourse.instructor}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#718078" }}>Rating</p>
                    <div className="flex items-center gap-2 mt-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#35C47A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      <span className="text-sm font-mono" style={{ color: "#35C47A" }}>{currentCourse.rating}</span>
                      <span className="text-xs" style={{ color: "#718078" }}>({currentCourse.enrolled.toLocaleString()} enrolled)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Progress section */}
            <Card padding="lg" title="Your Progress" className="mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p style={{ color: "#718078" }}>Lessons Completed</p>
                  <p className="font-mono font-bold" style={{ color: "#35C47A" }}>{currentCourse.lessons} / {currentCourse.totalLessons}</p>
                </div>
                <div className="h-3 rounded-full" style={{ background: "#E2E8E4" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${currentCourse.progress}%`, background: "#35C47A" }} />
                </div>
                <p className="text-xs" style={{ color: "#718078" }}>
                  <span className="font-mono font-semibold" style={{ color: "#35C47A" }}>{currentCourse.progress}%</span> complete
                </p>
              </div>
            </Card>

            {/* Next lesson */}
            <Card padding="lg" title="Next Lesson">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(53,196,122,0.1)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35C47A" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" style={{ color: "#102019" }}>{currentCourse.nextLesson}</h3>
                    <p className="text-sm" style={{ color: "#718078" }}>Continue from where you left off</p>
                  </div>
                </div>
                <Link to={`/courses/${currentCourse.id}`} className="block">
                  <Button variant="primary" fullWidth>
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick stats */}
            <Card padding="lg" title="Quick Stats">
              <div className="space-y-3">
                <div>
                  <p className="text-xs" style={{ color: "#718078" }}>Duration</p>
                  <p className="font-semibold text-sm mt-1" style={{ color: "#102019" }}>12 weeks</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#718078" }}>Level</p>
                  <p className="font-semibold text-sm mt-1" style={{ color: "#35C47A" }}>Intermediate</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#718078" }}>Lessons</p>
                  <p className="font-semibold text-sm mt-1" style={{ color: "#102019" }}>{currentCourse.totalLessons} lessons</p>
                </div>
              </div>
            </Card>

            {/* Action buttons */}
            <div className="space-y-2">
              <Link to={`/courses/${currentCourse.id}`} className="block">
                <Button variant="outline" fullWidth>View Course Details</Button>
              </Link>
              <Button variant="ghost" fullWidth>Download Resources</Button>
              <Button variant="ghost" fullWidth>Get Help</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
