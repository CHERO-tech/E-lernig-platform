"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth/useAuth";
import { Download, Share2, Award, Calendar, Check, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { generateCertificatePdf } from "@/lib/certificates/generateCertificatePdf";

function CertificatesContent() {
  const { user } = useAuth();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const certificateRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const certificates = [
    {
      id: 1,
      course: "Advanced React Patterns",
      instructor: "Sarah Chen",
      issued: "2024-08-15",
      score: 92,
      credentialId: "CERT-2024-001",
    },
    {
      id: 2,
      course: "Web Development Fundamentals",
      instructor: "John Smith",
      issued: "2024-07-20",
      score: 88,
      credentialId: "CERT-2024-002",
    },
    {
      id: 3,
      course: "UI/UX Design Masterclass",
      instructor: "Mike Johnson",
      issued: "2024-06-10",
      score: 95,
      credentialId: "CERT-2024-003",
    },
    {
      id: 4,
      course: "Python for Data Science",
      instructor: "Alex Kumar",
      issued: "2024-05-05",
      score: 90,
      credentialId: "CERT-2024-004",
    },
  ];

  const handleDownload = async (cert: typeof certificates[0]) => {
    if (downloadingId !== null) return;
    setDownloadingId(cert.id);
    try {
      const node = certificateRefs.current[cert.id];
      if (node) {
        await generateCertificatePdf(node, `certificate-${cert.credentialId}.pdf`);
      }
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = async (cert: typeof certificates[0]) => {
    const shareText = `I earned a certificate in "${cert.course}" from Forge! Credential ID: ${cert.credentialId}`;
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/certificates`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cert.course} - Certificate`,
          text: shareText,
          url: shareUrl,
        });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedId(cert.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (error) {
        console.error('Clipboard copy failed:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Off-screen certificate templates for PDF capture */}
      {certificates.map((cert) => (
        <div
          key={`template-${cert.id}`}
          ref={(el) => {
            if (el) certificateRefs.current[cert.id] = el;
          }}
          className="fixed -left-[9999px] w-[1000px] bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-12 flex flex-col items-center justify-center"
          style={{ height: '700px' }}
        >
          <div className="text-center w-full">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-2xl font-bold text-yellow-900 mb-8">CERTIFICATE OF COMPLETION</p>
            <p className="text-4xl font-bold text-yellow-900 mb-4">{cert.course}</p>
            <p className="text-xl text-yellow-800 mb-8">This is to certify that</p>
            <p className="text-3xl font-bold text-yellow-900 mb-8">{user?.name || 'Student'}</p>
            <p className="text-lg text-yellow-800 mb-6">has successfully completed the course with a score of</p>
            <p className="text-3xl font-bold text-ember-strong mb-8">{cert.score}%</p>
            <div className="border-t-2 border-yellow-900 pt-6 mt-8">
              <p className="text-yellow-800 mb-2">Instructor: {cert.instructor}</p>
              <p className="text-yellow-800 mb-2">Date: {new Date(cert.issued).toLocaleDateString()}</p>
              <p className="text-sm font-mono text-yellow-700">Credential ID: {cert.credentialId}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Header */}
      <div className="bg-gradient-to-r from-ember-strong to-ember text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Award size={32} />
            <h1 className="text-4xl font-bold">My Certificates</h1>
          </div>
          <p className="text-forge-soft">You&apos;ve earned {certificates.length} certificates</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { label: "Total Certificates", value: certificates.length, icon: Award },
            { label: "Average Score", value: "91%", icon: Award },
            { label: "This Year", value: "4", icon: Calendar },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon size={32} className="text-ember-strong opacity-50" />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Certificate Preview */}
              <div className="h-64 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-8 flex items-center justify-center border-b-2 border-yellow-200 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-6xl opacity-10">🏆</div>
                <div className="text-center z-10">
                  <Award size={48} className="mx-auto text-yellow-600 mb-3" />
                  <p className="text-sm text-yellow-700 font-semibold">CERTIFICATE OF COMPLETION</p>
                  <p className="text-xl font-bold text-yellow-900 mt-2">{cert.course}</p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Instructor</p>
                    <p className="font-semibold text-gray-900">{cert.instructor}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Issued</p>
                      <p className="font-semibold text-gray-900">{new Date(cert.issued).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Score</p>
                      <p className="font-semibold text-ember-strong">{cert.score}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Credential ID</p>
                    <p className="text-sm font-mono text-gray-600">{cert.credentialId}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(cert)}
                    disabled={downloadingId !== null}
                    className="flex-1 px-4 py-2 bg-forge-soft text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloadingId === cert.id ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Download size={18} /> Download
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(cert)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedId === cert.id ? (
                      <>
                        <Check size={18} /> Copied!
                      </>
                    ) : (
                      <>
                        <Share2 size={18} /> Share
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
        >
          <p className="text-blue-900 mb-4">
            Certificates are issued upon course completion with a passing score. They can be verified using the Credential ID.
          </p>
          <a href="/help" className="text-blue-600 hover:text-blue-700 font-medium">
            Learn about certificate verification
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function Certificates() {
  return (
    <ProtectedRoute>
      <CertificatesContent />
    </ProtectedRoute>
  );
}
