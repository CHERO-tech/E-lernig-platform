"use client";

import Link from "next/link";
import { use } from "react";
import { CheckCircle2, XCircle, Award, ArrowLeft } from "lucide-react";
import { findCertificateByCredentialId } from "@/lib/enrollment/certificateStore";
import { useCourses } from "@/lib/courses/useCourses";
import BrandMark from "@/components/BrandMark";

function VerifyContent({ credentialId }: { credentialId: string }) {
  const { getCourseById } = useCourses();
  const record = findCertificateByCredentialId(credentialId);
  const course = record ? getCourseById(record.courseId) : undefined;
  const isValid = !!record && !!course;

  return (
    <div className="min-h-screen bg-ow flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-mg hover:text-dt transition-colors mb-8 text-sm">
          <ArrowLeft size={16} /> Back to Forge
        </Link>

        <div className="flex items-center gap-2 mb-8 font-mono font-semibold text-dt">
          <BrandMark />
          FORGE — Credential Verification
        </div>

        {isValid ? (
          <div className="rounded-xl bg-white border border-border overflow-hidden">
            <div className="bg-pg/10 border-b border-pg/20 px-6 py-4 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-pg2" />
              <p className="font-semibold text-pg2">This credential is valid</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Award size={32} className="text-ember-strong" />
                <div>
                  <p className="text-sm text-mg">Certificate of Completion</p>
                  <p className="font-bold text-lg text-dt">{course!.title}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-mg">Awarded to</p>
                  <p className="font-semibold text-dt">{record!.studentName}</p>
                </div>
                <div>
                  <p className="text-mg">Instructor</p>
                  <p className="font-semibold text-dt">{course!.instructor}</p>
                </div>
                <div>
                  <p className="text-mg">Issued</p>
                  <p className="font-semibold text-dt">{new Date(record!.issuedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-mg">Score</p>
                  <p className="font-semibold text-dt">{record!.score}%</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-mg uppercase tracking-wide">Credential ID</p>
                <p className="font-mono text-sm text-dt">{record!.credentialId}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-white border border-border overflow-hidden">
            <div className="bg-err/10 border-b border-err/20 px-6 py-4 flex items-center gap-3">
              <XCircle size={24} className="text-err" />
              <p className="font-semibold text-err">This credential could not be verified</p>
            </div>
            <div className="p-6">
              <p className="text-mg text-sm">
                No certificate matches ID <span className="font-mono text-dt">{credentialId}</span>. Double-check the
                ID, or ask the credential holder to confirm it from their Certificates page.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage({ params }: { params: Promise<{ credentialId: string }> }) {
  const { credentialId } = use(params);
  return <VerifyContent credentialId={credentialId} />;
}
