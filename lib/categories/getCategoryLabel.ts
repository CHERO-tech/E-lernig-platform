import { Category } from './types';
import { formatCategoryLabel } from '@/lib/courses/formatCategoryLabel';

// Prefers the admin-managed label (which may have been renamed) and falls
// back to auto-formatting the raw key for any course still using a category
// that's since been deleted from the managed list.
export function getCategoryLabel(categories: Category[], key: string): string {
  return categories.find((c) => c.key === key)?.label ?? formatCategoryLabel(key);
}
