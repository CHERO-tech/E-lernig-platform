"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Users, Clock, Award, ArrowLeft, Check, GraduationCap, BarChart3, Bookmark } from "lucide-react";
import { useCart } from "@/lib/cart/useCart";
import { useCourses } from "@/lib/courses/useCourses";
import { useAuth } from "@/lib/auth/useAuth";
import { useBookmarks } from "@/lib/bookmarks/useBookmarks";
import { use, useState } from "react";
import BrandMark from "@/components/BrandMark";
import Badge from "@/components/ui/Badge";
import { formatCategoryLabel } from "@/lib/courses/formatCategoryLabel";
import CourseThumbnail from "@/components/CourseThumbnail";

export default function CourseDetail({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { getCourseById } = useCourses();
  const { isAuthenticated } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [added, setAdded] = useState(false);
  const { courseId } = use(params);

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Course Not Found</h1>
          <p className="mb-8 text-mg">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/courses" className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleBookmark = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    toggleBookmark(course.id);
  };

  const handleEnroll = () => {
    addItem({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
    });
    setAdded(true);
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-dg border-b border-pg/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
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
          <p className="font-mono text-xs mb-2 text-pg">
            $ cat ./courses/{course.id}
          </p>
          <h1 className="text-4xl font-bold mb-2 text-white tracking-tight">{course.title}</h1>
          <p className="text-sm mb-4 text-brass">Taught by {course.instructor}</p>
          <p className="text-lg text-brass max-w-2xl">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl p-6 bg-white border border-border">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge tone="brand">{formatCategoryLabel(course.category)}</Badge>
                <Badge tone="neutral">{course.level}</Badge>
              </div>
              <h2 className="text-xl font-bold mb-4 text-dt">About this course</h2>
              <p className="leading-relaxed text-mg">{course.description}</p>
            </div>

            <div className="rounded-xl p-6 bg-white border border-border">
              <h2 className="text-xl font-bold mb-4 text-dt">What you&apos;ll learn</h2>
              <ul className="space-y-3">
                {course.whatYoullLearn.map((item, i) => (
                  <li key={i} className="flex gap-3 text-mg">
                    <Check size={18} className="text-pg2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl overflow-hidden bg-white border border-border">
              <div className="px-6 py-4 bg-dg2">
                <h2 className="font-bold text-white">Course Content</h2>
              </div>
              <div className="divide-y divide-border">
                {course.sections.map((section) => (
                  <div key={section.id} className="p-4">
                    <p className="font-semibold text-dt">{section.title}</p>
                    <p className="text-sm mt-1 text-mg">
                      {section.lessons.length} lessons ·{" "}
                      {section.lessons.reduce((sum, l) => sum + parseInt(l.duration), 0)} min
                    </p>
                  </div>
                ))}
              </div>
              {(course.quizzes.length > 0 || course.assignments.length > 0) && (
                <div className="px-4 py-3 bg-ow text-sm text-mg border-t border-border">
                  Also includes {course.quizzes.length > 0 && `${course.quizzes.length} quiz${course.quizzes.length !== 1 ? "zes" : ""}`}
                  {course.quizzes.length > 0 && course.assignments.length > 0 && " and "}
                  {course.assignments.length > 0 && `${course.assignments.length} assignment${course.assignments.length !== 1 ? "s" : ""}`}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 sticky top-6 bg-white border border-border">
              <CourseThumbnail
                title={course.title}
                thumbnail={course.thumbnail}
                className="h-40 w-full rounded-lg mb-6"
              />
              <p className="font-mono text-4xl font-bold mb-6 text-pg2">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </p>

              <button
                onClick={handleEnroll}
                disabled={added}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all mb-3 flex items-center justify-center gap-2 bg-pg text-dg hover:brightness-110 disabled:opacity-70"
              >
                {added ? (
                  <>
                    <Check size={20} /> Added to Cart
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>

              <button
                onClick={handleToggleBookmark}
                className="w-full px-6 py-2.5 rounded-lg font-medium transition-colors mb-4 flex items-center justify-center gap-2 border border-border text-dt hover:bg-ow"
              >
                <Bookmark size={18} className={isBookmarked(course.id) ? "fill-pg2 text-pg2" : "text-mg"} />
                {isBookmarked(course.id) ? "Saved" : "Save for Later"}
              </button>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-mg" />
                  <div>
                    <p className="text-sm text-mg">Instructor</p>
                    <p className="font-semibold text-dt">{course.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} className="text-mg" />
                  <div>
                    <p className="text-sm text-mg">Level</p>
                    <p className="font-semibold text-dt">{course.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-mg" />
                  <div>
                    <p className="text-sm text-mg">Students</p>
                    <p className="font-semibold text-dt">{course.students.toLocaleString()} enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-mg" />
                  <div>
                    <p className="text-sm text-mg">Duration</p>
                    <p className="font-semibold text-dt">{course.durationHours} hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-mg" />
                  <div>
                    <p className="text-sm text-mg">Certificate</p>
                    <p className="font-semibold text-dt">Included</p>
                    <p className="text-xs text-mg mt-0.5">
                      Complete every lesson{course.quizzes.length > 0 ? " and pass every quiz" : ""} to earn it
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-pg2" fill="currentColor" />
                  <div>
                    <p className="text-sm text-mg">Rating</p>
                    <p className="font-semibold text-dt">{course.rating}/5.0</p>
                  </div>
                </div>
              </div>

              <p className="text-xs mt-6 text-center text-mg">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
