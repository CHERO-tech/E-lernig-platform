import { UserEnrollments } from '@/lib/enrollment/types';
import { UserMessages } from '@/lib/messaging/types';

const KNOWN_USERS_KEY = 'forge_known_users';

export interface KnownUser {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

export function upsertKnownUser(user: KnownUser): void {
  const stored = localStorage.getItem(KNOWN_USERS_KEY);
  let users: KnownUser[] = [];
  if (stored) {
    try {
      users = JSON.parse(stored);
    } catch {
      users = [];
    }
  }
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(KNOWN_USERS_KEY, JSON.stringify(users));
}

export function getKnownUsers(): KnownUser[] {
  const stored = localStorage.getItem(KNOWN_USERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}


export function readEnrollmentsForUser(userId: string): UserEnrollments {
  const key = `forge_enrollments_${userId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { enrollments: [] };
    }
  }
  return { enrollments: [] };
}

export function writeEnrollmentsForUser(userId: string, data: UserEnrollments): void {
  const key = `forge_enrollments_${userId}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export function listEnrolledUserIds(): string[] {
  const ids: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('forge_enrollments_')) {
      const userId = key.replace('forge_enrollments_', '');
      if (userId) ids.push(userId);
    }
  }
  return ids;
}

// ---------- Messaging ----------

export function readMessagesForUser(userId: string): UserMessages {
  const key = `forge_messages_${userId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { conversations: [] };
    }
  }
  return { conversations: [] };
}

export function writeMessagesForUser(userId: string, data: UserMessages): void {
  const key = `forge_messages_${userId}`;
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------- Job postings (company -> student) ----------

export interface JobPosting {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  skills: string;
  postedAt: number;
}

const JOB_POSTINGS_KEY = 'forge_job_postings';

export function listJobPostings(): JobPosting[] {
  const stored = localStorage.getItem(JOB_POSTINGS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function addJobPosting(posting: Omit<JobPosting, 'id' | 'postedAt'>): JobPosting {
  const postings = listJobPostings();
  const newPosting: JobPosting = {
    ...posting,
    id: `job-${Date.now()}`,
    postedAt: Date.now(),
  };
  postings.unshift(newPosting);
  localStorage.setItem(JOB_POSTINGS_KEY, JSON.stringify(postings));
  return newPosting;
}

// ---------- Job applications (student -> company) ----------

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  appliedAt: number;
}

const JOB_APPLICATIONS_KEY = 'forge_job_applications';

export function listJobApplications(): JobApplication[] {
  const stored = localStorage.getItem(JOB_APPLICATIONS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function addJobApplication(application: Omit<JobApplication, 'id' | 'appliedAt'>): JobApplication {
  const applications = listJobApplications();
  const newApplication: JobApplication = {
    ...application,
    id: `application-${Date.now()}`,
    appliedAt: Date.now(),
  };
  applications.push(newApplication);
  localStorage.setItem(JOB_APPLICATIONS_KEY, JSON.stringify(applications));
  return newApplication;
}

// ---------- Content reports (moderation queue) ----------

export type ReportStatus = 'pending' | 'reviewing' | 'resolved';

export interface ContentReport {
  id: string;
  type: string;
  content: string;
  reporterId: string;
  reporterName: string;
  reportedAt: number;
  status: ReportStatus;
}

const REPORTS_KEY = 'forge_reports';

export function listReports(): ContentReport[] {
  const stored = localStorage.getItem(REPORTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function submitReport(report: Omit<ContentReport, 'id' | 'reportedAt' | 'status'>): ContentReport {
  const reports = listReports();
  const newReport: ContentReport = {
    ...report,
    id: `report-${Date.now()}`,
    reportedAt: Date.now(),
    status: 'pending',
  };
  reports.unshift(newReport);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return newReport;
}

export function updateReportStatus(id: string, status: ReportStatus): void {
  const reports = listReports();
  const updated = reports.map(r => (r.id === id ? { ...r, status } : r));
  localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
}

export function removeReport(id: string): void {
  const reports = listReports();
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports.filter(r => r.id !== id)));
}

// ---------- Skill endorsements ----------

export interface SkillEndorsement {
  studentId: string;
  skill: string;
  endorserId: string;
  endorserName: string;
  endorsedAt: number;
}

const ENDORSEMENTS_KEY = 'forge_skill_endorsements';

export function listAllEndorsements(): SkillEndorsement[] {
  const stored = localStorage.getItem(ENDORSEMENTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function addEndorsement(endorsement: Omit<SkillEndorsement, 'endorsedAt'>): void {
  const endorsements = listAllEndorsements();
  const alreadyEndorsed = endorsements.some(
    e => e.studentId === endorsement.studentId && e.skill === endorsement.skill && e.endorserId === endorsement.endorserId
  );
  if (alreadyEndorsed) return;
  endorsements.push({ ...endorsement, endorsedAt: Date.now() });
  localStorage.setItem(ENDORSEMENTS_KEY, JSON.stringify(endorsements));
}
