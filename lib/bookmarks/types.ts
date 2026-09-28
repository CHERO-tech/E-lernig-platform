export interface BookmarksContextType {
  bookmarkedCourseIds: string[];
  isBookmarked: (courseId: string) => boolean;
  toggleBookmark: (courseId: string) => void;
}
