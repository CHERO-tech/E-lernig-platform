"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Zap } from "lucide-react";
import { useState } from "react";

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState<"students" | "trainers" | "skills">("students");

  const topStudents = [
    { rank: 1, name: "Sarah Chen", avatar: "SC", courses: 12, certificates: 11, streak: 45, points: 2850 },
    { rank: 2, name: "Mike Johnson", avatar: "MJ", courses: 10, certificates: 9, streak: 38, points: 2620 },
    { rank: 3, name: "Emma Davis", avatar: "ED", courses: 9, certificates: 8, streak: 32, points: 2380 },
    { rank: 4, name: "Alex Kumar", avatar: "AK", courses: 8, certificates: 7, streak: 28, points: 2150 },
    { rank: 5, name: "Jessica Lee", avatar: "JL", courses: 7, certificates: 6, streak: 24, points: 1890 },
  ];

  const topTrainers = [
    { rank: 1, name: "John Smith", avatar: "JS", students: 1240, courses: 8, rating: 4.9, revenue: "$45,600" },
    { rank: 2, name: "Sarah Chen", avatar: "SC", students: 980, courses: 6, rating: 4.8, revenue: "$38,200" },
    { rank: 3, name: "Mike Johnson", avatar: "MJ", students: 750, courses: 5, rating: 4.7, revenue: "$28,500" },
    { rank: 4, name: "Emma Davis", avatar: "ED", students: 620, courses: 4, rating: 4.6, revenue: "$22,800" },
    { rank: 5, name: "Alex Kumar", avatar: "AK", students: 450, courses: 3, rating: 4.5, revenue: "$16,500" },
  ];

  const skillEndorsements = [
    { skill: "React.js", endorsements: 450, trending: true, category: "Frontend" },
    { skill: "TypeScript", endorsements: 428, trending: true, category: "Languages" },
    { skill: "Node.js", endorsements: 395, trending: false, category: "Backend" },
    { skill: "Python", endorsements: 380, trending: true, category: "Languages" },
    { skill: "UI/UX Design", endorsements: 365, trending: true, category: "Design" },
    { skill: "Data Science", endorsements: 340, trending: false, category: "Analytics" },
    { skill: "AWS", endorsements: 315, trending: true, category: "DevOps" },
    { skill: "Machine Learning", endorsements: 298, trending: true, category: "AI" },
  ];

  const getMedalColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={36} />
            <h1 className="text-4xl font-bold">Leaderboards</h1>
          </div>
          <p className="text-green-100">Celebrate top performers and trending skills on Forge</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8 border-b border-gray-200"
        >
          {["students", "trainers", "skills"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "students" | "trainers" | "skills")}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === tab
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Top Students */}
        {activeTab === "students" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Students</h2>
            {topStudents.map((student, i) => (
              <div
                key={student.rank}
                className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 w-32">
                  <Medal size={32} className={getMedalColor(student.rank)} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Rank</p>
                    <p className="text-2xl font-bold text-gray-900">#{student.rank}</p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {student.avatar}
                </div>

                <div className="flex-1">
                  <p className="font-bold text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.courses} courses completed</p>
                </div>

                <div className="grid grid-cols-3 gap-6 min-w-fit">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">Certificates</p>
                    <p className="text-2xl font-bold text-green-600">{student.certificates}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">Streak</p>
                    <p className="text-2xl font-bold text-orange-500">{student.streak}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">Points</p>
                    <p className="text-2xl font-bold text-blue-600">{student.points}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Top Trainers */}
        {activeTab === "trainers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Trainers</h2>
            {topTrainers.map((trainer) => (
              <div
                key={trainer.rank}
                className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 w-32">
                  <Medal size={32} className={getMedalColor(trainer.rank)} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Rank</p>
                    <p className="text-2xl font-bold text-gray-900">#{trainer.rank}</p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {trainer.avatar}
                </div>

                <div className="flex-1">
                  <p className="font-bold text-gray-900">{trainer.name}</p>
                  <p className="text-sm text-gray-600">{trainer.courses} courses · {trainer.students.toLocaleString()} students</p>
                </div>

                <div className="grid grid-cols-3 gap-6 min-w-fit">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">Rating</p>
                    <p className="text-2xl font-bold text-yellow-500">{trainer.rating}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">Students</p>
                    <p className="text-2xl font-bold text-purple-600">{trainer.students.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">Revenue</p>
                    <p className="text-2xl font-bold text-green-600">{trainer.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Trending Skills */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Endorsed Skills</h2>
              <div className="space-y-3">
                {skillEndorsements.slice(0, 4).map((skill, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{skill.skill}</p>
                        <p className="text-xs text-gray-500">{skill.category}</p>
                      </div>
                      {skill.trending && (
                        <Zap size={18} className="text-orange-500 fill-orange-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600"
                          style={{ width: `${(skill.endorsements / 450) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{skill.endorsements}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Emerging Skills</h2>
              <div className="space-y-3">
                {skillEndorsements.slice(4).map((skill, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{skill.skill}</p>
                        <p className="text-xs text-gray-500">{skill.category}</p>
                      </div>
                      {skill.trending && (
                        <Zap size={18} className="text-orange-500 fill-orange-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600"
                          style={{ width: `${(skill.endorsements / 450) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{skill.endorsements}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        >
          <p className="text-green-900 mb-2 font-semibold">🎯 Earn Points & Recognition</p>
          <p className="text-sm text-green-800">
            Complete courses, maintain learning streaks, earn certificates, and get skill endorsements to climb the leaderboards!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
