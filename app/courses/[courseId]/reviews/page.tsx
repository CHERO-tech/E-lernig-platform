"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Star, ThumbsUp, Filter } from "lucide-react";
import { useState } from "react";

export default function CourseReviews({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("helpful");
  const [filterRating, setFilterRating] = useState("all");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, title: "", text: "" });

  const reviews = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      rating: 5,
      title: "Excellent course, highly recommended!",
      text: "This course exceeded my expectations. The instructor explains concepts clearly and provides practical examples. The projects were challenging and helped me apply what I learned.",
      date: "2 weeks ago",
      helpful: 124,
      verified: true,
    },
    {
      id: 2,
      author: "Mike Johnson",
      avatar: "MJ",
      rating: 4,
      title: "Great content with some room for improvement",
      text: "Very informative course with good structure. The only drawback is that some advanced topics could use more depth. Overall, I'm satisfied with my purchase.",
      date: "1 month ago",
      helpful: 89,
      verified: true,
    },
    {
      id: 3,
      author: "Emma Davis",
      avatar: "ED",
      rating: 5,
      title: "Life-changing learning experience",
      text: "I completed this course and immediately landed a job using the skills I learned. The instructor is responsive and the community is supportive. Worth every penny!",
      date: "1 month ago",
      helpful: 156,
      verified: true,
    },
    {
      id: 4,
      author: "Alex Kumar",
      avatar: "AK",
      rating: 3,
      title: "Good but not great",
      text: "The course covers the basics well, but I felt like it was a bit slow-paced. Some materials could be updated. Still useful if you're a beginner.",
      date: "2 months ago",
      helpful: 45,
      verified: true,
    },
    {
      id: 5,
      author: "Jessica Lee",
      avatar: "JL",
      rating: 5,
      title: "Perfect for career transition",
      text: "I was switching careers and this course helped me get up to speed quickly. The hands-on projects were exactly what employers are looking for.",
      date: "3 months ago",
      helpful: 98,
      verified: true,
    },
  ];

  const stats = {
    average: 4.4,
    total: 246,
    breakdown: { 5: 142, 4: 68, 3: 24, 2: 8, 1: 4 },
  };

  const filtered = reviews
    .filter(r => filterRating === "all" || r.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === "helpful") return b.helpful - a.helpful;
      if (sortBy === "newest") return 0;
      if (sortBy === "highest") return b.rating - a.rating;
      return a.rating - b.rating;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewForm(false);
    setFormData({ rating: 5, title: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Reviews</h1>
            <p className="text-gray-600">Advanced React Patterns</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left - Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-gray-900 mb-2">{stats.average}</p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(stats.average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{stats.total} reviews</p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <button
                    onClick={() => setFilterRating(rating.toString())}
                    className="flex-1 text-left hover:text-green-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-6">{rating}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${(stats.breakdown[rating as keyof typeof stats.breakdown] / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{stats.breakdown[rating as keyof typeof stats.breakdown]}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Write a Review
            </button>
          </motion.div>

          {/* Right - Reviews List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Review Form */}
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Share Your Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-2 hover:scale-110 transition-transform"
                        >
                          <Star
                            size={28}
                            className={
                              star <= formData.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Sum up your experience"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                    <textarea
                      placeholder="Tell us what you think..."
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Sort Controls */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{filtered.length} Reviews</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="helpful">Most Helpful</option>
                <option value="newest">Newest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>

            {/* Reviews */}
            {filtered.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>

                <h4 className="font-bold text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-600 mb-4">{review.text}</p>

                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <ThumbsUp size={16} /> Helpful ({review.helpful})
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
