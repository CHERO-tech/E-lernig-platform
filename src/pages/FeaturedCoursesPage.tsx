import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Badge, Button } from "../components/ui";
import webDevImg from "../images.jpeg";
import progFundImg from "../images3.jpeg";
import networkImg from "../computer_network.webp";
import securityImg from "../network s.jpeg";
import uiuxImg from "../images.png";
import graphicImg from "../still-life-graphic-design-studio_23-2151320690.jpg";

interface FeaturedCourse {
  id: string;
  title: string;
  track: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  rating: number;
  enrolled: number;
  desc: string;
  image: string;
}

const featuredCourses: FeaturedCourse[] = [
  {
    id: "web-dev",
    title: "Web Development",
    track: "Software Dev",
    level: "Intermediate",
    instructor: "Emmanuel Nkurunziza",
    rating: 4.8,
    enrolled: 342,
    desc: "Master HTML, CSS, JavaScript and React to build modern web applications.",
    image: webDevImg,
  },
  {
    id: "prog-fundamentals",
    title: "Programming Fundamentals",
    track: "Software Dev",
    level: "Beginner",
    instructor: "Alice Uwimana",
    rating: 4.9,
    enrolled: 521,
    desc: "Start your coding journey with Python and fundamental programming concepts.",
    image: progFundImg,
  },
  {
    id: "networking",
    title: "Computer Networking",
    track: "Networking",
    level: "Intermediate",
    instructor: "Patrick Habimana",
    rating: 4.7,
    enrolled: 198,
    desc: "Understand network protocols, topologies, and infrastructure design.",
    image: networkImg,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    track: "Multimedia",
    level: "Beginner",
    instructor: "Grace Mukamana",
    rating: 4.9,
    enrolled: 287,
    desc: "Design beautiful, user-centered interfaces and exceptional experiences.",
    image: uiuxImg,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    track: "Multimedia",
    level: "Beginner",
    instructor: "Grace Mukamana",
    rating: 4.7,
    enrolled: 203,
    desc: "Learn visual design, typography, and creative composition principles.",
    image: graphicImg,
  },
  {
    id: "network-security",
    title: "Network Security",
    track: "Networking",
    level: "Advanced",
    instructor: "Patrick Habimana",
    rating: 4.6,
    enrolled: 112,
    desc: "Protect networks with advanced security techniques and best practices.",
    image: securityImg,
  },
];

export default function FeaturedCoursesPage() {
  return (
    <SiteLayout>
      {/* Header */}
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-mono text-xs mb-2" style={{ color: "#35C47A" }}>
                $ ls ./courses --featured
              </p>
              <h1
                className="text-4xl font-bold"
                style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
              >
                Featured Courses
              </h1>
            </div>
            <Link to="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
          <p style={{ color: "#718078" }}>
            Explore our most popular courses across all learning tracks
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`}>
              <div
                className="rounded-lg overflow-hidden transition-all hover:shadow-lg h-full flex flex-col"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8E4" }}
              >
                {/* Course Image */}
                <div className="h-40 relative overflow-hidden bg-gray-200">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold"
                    style={{ background: "rgba(53,196,122,0.9)", color: "#071C12" }}
                  >
                    Featured
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Title */}
                  <h3
                    className="font-bold text-sm mb-2 line-clamp-2"
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
                    className="text-xs mb-4 flex-1 line-clamp-2"
                    style={{ color: "#718078" }}
                  >
                    {course.desc}
                  </p>

                  {/* Instructor */}
                  <div
                    className="flex items-center gap-2 mb-3 pb-3 border-b"
                    style={{ borderColor: "#E2E8E4" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "#35C47A", color: "#071C12" }}
                    >
                      {course.instructor.charAt(0)}
                    </div>
                    <p className="text-xs" style={{ color: "#718078" }}>
                      {course.instructor}
                    </p>
                  </div>

                  {/* Stats */}
                  <div
                    className="flex items-center justify-between text-xs"
                    style={{ color: "#718078" }}
                  >
                    <div className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="#35C47A"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-mono">{course.rating}</span>
                    </div>
                    <span>{course.enrolled.toLocaleString()} enrolled</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
