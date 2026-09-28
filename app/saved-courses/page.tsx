"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, Bookmark, Star, Clock } from "lucide-react";
import { useCourses } from "@/lib/courses/useCourses";
import { useBookmarks } from "@/lib/bookmarks/useBookmarks";
import { EmptyState } from "@/components/ui";
import CourseThumbnail from "@/components/CourseThumbnail";

function SavedCoursesContent() {
  const router = useRouter();
  const { courses } = useCourses();
  const { bookmarkedCourseIds, toggleBookmark } = useBookmarks();

  const savedCourses = courses.filter((c) => bookmarkedCourseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-mg hover:text-dt transition-colors mb-3">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-3">
            <Bookmark size={28} className="text-pg2" />
            <h1 className="text-3xl font-bold text-dt">Saved Courses</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {savedCourses.length === 0 ? (
          <EmptyState
            icon={<Bookmark size={48} className="text-pg2" />}
            title="No saved courses yet"
            description="Tap the bookmark icon on any course to save it here for later."
            action={
              <Link href="/courses" className="inline-block px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110 transition-all">
                Browse Courses
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCourses.map((course) => (
              <div key={course.id} className="rounded-lg overflow-hidden bg-white border border-border flex flex-col">
                <Link href={`/courses/${course.id}`} className="block">
                  <CourseThumbnail title={course.title} thumbnail={course.thumbnail} className="h-32 w-full" />
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="font-bold text-sm mb-2 text-dt hover:text-pg2 transition-colors">{course.title}</h3>
                  </Link>
                  <p className="text-xs mb-3 text-mg">by {course.instructor}</p>
                  <div className="flex items-center justify-between text-xs text-mg mb-4">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-pg2" fill="currentColor" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {course.durationHours}h
                    </span>
                    <span className="font-semibold text-dt">{course.price === 0 ? "Free" : `$${course.price}`}</span>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex-1 text-center px-3 py-2 bg-pg/10 text-pg2 rounded-lg text-xs font-medium hover:bg-pg/20"
                    >
                      View Course
                    </Link>
                    <button
                      onClick={() => toggleBookmark(course.id)}
                      className="px-3 py-2 border border-border text-dt rounded-lg text-xs font-medium hover:bg-ow"
                      aria-label={`Remove ${course.title} from saved courses`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SavedCoursesPage() {
  return (
    <ProtectedRoute>
      <SavedCoursesContent />
    </ProtectedRoute>
  );
}
