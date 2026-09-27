"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, DollarSign, ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { useAuth } from "@/lib/auth/useAuth";
import { addJobApplication, listJobApplications, listJobPostings } from "@/lib/shared/crossAccountStore";

const SEED_OPPORTUNITIES = [
  {
    id: "seed-1",
    title: "Senior React Developer",
    company: "Tech Startup Inc",
    type: "Full-time",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    desc: "Build scalable web applications with React and Node.js",
  },
  {
    id: "seed-2",
    title: "Product Designer Internship",
    company: "Design Studio Co",
    type: "Internship",
    location: "Remote",
    salary: "$20/hour",
    desc: "Create beautiful user experiences for mobile apps",
  },
  {
    id: "seed-3",
    title: "Data Scientist",
    company: "AI Solutions Ltd",
    type: "Full-time",
    location: "New York, NY",
    salary: "$130k - $170k",
    desc: "Work with cutting-edge ML models and big data",
  },
  {
    id: "seed-4",
    title: "UX/UI Designer",
    company: "Creative Agency",
    type: "Contract",
    location: "Austin, TX",
    salary: "$80/hour",
    desc: "Design interfaces for enterprise applications",
  },
  {
    id: "seed-5",
    title: "Full Stack Developer",
    company: "Web Services Corp",
    type: "Full-time",
    location: "Remote",
    salary: "$100k - $140k",
    desc: "Build end-to-end web solutions",
  },
  {
    id: "seed-6",
    title: "DevOps Engineer",
    company: "Cloud Infrastructure",
    type: "Full-time",
    location: "Seattle, WA",
    salary: "$110k - $150k",
    desc: "Manage cloud infrastructure and CI/CD pipelines",
  },
];

export default function Opportunities() {
  const [filterType, setFilterType] = useState("all");
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const [applications, setApplications] = useState(() =>
    typeof window !== "undefined" ? listJobApplications() : []
  );
  const appliedIds = useMemo(
    () => applications.filter((a) => a.applicantId === user?.id).map((a) => a.jobId),
    [applications, user?.id]
  );

  const opportunities = useMemo(() => {
    const posted = typeof window !== "undefined" ? listJobPostings() : [];
    const real = posted.map((p) => ({
      id: p.id,
      title: p.title,
      company: p.companyName,
      type: p.type === "full-time" ? "Full-time" : p.type === "part-time" ? "Part-time" : p.type === "contract" ? "Contract" : "Internship",
      location: p.location,
      salary: p.salary,
      desc: p.description,
    }));
    return [...real, ...SEED_OPPORTUNITIES];
  }, []);

  const handleApply = (id: string, title: string) => {
    if (!user || appliedIds.includes(id)) return;
    const application = addJobApplication({ jobId: id, applicantId: user.id, applicantName: user.name });
    setApplications((prev) => [...prev, application]);
    addNotification({
      type: "system",
      icon: "✅",
      title: "Application Submitted",
      message: `Your application for "${title}" has been submitted.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80">
            <span className="text-2xl font-bold">Forge</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Job Opportunities</h1>
          <p className="text-forge-soft text-lg">Find your next career opportunity with top companies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-4 mb-8 flex-wrap">
          {["all", "full-time", "internship", "contract"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filterType === type
                  ? "bg-ember-strong text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h3>
                  <p className="text-gray-600">{opp.company}</p>
                </div>
                <button
                  onClick={() => handleApply(opp.id, opp.title)}
                  disabled={appliedIds.includes(opp.id)}
                  className="px-4 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-ember-strong"
                >
                  {appliedIds.includes(opp.id) ? (
                    <>
                      Applied <Check size={18} />
                    </>
                  ) : (
                    <>
                      Apply <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              <p className="text-gray-600 mb-4">{opp.desc}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} />
                  <span>{opp.type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{opp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign size={18} />
                  <span>{opp.salary}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-forge-soft py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to land your dream job?</h2>
          <p className="text-gray-600 mb-8">Upskill with our courses and increase your chances of getting hired</p>
          <Link
            href="/courses"
            className="inline-block px-8 py-4 bg-ember-strong text-white font-semibold rounded-lg hover:bg-ember transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
