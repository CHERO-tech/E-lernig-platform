"use client";

import Link from "next/link";
import { ArrowLeft, Star, Users, BookOpen } from "lucide-react";
import { useCourses } from "@/lib/courses/useCourses";
import BrandMark from "@/components/BrandMark";

export default function InstructorsPage() {
  const { courses } = useCourses();
  const published = courses.filter((c) => c.published !== false);

  const instructors = Array.from(new Set(published.map((c) => c.instructor)))
    .map((name) => {
      const theirCourses = published.filter((c) => c.instructor === name);
      const totalStudents = theirCourses.reduce((sum, c) => sum + c.students, 0);
      const avgRating =
        theirCourses.length > 0
          ? theirCourses.reduce((sum, c) => sum + c.rating, 0) / theirCourses.length
          : 0;
      return { name, courses: theirCourses, totalStudents, avgRating };
    })
    .sort((a, b) => b.totalStudents - a.totalStudents);

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
          <h1 className="text-4xl font-bold mb-4 text-white tracking-tight">Instructors</h1>
          <p className="text-lg text-brass max-w-2xl">The people teaching Forge courses.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {instructors.length === 0 ? (
          <p className="text-mg">No instructors yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <div key={instructor.name} className="rounded-xl p-6 bg-white border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold bg-pg text-dg text-lg shrink-0">
                    {instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-dt">{instructor.name}</p>
                    <p className="text-xs text-mg">
                      {instructor.courses.length} course{instructor.courses.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-mg mb-4 pb-4 border-b border-border">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-pg2" fill="currentColor" />
                    {instructor.avgRating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {instructor.totalStudents.toLocaleString()} students
                  </span>
                </div>

                <div className="space-y-2">
                  {instructor.courses.slice(0, 3).map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="flex items-center gap-2 text-sm text-dt hover:text-pg2 transition-colors"
                    >
                      <BookOpen size={14} className="text-mg shrink-0" />
                      <span className="truncate">{course.title}</span>
                    </Link>
                  ))}
                  {instructor.courses.length > 3 && (
                    <p className="text-xs text-mg">+{instructor.courses.length - 3} more</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
