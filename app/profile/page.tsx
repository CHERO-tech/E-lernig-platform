"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { useCourses } from "@/lib/courses/useCourses";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { Mail, MapPin, Award, BookOpen, Star, Zap, Edit, Share2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { copyShareLink } from "@/lib/utils/share";
import { calculateCourseProgress } from "@/lib/enrollment/calculateProgress";
import { getEarnedCertificates } from "@/lib/enrollment/getEarnedCertificates";
import { calculateUserPoints } from "@/lib/points/calculatePoints";
import { listAllEndorsements } from "@/lib/shared/crossAccountStore";
import { getAchievements } from "@/lib/achievements/getAchievements";

function ProfileContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { enrollments } = useEnrollment();
  const { courses, getCourseById } = useCourses();
  const { addNotification } = useNotifications();

  const handleShareProfile = async () => {
    const copied = await copyShareLink();
    addNotification({
      type: "system",
      icon: "🔗",
      title: copied ? "Link Copied" : "Copy Failed",
      message: copied
        ? "Your profile link has been copied to the clipboard."
        : "Could not copy the link. Please copy it from your browser's address bar.",
    });
  };

  const coursesCompleted = useMemo(
    () =>
      enrollments.filter((e) => {
        const course = getCourseById(e.courseId);
        return course ? calculateCourseProgress(e, course).percentComplete === 100 : false;
      }).length,
    [enrollments, getCourseById]
  );

  const certificates = useMemo(
    () => (user ? getEarnedCertificates(user.id, enrollments, getCourseById) : []),
    [user, enrollments, getCourseById]
  );

  const points = useMemo(() => calculateUserPoints(enrollments, courses), [enrollments, courses]);

  const achievements = useMemo(
    () => (user ? getAchievements(user.id, enrollments, courses, getCourseById) : []),
    [user, enrollments, courses, getCourseById]
  );

  const mySkills = useMemo(() => {
    if (!user) return [];
    return Array.from(
      new Set(listAllEndorsements().filter((e) => e.studentId === user.id).map((e) => e.skill))
    );
  }, [user]);

  const joinedLabel = useMemo(() => {
    if (!user?.createdAt) return null;
    const date = new Date(user.createdAt);
    return isNaN(date.getTime()) ? null : date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [user]);

  const stats = [
    { label: "Courses Completed", value: String(coursesCompleted), icon: BookOpen },
    { label: "Certificates Earned", value: String(certificates.length), icon: Award },
    { label: "Points Earned", value: String(points), icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-ow">
      {/* Header */}
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Profile</h1>
          <Link href="/settings" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Edit size={18} /> Edit
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg border border-border p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar */}
            <Avatar value={user?.avatar} name={user?.name} className="w-32 h-32 rounded-full text-5xl flex-shrink-0" />

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-dt mb-2">{user?.name}</h2>
              <p className="text-mg mb-4 capitalize">
                {user?.role}
                {joinedLabel ? ` • Joined ${joinedLabel}` : ""}
              </p>
              <p className="text-dt mb-6">
                {user?.bio || (
                  <span className="text-mg italic">
                    No bio yet. <Link href="/settings" className="underline hover:text-dt">Add one in Settings.</Link>
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-mg">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {user?.email}
                </div>
                {user?.location ? (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {user.location}
                  </div>
                ) : (
                  <Link href="/settings" className="flex items-center gap-2 underline hover:text-dt">
                    <MapPin size={16} /> Add your location
                  </Link>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleShareProfile}
                  className="px-6 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors flex items-center gap-2"
                >
                  <Share2 size={16} /> Share Profile
                </button>
                <Link href="/settings" className="px-6 py-2 border border-border text-dt rounded-lg font-medium hover:bg-ow transition-colors flex items-center gap-2">
                  <Edit size={16} /> Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-border p-6 text-center">
                <div className="w-12 h-12 bg-forge-soft text-ember-strong rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-bold text-dt mb-1">{stat.value}</p>
                <p className="text-mg">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-lg border border-border p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-dt">Endorsed Skills</h3>
            <Link href="/skill-endorsements" className="text-ember-strong hover:text-ember2 font-medium text-sm">
              Manage skills
            </Link>
          </div>
          {mySkills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {mySkills.map((skill, i) => (
                <div key={i} className="px-4 py-2 bg-forge-soft text-ember2 rounded-full text-sm font-medium border border-brass-soft">
                  {skill}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-mg text-sm">
              No skills endorsed yet.{" "}
              <Link href="/skill-endorsements" className="underline hover:text-dt">
                Ask peers or trainers to endorse your skills.
              </Link>
            </p>
          )}
        </motion.div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-lg border border-border p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-dt">Certificates Earned</h3>
            <Link href="/certificates" className="text-ember-strong hover:text-ember2 font-medium">View all</Link>
          </div>

          {certificates.length === 0 ? (
            <p className="text-mg text-sm">
              No certificates yet.{" "}
              <Link href="/courses" className="underline hover:text-dt">
                Enroll in a course
              </Link>{" "}
              and complete every lesson and quiz to earn one.
            </p>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert, i) => {
                const course = getCourseById(cert.courseId);
                return (
                  <motion.div
                    key={cert.courseId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                    className="p-4 border border-border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-dt mb-1">{cert.courseTitle}</h4>
                        <p className="text-sm text-mg">by {cert.instructor}</p>
                      </div>
                      <div className="text-right">
                        {course && (
                          <div className="flex items-center gap-1 mb-1">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-dt">{course.rating}</span>
                          </div>
                        )}
                        <p className="text-xs text-mg">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Award size={16} className="text-ember-strong" />
                      <span className="text-sm text-ember-strong font-medium">Certificate earned · Scored {cert.score}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <button
            onClick={() => router.push("/certificates")}
            className="w-full mt-6 px-4 py-3 border border-ember-strong text-ember-strong font-medium rounded-lg hover:bg-forge-soft transition-colors"
          >
            View All Certificates
          </button>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-lg border border-border p-8 mt-8"
        >
          <h3 className="text-2xl font-bold text-dt mb-6">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                title={achievement.description}
                className={`text-center p-4 rounded-lg transition-colors ${
                  achievement.earned ? "bg-forge-soft" : "bg-ow opacity-40 grayscale"
                }`}
              >
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <p className="font-semibold text-dt text-sm mb-1">{achievement.title}</p>
                <p className="text-xs text-mg">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
