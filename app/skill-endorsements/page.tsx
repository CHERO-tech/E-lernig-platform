"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Award, Plus, ThumbsUp } from "lucide-react";
import { useState } from "react";

function SkillEndorsementsContent() {
  const [endorsements, setEndorsements] = useState({
    "React": 42,
    "TypeScript": 38,
    "Node.js": 35,
    "UI Design": 28,
    "Communication": 22,
  });

  const [pendingEndorsements, setPendingEndorsements] = useState([
    { id: 1, name: "Sarah Chen", skill: "React", avatar: "SC", date: "2 days ago" },
    { id: 2, name: "Mike Johnson", skill: "TypeScript", avatar: "MJ", date: "1 week ago" },
    { id: 3, name: "Emma Davis", skill: "Communication", avatar: "ED", date: "3 days ago" },
  ]);

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const topEndorsedPeople = [
    { name: "Sarah Chen", avatar: "SC", skills: ["React", "TypeScript", "UI Design"], endorsements: 203 },
    { name: "Mike Johnson", avatar: "MJ", skills: ["Node.js", "Python", "AWS"], endorsements: 187 },
    { name: "Emma Davis", avatar: "ED", skills: ["UI Design", "Figma", "UX Research"], endorsements: 156 },
    { name: "Alex Kumar", avatar: "AK", skills: ["Python", "ML", "Data Science"], endorsements: 142 },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setEndorsements(prev => ({ ...prev, [newSkill]: 0 }));
      setNewSkill("");
      setShowAddSkill(false);
    }
  };

  const handleAcceptEndorsement = (id: number) => {
    const endorsement = pendingEndorsements.find(e => e.id === id);
    if (endorsement) {
      setEndorsements(prev => ({
        ...prev,
        [endorsement.skill]: (prev[endorsement.skill as keyof typeof prev] || 0) + 1,
      }));
      setPendingEndorsements(pendingEndorsements.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Award size={36} />
            <h1 className="text-4xl font-bold">Skill Endorsements</h1>
          </div>
          <p className="text-green-100">Showcase your skills and get recognized by the community</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Skills</h2>
              <button
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors"
              >
                <Plus size={18} /> Add Skill
              </button>
            </div>

            {showAddSkill && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter skill name..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSkill(false);
                      setNewSkill("");
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(endorsements).map(([skill, count], i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{skill}</p>
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">{count}</span>
                  </div>
                  <p className="text-xs text-gray-600">people endorsed this skill</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pending Endorsements */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Endorsements</h2>
            <div className="space-y-3">
              {pendingEndorsements.length > 0 ? (
                pendingEndorsements.map((endorsement, i) => (
                  <motion.div
                    key={endorsement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {endorsement.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{endorsement.name}</p>
                        <p className="text-sm text-gray-600">Endorsed your <span className="font-medium">{endorsement.skill}</span> skill • {endorsement.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptEndorsement(endorsement.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <ThumbsUp size={16} /> Accept
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No pending endorsements</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Top Endorsed People Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Endorsed</h3>
          <div className="space-y-4">
            {topEndorsedPeople.map((person, i) => (
              <div key={i} className="text-center pb-4 border-b border-gray-100 last:border-b-0">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {person.avatar}
                </div>
                <p className="font-semibold text-gray-900">{person.name}</p>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {person.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 font-semibold">{person.endorsements} endorsements</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SkillEndorsements() {
  return (
    <ProtectedRoute>
      <SkillEndorsementsContent />
    </ProtectedRoute>
  );
}
