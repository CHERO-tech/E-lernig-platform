import { UserEnrollments } from '@/lib/enrollment/types';
import { UserMessages } from '@/lib/messaging/types';
import { Notification } from '@/lib/notifications/types';

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

// ---------- Account suspension (admin -> auth) ----------

const SUSPENDED_EMAILS_KEY = 'forge_suspended_emails';

export function isEmailSuspended(email: string): boolean {
  const stored = localStorage.getItem(SUSPENDED_EMAILS_KEY);
  if (!stored) return false;
  try {
    const emails: string[] = JSON.parse(stored);
    return emails.includes(email.toLowerCase());
  } catch {
    return false;
  }
}

export function setEmailSuspended(email: string, suspended: boolean): void {
  const stored = localStorage.getItem(SUSPENDED_EMAILS_KEY);
  let emails: string[] = [];
  if (stored) {
    try {
      emails = JSON.parse(stored);
    } catch {
      emails = [];
    }
  }
  const normalized = email.toLowerCase();
  const withoutEmail = emails.filter((e) => e !== normalized);
  const next = suspended ? [...withoutEmail, normalized] : withoutEmail;
  localStorage.setItem(SUSPENDED_EMAILS_KEY, JSON.stringify(next));
}

// ---------- Cross-account notifications (trainer/system -> another user) ----------
// Notifications are normally added via useNotifications(), which only ever
// touches the signed-in user's own store. This writes directly into a
// *different* user's notification list — for the same reason
// readEnrollmentsForUser/writeEnrollmentsForUser bypass their own provider
// above: the writer isn't that user.

function notificationsKey(userId: string): string {
  return `forge_notifications_${userId}`;
}

export function writeNotificationForUser(userId: string, input: Omit<Notification, 'id' | 'createdAt' | 'read'>): void {
  const key = notificationsKey(userId);
  const stored = localStorage.getItem(key);
  let notifications: Notification[] = [];
  if (stored) {
    try {
      notifications = JSON.parse(stored);
    } catch {
      notifications = [];
    }
  }
  const newNotification: Notification = {
    ...input,
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: Date.now(),
    read: false,
  };
  notifications.unshift(newNotification);
  localStorage.setItem(key, JSON.stringify(notifications));
}

// ---------- Contact messages ----------

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: number;
  handled: boolean;
}

const CONTACT_MESSAGES_KEY = 'forge_contact_messages';

export function listContactMessages(): ContactMessage[] {
  const stored = localStorage.getItem(CONTACT_MESSAGES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function submitContactMessage(
  message: Omit<ContactMessage, 'id' | 'submittedAt' | 'handled'>
): ContactMessage {
  const messages = listContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: `contact-${Date.now()}`,
    submittedAt: Date.now(),
    handled: false,
  };
  messages.unshift(newMessage);
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(messages));
  return newMessage;
}

export function setContactMessageHandled(id: string, handled: boolean): void {
  const messages = listContactMessages();
  const updated = messages.map((m) => (m.id === id ? { ...m, handled } : m));
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(updated));
}
