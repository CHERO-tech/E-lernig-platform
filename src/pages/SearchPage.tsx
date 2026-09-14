import { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Input, Card, Badge, EmptyState } from "../components/ui";

interface SearchResult {
  id: string;
  type: "course" | "forum" | "blog";
  title: string;
  description: string;
  category?: string;
  relevance: number;
}

const allResults: SearchResult[] = [
  {
    id: "1",
    type: "course",
    title: "Advanced Web Development",
    description: "Master modern web technologies and best practices.",
    category: "Software Development",
    relevance: 95,
  },
  {
    id: "2",
    type: "forum",
    title: "Best practices for web development projects",
    description: "Discussion thread with 24 replies about industry standards.",
    category: "Software Development",
    relevance: 88,
  },
  {
    id: "3",
    type: "blog",
    title: "The Future of Web Development in 2026",
    description: "Insights into emerging technologies shaping the web.",
    relevance: 82,
  },
  {
    id: "4",
    type: "course",
    title: "Responsive Design Fundamentals",
    description: "Build websites that work on all devices.",
    category: "Multimedia",
    relevance: 75,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const filtered = query.length > 0
    ? allResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const typeColor = {
    course: "brand",
    forum: "info",
    blog: "neutral",
  } as const;

  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-8 py-12">
        <Link
          to="/student"
          className="inline-block mb-6 text-sm transition-colors"
          style={{ color: "#1F7A4B" }}
        >
          ← Back to Dashboard
        </Link>
        <div className="mb-12">
          <h1
            className="text-page-title mb-4"
            style={{ color: "#102019" }}
          >
            Search
          </h1>
          <Input
            placeholder="Search courses, discussions, articles..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
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

        {query.length === 0 ? (
          <EmptyState
            title="Start searching"
            description="Enter a keyword to find courses, forum discussions, and blog posts."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No results found"
            description={`We couldn't find anything matching "${query}". Try a different search term.`}
          />
        ) : (
          <div>
            <p
              className="text-sm mb-6"
              style={{ color: "#606C66" }}
            >
              Found {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query}"
            </p>
            <div className="space-y-4">
              {filtered.map((result) => (
                <Card key={result.id} padding="md" className="hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge tone={typeColor[result.type]} mono>
                          {result.type.charAt(0).toUpperCase() +
                            result.type.slice(1)}
                        </Badge>
                        {result.category && (
                          <span className="text-xs" style={{ color: "#606C66" }}>
                            {result.category}
                          </span>
                        )}
                      </div>
                      <h3
                        className="font-semibold text-sm mb-2"
                        style={{ color: "#102019" }}
                      >
                        {result.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "#606C66" }}
                      >
                        {result.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-xs font-mono font-bold"
                        style={{ color: "#1F7A4B" }}
                      >
                        {result.relevance}%
                      </p>
                      <p className="text-xs" style={{ color: "#606C66" }}>
                        match
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
