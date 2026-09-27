"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Award, Plus, ThumbsUp, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { addEndorsement, getKnownUsers, listAllEndorsements } from "@/lib/shared/crossAccountStore";

const DEFAULT_SKILLS = ["React", "TypeScript", "Node.js", "UI Design", "Communication"];

function SkillEndorsementsContent() {
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState<string[]>(DEFAULT_SKILLS);
  const [allEndorsements, setAllEndorsements] = useState(() =>
    typeof window !== "undefined" ? listAllEndorsements() : []
  );

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const peers = useMemo(
    () => getKnownUsers().filter((u) => u.id !== user?.id),
    [user?.id]
  );

  const endorsementCountFor = (studentId: string, skill: string) =>
    allEndorsements.filter((e) => e.studentId === studentId && e.skill === skill).length;

  const topEndorsedPeople = useMemo(() => {
    return peers
      .map((peer) => {
        const peerSkills = Array.from(new Set(allEndorsements.filter((e) => e.studentId === peer.id).map((e) => e.skill)));
        return {
          id: peer.id,
          name: peer.name,
          avatar: peer.avatar || peer.name.slice(0, 2).toUpperCase(),
          skills: peerSkills,
          endorsements: allEndorsements.filter((e) => e.studentId === peer.id).length,
        };
      })
      .filter((p) => p.endorsements > 0)
      .sort((a, b) => b.endorsements - a.endorsements)
      .slice(0, 4);
  }, [peers, allEndorsements]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !mySkills.includes(newSkill.trim())) {
      setMySkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
      setShowAddSkill(false);
    }
  };

  const handleEndorse = (peerId: string, peerName: string, skill: string) => {
    if (!user) return;
    addEndorsement({ studentId: peerId, skill, endorserId: user.id, endorserName: user.name });
    setAllEndorsements(listAllEndorsements());
  };

  return (
    <div className="min-h-screen bg-ow">
      {/* Header */}
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/student/dashboard" className="inline-flex items-center gap-1.5 text-sm text-forge-soft hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Award size={36} />
            <h1 className="text-4xl font-bold">Skill Endorsements</h1>
          </div>
          <p className="text-forge-soft">Showcase your skills and get recognized by the community</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dt">My Skills</h2>
              <button
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="flex items-center gap-2 px-4 py-2 bg-forge-soft text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors"
              >
                <Plus size={18} /> Add Skill
              </button>
            </div>

            {showAddSkill && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-ow rounded-lg border border-border"
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter skill name..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                   aria-label="Enter skill name"/>
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSkill(false);
                      setNewSkill("");
                    }}
                    className="px-4 py-2 border border-border text-dt rounded-lg font-medium hover:bg-ow"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySkills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-gradient-to-br from-forge-soft to-blue-50 rounded-lg border border-brass-soft"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-dt">{skill}</p>
                    <span className="px-3 py-1 bg-ember-strong text-white rounded-full text-sm font-bold">
                      {user ? endorsementCountFor(user.id, skill) : 0}
                    </span>
                  </div>
                  <p className="text-xs text-mg">people endorsed this skill</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Endorse a Peer */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-2xl font-bold text-dt mb-6">Endorse a Peer</h2>
            <div className="space-y-3">
              {peers.length > 0 ? (
                peers.map((peer, i) => (
                  <motion.div
                    key={peer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {peer.avatar || peer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="font-semibold text-dt">{peer.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mySkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleEndorse(peer.id, peer.name, skill)}
                          className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-xs font-medium hover:bg-ember-strong hover:text-white hover:border-ember-strong transition-colors flex items-center gap-1.5"
                        >
                          <ThumbsUp size={14} /> {skill}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-mg py-8">No other members have signed in yet to endorse.</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Top Endorsed People Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-border p-6 h-fit sticky top-6"
        >
          <h3 className="text-xl font-bold text-dt mb-6">Top Endorsed</h3>
          <div className="space-y-4">
            {topEndorsedPeople.length === 0 && (
              <p className="text-center text-sm text-mg py-4">No endorsements yet — be the first to endorse a peer.</p>
            )}
            {topEndorsedPeople.map((person) => (
              <div key={person.id} className="text-center pb-4 border-b border-border last:border-b-0">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {person.avatar}
                </div>
                <p className="font-semibold text-dt">{person.name}</p>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {person.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-forge-soft text-ember2 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-mg mt-2 font-semibold">{person.endorsements} endorsements</p>
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
