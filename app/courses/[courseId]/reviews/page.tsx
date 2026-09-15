"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Star, ThumbsUp } from "lucide-react";
import { use, useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";
import { calculateReviewStats } from "@/lib/courses/calculateReviewStats";
import { useAuth } from "@/lib/auth/useAuth";
import { useNotifications } from "@/lib/notifications/useNotifications";

function CourseReviewsContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getCourseById, submitReview, markReviewHelpful } = useCourses();
  const { addNotification } = useNotifications();
  const [sortBy, setSortBy] = useState("helpful");
  const [filterRating, setFilterRating] = useState("all");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, title: "", text: "" });

  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="min-h-screen bg-ow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-dt">Course Not Found</h1>
          <button onClick={() => router.back()} className="px-6 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
            Back
          </button>
        </div>
      </div>
    );
  }

  const reviews = course.reviews;
  const stats = calculateReviewStats(reviews);

  const filtered = reviews
    .filter((r) => filterRating === "all" || r.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === "helpful") return b.helpful - a.helpful;
      if (sortBy === "newest") return 0;
      if (sortBy === "highest") return b.rating - a.rating;
      return a.rating - b.rating;
    });

  const formatDate = (epoch: number) => {
    const date = new Date(epoch);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffDays < 7 && diffDays > 0) return `${diffDays}d ago`;
    if (diffWeeks < 4 && diffWeeks > 0) return `${diffWeeks}w ago`;
    if (diffMonths > 0) return `${diffMonths}mo ago`;
    return date.toLocaleDateString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addNotification({
        type: "system",
        icon: "⚠️",
        title: "Error",
        message: "Please enter a review title",
      });
      return;
    }
    const avatar =
      user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";
    submitReview(courseId, formData.rating, formData.title, formData.text, user?.name || "Anonymous", avatar);
    addNotification({
      type: "system",
      icon: "✅",
      title: "Review Submitted",
      message: "Thank you for your review!",
    });
    setShowReviewForm(false);
    setFormData({ rating: 5, title: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-ow" aria-label="Go back">
            <ArrowLeft size={20} className="text-mg" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-dt">Course Reviews</h1>
            <p className="text-mg">{course.title}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="rounded-xl p-6 bg-white border border-border h-fit">
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-dt mb-2">{stats.average}</p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(stats.average) ? "fill-pg text-pg2" : "text-border"} />
                ))}
              </div>
              <p className="text-sm text-mg">{stats.total} reviews</p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating.toString())}
                  className="w-full flex items-center gap-2 text-left transition-colors hover:text-pg2"
                >
                  <span className="text-sm w-6 text-mg">{rating}★</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-border">
                    <div
                      className="h-full bg-pg"
                      style={{
                        width: `${(stats.breakdown[rating as keyof typeof stats.breakdown] / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-mg">{stats.breakdown[rating as keyof typeof stats.breakdown]}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full mt-6 px-4 py-2 rounded-lg font-medium transition-colors bg-pg text-dg hover:brightness-110"
            >
              Write a Review
            </button>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {showReviewForm && (
              <div className="rounded-xl p-6 bg-white border border-border">
                <h3 className="text-lg font-bold mb-4 text-dt">Share Your Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-dt">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-2 hover:scale-110 transition-transform"
                        >
                          <Star size={28} className={star <= formData.rating ? "fill-pg text-pg2" : "text-border"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-dt" htmlFor="review-title">Title</label>
                    <input
                      id="review-title"
                      type="text"
                      placeholder="Sum up your experience"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-dt" htmlFor="review-text">Review</label>
                    <textarea
                      id="review-text"
                      placeholder="Tell us what you think..."
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-ow border border-border text-dt focus:border-pg"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-2 bg-pg text-dg rounded-lg font-medium hover:brightness-110">
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="text-lg font-bold text-dt">{filtered.length} Reviews</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort reviews by"
                className="px-3 py-2 rounded-lg text-sm outline-none bg-white border border-border text-dt focus:border-pg"
              >
                <option value="helpful">Most Helpful</option>
                <option value="newest">Newest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>

            {filtered.map((review) => (
              <div key={review.id} className="rounded-xl p-6 bg-white border border-border">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-pg text-dg">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-dt">{review.author}</p>
                      <p className="text-xs text-mg">{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="px-2 py-1 text-xs font-medium rounded bg-pg/10 text-pg2 shrink-0">Verified</span>
                  )}
                </div>

                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "fill-pg text-pg2" : "text-border"} />
                  ))}
                </div>

                <h4 className="font-bold mb-2 text-dt">{review.title}</h4>
                <p className="mb-4 text-mg">{review.text}</p>

                <button
                  onClick={() => markReviewHelpful(courseId, review.id)}
                  className="flex items-center gap-2 text-sm transition-colors text-mg hover:text-pg2"
                >
                  <ThumbsUp size={16} /> Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseReviews({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return <CourseReviewsContent courseId={courseId} />;
}
