import { useState } from "react";
import SiteLayout from "../components/SiteLayout";
import { Button, Card, Badge, Input, EmptyState } from "../components/ui";

interface HelpArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  views: number;
}

const helpArticles: HelpArticle[] = [
  {
    id: "1",
    category: "Getting Started",
    title: "How to create your account",
    excerpt: "Step-by-step guide to signing up for TVET Digital Academy",
    views: 1240,
  },
  {
    id: "2",
    category: "Getting Started",
    title: "Choosing your learning track",
    excerpt: "Learn about Software Dev, Networking, and Multimedia tracks",
    views: 892,
  },
  {
    id: "3",
    category: "Courses",
    title: "How to enroll in a course",
    excerpt: "Everything you need to know about course enrollment",
    views: 756,
  },
  {
    id: "4",
    category: "Courses",
    title: "Understanding course progress",
    excerpt: "How progress tracking and completion work",
    views: 654,
  },
  {
    id: "5",
    category: "Projects",
    title: "Submitting your first project",
    excerpt: "Guidelines for project submission and mentor review",
    views: 512,
  },
  {
    id: "6",
    category: "Certificates",
    title: "Downloading your certificate",
    excerpt: "How to download and share your verified certificate",
    views: 438,
  },
];

const categories = ["All", "Getting Started", "Courses", "Projects", "Certificates", "Account"];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SiteLayout>
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            Help Center
          </h1>
          <p style={{ color: "#718078" }}>
            Find answers to common questions and get support
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <Input
            placeholder="Search help articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          />
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                tone={selectedCategory === cat ? "brand" : "neutral"}
                pill
                className="cursor-pointer transition-all"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No articles found"
            description="Try adjusting your search or browse by category"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article) => (
              <Card
                key={article.id}
                title={article.title}
                action={
                  <span className="text-xs" style={{ color: "#718078" }}>
                    {article.views} views
                  </span>
                }
              >
                <p
                  className="text-sm mb-4"
                  style={{ color: "#718078" }}
                >
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Badge tone="info" mono>
                    {article.category}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Read More →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
