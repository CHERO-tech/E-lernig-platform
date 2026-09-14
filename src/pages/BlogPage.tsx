import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card, Badge } from "../components/ui";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2026",
    excerpt: "Explore emerging technologies and trends shaping the web development landscape this year.",
    author: "Emmanuel Nkurunziza",
    date: "Sep 15, 2026",
    category: "Web Development",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Networking Fundamentals Every Developer Should Know",
    excerpt: "A comprehensive guide to understanding network protocols and how they power the internet.",
    author: "Patrick Habimana",
    date: "Sep 12, 2026",
    category: "Networking",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Design Systems: Building Better User Experiences",
    excerpt: "Learn how to create and maintain a design system that scales across your organization.",
    author: "Grace Mukamana",
    date: "Sep 10, 2026",
    category: "Design",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
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
            className="text-4xl font-bold mb-3 tracking-tight"
            style={{ color: "#FFFFFF" }}
          >
            Blog
          </h1>
          <p style={{ color: "#606C66" }}>
            Insights, tips, and stories from the TVET community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card
                padding="lg"
                className="h-full flex flex-col hover:shadow-md transition-shadow"
              >
                <Badge tone="info" mono className="mb-3 w-fit">
                  {post.category}
                </Badge>
                <h3
                  className="font-bold text-base mb-2 flex-1"
                  style={{ color: "#102019" }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "#606C66" }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs" style={{ color: "#606C66" }}>
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-xs mt-2 font-mono" style={{ color: "#1F7A4B" }}>
                  {post.readTime}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
