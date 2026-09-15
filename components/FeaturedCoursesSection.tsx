"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useCourses } from "@/lib/courses/useCourses";

export default function FeaturedCoursesSection() {
  const { courses } = useCourses();
  const featured = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-24 px-6 md:px-8 bg-dg">
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="font-mono text-xs mb-3 text-pg">$ ls ./courses --featured</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white tracking-tight">
              Featured Courses
            </h2>
          </div>
          <Link href="/courses" className="font-semibold text-sm flex items-center gap-2 text-pg">
            View all courses
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, i) => (
            <Reveal key={course.id} delay={i * 90}>
              <Link href={`/courses/${course.id}`} className="block group h-full">
                <div className="h-full rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 bg-dg2 border border-pg/[0.12]">
                  <h3 className="font-bold text-lg mb-2 text-white">{course.title}</h3>
                  <p className="text-xs font-mono mb-4 text-mg">
                    {course.level} · {course.category}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-pg/[0.15] text-pg">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brass">{course.instructor}</p>
                      <p className="text-xs text-mg">Instructor</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-pg/[0.12]">
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#35C47A">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-xs font-mono text-pg">{course.rating}</span>
                      <span className="text-xs text-mg">({course.students.toLocaleString()})</span>
                    </div>
                    <span className="text-xs font-semibold text-pg">View →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
