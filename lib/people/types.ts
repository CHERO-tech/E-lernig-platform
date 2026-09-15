import { UserRole } from '@/lib/auth/types';

export type PersonStatus = 'active' | 'inactive' | 'suspended';

export interface PersonCourseEnrollment {
  id: string;
  title: string;
  progress: number;
}

export interface PersonActivityItem {
  type: string;
  desc: string;
  date: number;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  status: PersonStatus;
  online: boolean;
  joinedAt: number;
  location: string;
  courseCount: number;
  courses: PersonCourseEnrollment[];
  activity: PersonActivityItem[];
  enrollments: number;
  certificates: number;
  lastActiveAt: number;
}

export interface PeopleContextType {
  people: Person[];
  getPersonById: (id: string) => Person | undefined;
  updatePersonStatus: (id: string, status: PersonStatus) => void;
  updatePersonRole: (id: string, role: UserRole) => void;
  deletePerson: (id: string) => void;
}
