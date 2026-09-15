import { describe, expect, it } from "vitest";
import { calculateReviewStats } from "./calculateReviewStats";
import { CourseReview } from "./types";

function review(rating: number, overrides: Partial<CourseReview> = {}): CourseReview {
  return {
    id: `review-${rating}-${Math.random()}`,
    author: "Someone",
    avatar: "?",
    rating,
    title: "",
    text: "",
    createdAt: Date.now(),
    helpful: 0,
    verified: false,
    ...overrides,
  };
}

describe("calculateReviewStats", () => {
  it("returns zeroed stats for no reviews", () => {
    expect(calculateReviewStats([])).toEqual({
      average: 0,
      total: 0,
      breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
  });

  it("averages a single review as its own rating", () => {
    const stats = calculateReviewStats([review(4)]);
    expect(stats.average).toBe(4);
    expect(stats.total).toBe(1);
    expect(stats.breakdown[4]).toBe(1);
  });

  it("rounds the average to one decimal place and tallies the breakdown", () => {
    const stats = calculateReviewStats([review(5), review(5), review(4), review(1)]);
    // (5 + 5 + 4 + 1) / 4 = 3.75 -> rounds to 3.8
    expect(stats.average).toBe(3.8);
    expect(stats.total).toBe(4);
    expect(stats.breakdown).toEqual({ 1: 1, 2: 0, 3: 0, 4: 1, 5: 2 });
  });
});
