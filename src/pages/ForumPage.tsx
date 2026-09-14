import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card, Badge, Button, Input } from "../components/ui";

interface ForumThread {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
}

const threads: ForumThread[] = [
  {
    id: "1",
    title: "Best practices for web development projects",
    category: "Software Development",
    author: "Kagabo Eric",
    replies: 24,
    views: 312,
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    title: "Networking fundamentals questions",
    category: "Networking",
    author: "Patrick Habimana",
    replies: 15,
    views: 189,
    lastActivity: "4 hours ago",
  },
  {
    id: "3",
    title: "UI/UX Design career advice",
    category: "Multimedia",
    author: "Grace Mukamana",
    replies: 31,
    views: 456,
    lastActivity: "1 hour ago",
  },
  {
    id: "4",
    title: "React hooks vs class components",
    category: "Software Development",
    author: "Alice Uwimana",
    replies: 42,
    views: 678,
    lastActivity: "30 mins ago",
  },
];

const categories = ["All", "Software Development", "Networking", "Multimedia"];

export default function ForumPage() {
  return (
    <SiteLayout>
      <div
        style={{
          background: "#071C12",
          borderBottom: "1px solid rgba(53,196,122,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <Link
                to="/student"
                className="inline-block mb-4 text-sm transition-colors"
                style={{ color: "#35C47A" }}
              >
                ← Back to Dashboard
              </Link>
              <h1
                className="text-4xl font-bold mb-3 tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                Community Forum
              </h1>
              <p style={{ color: "#606C66" }}>
                Connect, learn, and share knowledge with other students
              </p>
            </div>
            <Button variant="primary">Start Discussion</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <Input
          placeholder="Search forum discussions..."
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#35C47A"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          }
          className="mb-8"
        />

        <div className="flex gap-2 mb-8">
          {categories.map((cat) => (
            <Badge key={cat} tone="brand" pill>
              {cat}
            </Badge>
          ))}
        </div>

        <div className="space-y-3">
          {threads.map((thread) => (
            <Link key={thread.id} to={`/forum/${thread.id}`}>
              <Card padding="md" className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className="font-semibold text-sm"
                        style={{ color: "#102019" }}
                      >
                        {thread.title}
                      </h3>
                      <Badge tone="info" mono>
                        {thread.category}
                      </Badge>
                    </div>
                    <p
                      className="text-xs mb-3"
                      style={{ color: "#606C66" }}
                    >
                      Started by {thread.author} • {thread.lastActivity}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex gap-4 text-xs" style={{ color: "#606C66" }}>
                      <div>
                        <p className="font-mono font-bold" style={{ color: "#1F7A4B" }}>
                          {thread.replies}
                        </p>
                        <p>replies</p>
                      </div>
                      <div>
                        <p className="font-mono font-bold" style={{ color: "#1F7A4B" }}>
                          {thread.views}
                        </p>
                        <p>views</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
