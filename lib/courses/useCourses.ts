import { useContext } from 'react';
import { CourseContext } from './CourseProvider';
import { CourseContextType } from './types';

export function useCourses(): CourseContextType {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
