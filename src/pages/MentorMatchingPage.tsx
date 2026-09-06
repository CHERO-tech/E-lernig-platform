import SiteLayout from "../components/SiteLayout";
import { Card, Badge, Button, StatCard } from "../components/ui";

interface Mentor {
  id: string;
  name: string;
  track: string;
  specializations: string[];
  experience: number;
  students: number;
  rating: number;
  availability: "available" | "limited" | "unavailable";
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Emmanuel Nkurunziza",
    track: "Software Development",
    specializations: ["React", "TypeScript", "Web APIs"],
    experience: 8,
    students: 12,
    rating: 4.9,
    availability: "available",
  },
  {
    id: "2",
    name: "Grace Mukamana",
    track: "Multimedia",
    specializations: ["UI/UX Design", "Figma", "User Research"],
    experience: 6,
    students: 8,
    rating: 4.8,
    availability: "limited",
  },
  {
    id: "3",
    name: "Patrick Habimana",
    track: "Networking",
    specializations: ["Network Security", "Linux", "TCP/IP"],
    experience: 10,
    students: 5,
    rating: 5.0,
    availability: "available",
  },
];

const availabilityTone = {
  available: "success" as const,
  limited: "warning" as const,
  unavailable: "danger" as const,
};

export default function MentorMatchingPage() {
  return (
    <SiteLayout>
      <div
        style={{
          background: "#071C12",
          borderBottom: "1px solid rgba(53,196,122,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-12">
          <Link
            to="/student"
            className="inline-block mb-4 text-sm transition-colors"
            style={{ color: "#35C47A" }}
          >
            ← Back to Dashboard
          </Link>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            Find a Mentor
          </h1>
          <p style={{ color: "#718078" }}>
            Connect with experienced professionals in your field
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <StatCard label="Total Mentors" value="47" />
          <StatCard label="Avg Rating" value="4.8/5" />
          <StatCard label="Active Sessions" value="234" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} padding="lg" className="flex flex-col">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className="font-bold text-base"
                      style={{ color: "#102019" }}
                    >
                      {mentor.name}
                    </h3>
                    <p className="text-xs" style={{ color: "#718078" }}>
                      {mentor.track}
                    </p>
                  </div>
                  <Badge tone={availabilityTone[mentor.availability]} pill>
                    {mentor.availability.charAt(0).toUpperCase() +
                      mentor.availability.slice(1)}
                  </Badge>
                </div>

                <div className="mb-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "#718078" }}>Experience</span>
                    <span
                      className="font-mono font-bold"
                      style={{ color: "#35C47A" }}
                    >
                      {mentor.experience} yrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "#718078" }}>Rating</span>
                    <span
                      className="font-mono font-bold"
                      style={{ color: "#35C47A" }}
                    >
                      {mentor.rating} ⭐
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "#718078" }}>Students</span>
                    <span
                      className="font-mono font-bold"
                      style={{ color: "#35C47A" }}
                    >
                      {mentor.students}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.specializations.map((spec) => (
                    <Badge key={spec} tone="neutral" mono>
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                className="mt-auto"
              >
                Request Mentorship
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
