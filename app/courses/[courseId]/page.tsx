"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Star, Users, Clock, Award, ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/lib/cart/useCart";
import { useCourses } from "@/lib/courses/useCourses";
import { useState } from "react";

export default function CourseDetail({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { getCourseById } = useCourses();
  const [added, setAdded] = useState(false);

  const course = getCourseById(params.courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="px-6 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/courses" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <ArrowLeft size={20} />
            Back to Courses
          </Link>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-forge-soft text-lg">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="h-96 bg-gradient-to-br from-ember-strong to-ember rounded-xl mb-8"></div>

              <div className="prose max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {course.description}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                <ul className="space-y-3 text-gray-600 mb-6">
                  {course.whatYoullLearn.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-ember-strong font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
                <div className="space-y-3">
                  {course.sections.map((section, i) => (
                    <div key={section.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900">{section.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{section.lessons.length} lessons • {section.lessons.reduce((sum, l) => sum + parseInt(l.duration), 0)} min</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              <p className="text-4xl font-bold text-ember-strong mb-6">${course.price}</p>

              <button
                onClick={handleEnroll}
                disabled={added}
                className="w-full px-6 py-3 bg-ember-strong text-white font-semibold rounded-lg hover:bg-ember transition-colors mb-4 disabled:bg-ember flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check size={20} /> Added to Cart
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>

              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Students</p>
                    <p className="font-semibold text-gray-900">{course.students.toLocaleString()} enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{course.durationHours} hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Certificate</p>
                    <p className="font-semibold text-gray-900">Included</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-gray-900">{course.rating}/5.0</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-6 text-center">30-day money-back guarantee</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
