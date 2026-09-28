import { UpcomingDeadline } from './getUpcomingDeadlines';

// Tracks which deadlines a student has already been reminded about, so a
// reminder fires once (the first time it's within the window) rather than
// on every page load.
const REMINDED_KEY_PREFIX = 'forge_reminded_deadlines_';

function remindedKey(userId: string): string {
  return `${REMINDED_KEY_PREFIX}${userId}`;
}

function deadlineId(deadline: UpcomingDeadline): string {
  return `${deadline.type}-${deadline.courseId}-${deadline.title}`;
}

function getRemindedIds(userId: string): string[] {
  const stored = localStorage.getItem(remindedKey(userId));
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getUnremindedDeadlines(
  userId: string,
  deadlines: UpcomingDeadline[],
  withinDays = 3
): UpcomingDeadline[] {
  const now = Date.now();
  const reminded = new Set(getRemindedIds(userId));
  return deadlines.filter((d) => {
    if (reminded.has(deadlineId(d))) return false;
    const daysUntil = (new Date(d.dueDate).getTime() - now) / 86400000;
    return daysUntil <= withinDays;
  });
}

export function markDeadlinesReminded(userId: string, deadlines: UpcomingDeadline[]): void {
  if (deadlines.length === 0) return;
  const reminded = new Set(getRemindedIds(userId));
  for (const d of deadlines) {
    reminded.add(deadlineId(d));
  }
  localStorage.setItem(remindedKey(userId), JSON.stringify(Array.from(reminded)));
}
