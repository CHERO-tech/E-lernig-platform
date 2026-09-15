'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { Person, PeopleContextType, PersonStatus } from './types';
import { UserRole } from '@/lib/auth/types';

const STORAGE_KEY = 'forge_people';

const DEFAULT_PEOPLE: Person[] = [
  {
    id: 'person-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'AJ',
    role: 'student' as UserRole,
    status: 'active',
    online: true,
    joinedAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
    location: 'San Francisco, CA',
    courseCount: 3,
    courses: [
      { id: 'course-1', title: 'Advanced React Patterns', progress: 75 },
      { id: 'course-2', title: 'Web Dev Fundamentals', progress: 50 },
      { id: 'course-3', title: 'UI/UX Design Masterclass', progress: 90 },
    ],
    activity: [
      { type: 'Course Completed', desc: 'Finished Web Development Fundamentals', date: Date.now() - 2 * 24 * 60 * 60 * 1000 },
      { type: 'Assignment Submitted', desc: 'Submitted final project for UI/UX course', date: Date.now() - 5 * 24 * 60 * 60 * 1000 },
      { type: 'Course Enrolled', desc: 'Enrolled in Advanced React Patterns', date: Date.now() - 7 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 3,
    certificates: 1,
    lastActiveAt: Date.now() - 1 * 60 * 60 * 1000,
  },
  {
    id: 'person-2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'SC',
    role: 'trainer' as UserRole,
    status: 'active',
    online: true,
    joinedAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
    location: 'New York, NY',
    courseCount: 5,
    courses: [
      { id: 'course-4', title: 'Python Basics', progress: 100 },
      { id: 'course-5', title: 'Advanced Python', progress: 85 },
    ],
    activity: [
      { type: 'Course Created', desc: 'Published new course: Python Basics', date: Date.now() - 30 * 24 * 60 * 60 * 1000 },
      { type: 'Student Enrollment', desc: '50 new students enrolled', date: Date.now() - 15 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 5,
    certificates: 2,
    lastActiveAt: Date.now() - 30 * 60 * 1000,
  },
  {
    id: 'person-3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    avatar: 'MD',
    role: 'student' as UserRole,
    status: 'active',
    online: false,
    joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    location: 'Austin, TX',
    courseCount: 1,
    courses: [
      { id: 'course-1', title: 'Advanced React Patterns', progress: 45 },
    ],
    activity: [
      { type: 'Quiz Completed', desc: 'Passed React Fundamentals Quiz', date: Date.now() - 3 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 1,
    certificates: 0,
    lastActiveAt: Date.now() - 6 * 60 * 60 * 1000,
  },
  {
    id: 'person-4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'EW',
    role: 'company' as UserRole,
    status: 'active',
    online: false,
    joinedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    location: 'Seattle, WA',
    courseCount: 0,
    courses: [],
    activity: [
      { type: 'Account Created', desc: 'Company account created', date: Date.now() - 14 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 0,
    certificates: 0,
    lastActiveAt: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    id: 'person-5',
    name: 'John Brown',
    email: 'john@example.com',
    phone: '+1 (555) 567-8901',
    avatar: 'JB',
    role: 'guardian' as UserRole,
    status: 'active',
    online: false,
    joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    location: 'Boston, MA',
    courseCount: 0,
    courses: [],
    activity: [
      { type: 'Guardian Registered', desc: 'Registered as guardian', date: Date.now() - 30 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 0,
    certificates: 0,
    lastActiveAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'person-6',
    name: 'Lisa Garcia',
    email: 'lisa@example.com',
    phone: '+1 (555) 678-9012',
    avatar: 'LG',
    role: 'student' as UserRole,
    status: 'suspended',
    online: false,
    joinedAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
    location: 'Miami, FL',
    courseCount: 2,
    courses: [
      { id: 'course-2', title: 'Web Dev Fundamentals', progress: 30 },
      { id: 'course-3', title: 'UI/UX Design Masterclass', progress: 20 },
    ],
    activity: [
      { type: 'Course Enrolled', desc: 'Enrolled in Web Dev Fundamentals', date: Date.now() - 21 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 2,
    certificates: 0,
    lastActiveAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'person-7',
    name: 'Tom Wilson',
    email: 'tom@example.com',
    phone: '+1 (555) 789-0123',
    avatar: 'TW',
    role: 'trainer' as UserRole,
    status: 'active',
    online: true,
    joinedAt: Date.now() - 120 * 24 * 60 * 60 * 1000,
    location: 'Los Angeles, CA',
    courseCount: 8,
    courses: [
      { id: 'course-6', title: 'Data Science 101', progress: 100 },
    ],
    activity: [
      { type: 'Course Rating', desc: 'Received 5-star review on Data Science course', date: Date.now() - 5 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 8,
    certificates: 4,
    lastActiveAt: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: 'person-8',
    name: 'Jessica Lee',
    email: 'jessica@example.com',
    phone: '+1 (555) 890-1234',
    avatar: 'JL',
    role: 'student' as UserRole,
    status: 'active',
    online: true,
    joinedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    location: 'Chicago, IL',
    courseCount: 0,
    courses: [],
    activity: [
      { type: 'Account Created', desc: 'New student account created', date: Date.now() - 5 * 24 * 60 * 60 * 1000 },
    ],
    enrollments: 0,
    certificates: 0,
    lastActiveAt: Date.now() - 1 * 60 * 60 * 1000,
  },
];

export const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export function PeopleProvider({ children }: { children: React.ReactNode }) {
  const [people, setPeople] = useState<Person[]>([]);

  // SSR-safe hydration: state starts at the default and is patched here
  // after mount, once localStorage is available (see app/layout.tsx).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPeople(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setPeople(DEFAULT_PEOPLE);
      }
    } else {
      setPeople(DEFAULT_PEOPLE);
    }
  }, []);

  const persistPeople = useCallback((newPeople: Person[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPeople));
  }, []);

  const getPersonById = useCallback(
    (id: string) => people.find(p => p.id === id),
    [people]
  );

  const updatePersonStatus = useCallback(
    (id: string, status: PersonStatus) => {
      setPeople(prev => {
        const updated = prev.map(p => (p.id === id ? { ...p, status } : p));
        persistPeople(updated);
        return updated;
      });
    },
    [persistPeople]
  );

  const updatePersonRole = useCallback(
    (id: string, role: UserRole) => {
      setPeople(prev => {
        const updated = prev.map(p => (p.id === id ? { ...p, role } : p));
        persistPeople(updated);
        return updated;
      });
    },
    [persistPeople]
  );

  const deletePerson = useCallback(
    (id: string) => {
      setPeople(prev => {
        const updated = prev.filter(p => p.id !== id);
        persistPeople(updated);
        return updated;
      });
    },
    [persistPeople]
  );

  return (
    <PeopleContext.Provider value={{ people, getPersonById, updatePersonStatus, updatePersonRole, deletePerson }}>
      {children}
    </PeopleContext.Provider>
  );
}
