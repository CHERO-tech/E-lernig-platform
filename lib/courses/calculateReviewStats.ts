import { CourseReview } from './types';

export interface ReviewStats {
  average: number;
  total: number;
  breakdown: Record<number, number>;
}

export function calculateReviewStats(reviews: CourseReview[]): ReviewStats {
  if (reviews.length === 0) {
    return {
      average: 0,
      total: 0,
      breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const breakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  reviews.forEach(review => {
    breakdown[review.rating]++;
    sum += review.rating;
  });

  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    total: reviews.length,
    breakdown,
  };
}
