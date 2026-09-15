"use client";

import Link from "next/link";
import { Search, Star, Clock, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { Badge, EmptyState } from "@/components/ui";
import BrandMark from "@/components/BrandMark";

const levelTone = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
} as const;

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("All");
  const { courses } = useCourses();

  const categories = useMemo(() => ["All", ...Array.from(new Set(courses.map((c) => c.category)))], [courses]);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || c.category === category)
  );

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-dg border-b border-pg/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-white font-mono font-semibold hover:opacity-80">
            <BrandMark />
            FORGE
          </Link>
          <p className="font-mono text-xs mb-2 text-pg">$ ls ./courses --all</p>
          <h1 className="text-4xl font-bold mb-3 text-white tracking-tight">Explore Courses</h1>
          <p className="text-mg">
            {courses.length} courses across {categories.length - 1} learning tracks
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mg" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none bg-white border border-border text-dt focus:border-pg"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8 border-b border-border pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat ? "bg-pg/10 text-pg2" : "text-mg hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No courses found" description="Try a different search term or track." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => {
              const lessonCount = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="rounded-lg overflow-hidden transition-all hover:shadow-lg h-full flex flex-col bg-white border border-border"
                >
                  <div className="h-32 relative bg-gradient-to-br from-dg2 to-dg flex items-center justify-center">
                    <span className="text-3xl font-bold text-pg/40 font-mono">{course.title[0]}</span>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold bg-pg text-dg">
                      {course.price === 0 ? "Free" : `$${course.price}`}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-sm mb-2 text-dt">{course.title}</h3>
                    <div className="mb-3">
                      <Badge tone={levelTone[course.level]} mono>
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-xs mb-4 flex-1 text-mg line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-pg text-dg">
                        {course.instructor.charAt(0)}
                      </div>
                      <p className="text-xs text-mg">{course.instructor}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-mg">
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-pg2" fill="currentColor" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {lessonCount} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {course.durationHours}h
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
