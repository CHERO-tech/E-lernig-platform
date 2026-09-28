import { getKnownUsers } from '@/lib/shared/crossAccountStore';

// Persisted certificate issuance records, per user. Once a certificate is
// recorded here it stays valid even if the course's requirements change
// later (e.g. a trainer adds a new quiz after a student already completed
// it) — eligibility is only ever checked again to grant a *new* record, not
// to revoke an existing one.

export interface IssuedCertificate {
  courseId: string;
  credentialId: string;
  issuedAt: string;
  score: number;
}

function storageKey(userId: string): string {
  return `forge_certificates_${userId}`;
}

function generateCredentialId(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().split("-")[0]
      : Math.random().toString(36).slice(2, 10);
  return `CERT-${random.toUpperCase()}`;
}

export function getIssuedCertificates(userId: string): IssuedCertificate[] {
  const stored = localStorage.getItem(storageKey(userId));
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function recordCertificateIfNew(userId: string, courseId: string, score: number): IssuedCertificate {
  const existing = getIssuedCertificates(userId);
  const found = existing.find((c) => c.courseId === courseId);
  if (found) return found;

  const cert: IssuedCertificate = {
    courseId,
    credentialId: generateCredentialId(),
    issuedAt: new Date().toISOString(),
    score,
  };
  localStorage.setItem(storageKey(userId), JSON.stringify([...existing, cert]));
  return cert;
}

export interface VerifiedCertificate extends IssuedCertificate {
  studentName: string;
}

// Verification has to work for a visitor who isn't signed in as the student
// (an employer checking a credential), so it can't go through the normal
// per-user enrollment context. It scans every user this browser has ever
// seen sign in — the same cross-account pattern the rest of the app uses for
// grading/admin views, and the same limitation: it only finds a match within
// this one browser's storage, not across devices, since there's no shared
// database behind any of this.
export function findCertificateByCredentialId(credentialId: string): VerifiedCertificate | null {
  for (const knownUser of getKnownUsers()) {
    const match = getIssuedCertificates(knownUser.id).find((c) => c.credentialId === credentialId);
    if (match) {
      return { ...match, studentName: knownUser.name };
    }
  }
  return null;
}
