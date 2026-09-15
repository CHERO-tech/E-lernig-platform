import { UserEnrollments } from '@/lib/enrollment/types';

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
