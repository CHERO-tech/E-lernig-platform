"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useCourses } from "@/lib/courses/useCourses";
import { formatCategoryLabel } from "@/lib/courses/formatCategoryLabel";
import BrandMark from "@/components/BrandMark";

export default function CategoriesPage() {
  const { courses } = useCourses();
  const published = courses.filter((c) => c.published !== false);

  const categories = Array.from(new Set(published.map((c) => c.category)))
    .map((category) => {
      const categoryCourses = published.filter((c) => c.category === category);
      const totalStudents = categoryCourses.reduce((sum, c) => sum + c.students, 0);
      return { category, count: categoryCourses.length, totalStudents };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-dg border-b border-pg/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/courses" className="inline-flex items-center gap-2 text-brass hover:text-white transition-colors">
              <ArrowLeft size={20} />
              Back to Courses
            </Link>
            <Link href="/" className="flex items-center gap-2 text-white font-mono font-semibold">
              <BrandMark />
              FORGE
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white tracking-tight">Browse by Category</h1>
          <p className="text-lg text-brass max-w-2xl">Find courses in the track you care about.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {categories.length === 0 ? (
          <p className="text-mg">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(({ category, count, totalStudents }) => (
              <Link
                key={category}
                href={`/search?category=${encodeURIComponent(category)}`}
                className="rounded-xl p-6 bg-white border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-pg/10 flex items-center justify-center mb-4">
                  <BookOpen size={22} className="text-pg2" />
                </div>
                <h3 className="font-bold text-dt mb-1">{formatCategoryLabel(category)}</h3>
                <p className="text-sm text-mg">
                  {count} course{count !== 1 ? "s" : ""} · {totalStudents.toLocaleString()} students
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
