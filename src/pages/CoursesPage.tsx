import { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Badge, Button } from "../components/ui";
import webDevImg from "../images.jpeg";
import progFundImg from "../images3.jpeg";
import networkImg from "../computer_network.webp";
import securityImg from "../network s.jpeg";
import uiuxImg from "../images.png";
import graphicImg from "../still-life-graphic-design-studio_23-2151320690.jpg";
import dbImg from "../images.jpeg";
import mobileImg from "../mobile dev.jpeg";
import videoImg from "../videoedit.jpeg";

interface Course {
  id: string;
  title: string;
  track: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  instructor: string;
  rating: number;
  enrolled: number;
  price: "Free" | "Professional" | "Career";
  progress: number;
  image: string;
  desc: string;
  status: "active" | "complete" | "favourite" | "recommended";
  lessons: number;
}

const allCourses: Course[] = [
  {
    id: "web-dev",
    title: "Web Development",
    track: "Software Dev",
    level: "Intermediate",
    duration: "12 weeks",
    instructor: "Emmanuel Nkurunziza",
    rating: 4.8,
    enrolled: 342,
    price: "Professional",
    progress: 72,
    image: webDevImg,
    desc: "Master HTML, CSS, JavaScript and React.",
    status: "active",
    lessons: 25,
  },
  {
    id: "prog-fundamentals",
    title: "Programming Fundamentals",
    track: "Software Dev",
    level: "Beginner",
    duration: "8 weeks",
    instructor: "Alice Uwimana",
    rating: 4.9,
    enrolled: 521,
    price: "Free",
    progress: 0,
    image: progFundImg,
    desc: "Start your coding journey with Python.",
    status: "recommended",
    lessons: 20,
  },
  {
    id: "networking",
    title: "Computer Networking",
    track: "Networking",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "Patrick Habimana",
    rating: 4.7,
    enrolled: 198,
    price: "Professional",
    progress: 45,
    image: networkImg,
    desc: "Understand network protocols and topologies.",
    status: "active",
    lessons: 20,
  },
  {
    id: "network-security",
    title: "Network Security",
    track: "Networking",
    level: "Advanced",
    duration: "14 weeks",
    instructor: "Patrick Habimana",
    rating: 4.6,
    enrolled: 112,
    price: "Career",
    progress: 0,
    image: securityImg,
    desc: "Protect networks with advanced techniques.",
    status: "recommended",
    lessons: 28,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    track: "Multimedia",
    level: "Beginner",
    duration: "8 weeks",
    instructor: "Grace Mukamana",
    rating: 4.9,
    enrolled: 287,
    price: "Professional",
    progress: 30,
    image: uiuxImg,
    desc: "Design beautiful user-centered interfaces.",
    status: "active",
    lessons: 18,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    track: "Multimedia",
    level: "Beginner",
    duration: "6 weeks",
    instructor: "Grace Mukamana",
    rating: 4.7,
    enrolled: 203,
    price: "Free",
    progress: 0,
    image: graphicImg,
    desc: "Learn visual design and typography.",
    status: "recommended",
    lessons: 15,
  },
  {
    id: "databases",
    title: "Database Systems",
    track: "Software Dev",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "Emmanuel Nkurunziza",
    rating: 4.6,
    enrolled: 175,
    price: "Professional",
    progress: 0,
    image: dbImg,
    desc: "Master SQL and database design.",
    status: "recommended",
    lessons: 22,
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    track: "Software Dev",
    level: "Advanced",
    duration: "16 weeks",
    instructor: "Alice Uwimana",
    rating: 4.5,
    enrolled: 89,
    price: "Career",
    progress: 0,
    image: mobileImg,
    desc: "Build cross-platform mobile apps.",
    status: "recommended",
    lessons: 30,
  },
  {
    id: "video-editing",
    title: "Video Editing",
    track: "Multimedia",
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "Jean-Paul Gasana",
    rating: 4.8,
    enrolled: 156,
    price: "Professional",
    progress: 0,
    image: videoImg,
    desc: "Create professional videos efficiently.",
    status: "recommended",
    lessons: 16,
  },
];

const priceColor = (price: string) => {
  if (price === "Free") return "#35C47A";
  if (price === "Professional") return "#C17F33";
  return "#D64545";
};

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "complete" | "favourite">("all");

  const getCoursesByTab = () => {
    const active = allCourses.filter((c) => c.status === "active");
    const complete = allCourses.filter((c) => c.status === "complete");
    const favourite = allCourses.filter((c) => c.status === "favourite");
    const recommended = allCourses.filter((c) => c.status === "recommended");

    if (activeTab === "active") return active;
    if (activeTab === "complete") return complete;
    if (activeTab === "favourite") return favourite;
    return [...active, ...recommended];
  };

  const filtered = getCoursesByTab();
  const active = allCourses.filter((c) => c.status === "active");
  const complete = allCourses.filter((c) => c.status === "complete");
  const favourite = allCourses.filter((c) => c.status === "favourite");

  return (
    <SiteLayout>
      {/* Header */}
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>
                $ ls ./courses --all
              </p>
              <h1
                className="text-4xl font-bold tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                Our Courses
              </h1>
            </div>
            <Link to="/assessment-placement">
              <Button variant="outline">Take Placement Exam</Button>
            </Link>
          </div>
          <p style={{ color: "#606C66" }}>
            Explore {allCourses.length} courses across 3 learning tracks
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex gap-2 border-b" style={{ borderColor: "#E2E8E4" }}>
          {[
            { key: "all" as const, label: "All Courses", count: allCourses.length },
            { key: "active" as const, label: "Active", count: active.length },
            { key: "complete" as const, label: "Complete", count: complete.length },
            { key: "favourite" as const, label: "Favourite", count: favourite.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-4 py-3 font-medium text-sm transition-colors"
              style={{
                color: activeTab === tab.key ? "#1F7A4B" : "#606C66",
                borderBottom: activeTab === tab.key ? "2px solid #35C47A" : "none",
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`}>
              <div
                className="rounded-lg overflow-hidden transition-all hover:shadow-lg h-full flex flex-col"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}
              >
                {/* Course Image Header */}
                <div className="h-40 relative overflow-hidden bg-border">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold" style={{ background: priceColor(course.price), color: "#FFFFFF" }}>
                    {course.price === "Free" ? "Free" : `$${course.price === "Professional" ? "29" : "99"}`}
                  </div>
                  {course.progress > 0 && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ background: "#E2E8E4" }}
                    >
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${course.progress}%`,
                          background: "#35C47A",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Title */}
                  <h3
                    className="font-bold text-sm mb-2"
                    style={{ color: "#102019" }}
                  >
                    {course.title}
                  </h3>

                  {/* Level Badge */}
                  <div className="mb-3">
                    <Badge
                      tone={
                        course.level === "Beginner"
                          ? "success"
                          : course.level === "Intermediate"
                            ? "warning"
                            : "danger"
                      }
                      mono
                    >
                      {course.level}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs mb-4 flex-1"
                    style={{ color: "#606C66" }}
                  >
                    {course.desc}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b" style={{ borderColor: "#E2E8E4" }}>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "#35C47A", color: "#071C12" }}
                    >
                      {course.instructor.charAt(0)}
                    </div>
                    <p className="text-xs" style={{ color: "#606C66" }}>
                      {course.instructor}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs" style={{ color: "#606C66" }}>
                    <span>⭐ {course.rating}</span>
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: "#606C66" }}>No courses found in this category.</p>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
