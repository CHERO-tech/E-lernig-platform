"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Star, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterInstructor, setFilterInstructor] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const { courses } = useCourses();

  const allResults = courses.filter(c => c.published !== false).map(c => ({
    id: c.id,
    type: "course",
    title: c.title,
    instructor: c.instructor,
    level: c.level,
    rating: c.rating,
    students: c.students,
    durationHours: c.durationHours,
    duration: `${c.durationHours} hours`,
    price: c.price,
  }));

  const instructors = Array.from(new Set(allResults.map(r => r.instructor))).sort();

  const filteredResults = allResults
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => filterLevel === "all" || item.level === filterLevel)
    .filter(item => {
      if (filterDuration === "all") return true;
      if (filterDuration === "short") return item.durationHours < 5;
      if (filterDuration === "medium") return item.durationHours >= 5 && item.durationHours <= 15;
      return item.durationHours > 15;
    })
    .filter(item => filterPrice === "all" || (filterPrice === "free" ? item.price === 0 : item.price > 0))
    .filter(item => filterRating === "all" || item.rating >= parseFloat(filterRating))
    .filter(item => filterInstructor === "all" || item.instructor === filterInstructor)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.students - a.students;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-ow">
      {/* Search Header */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm text-mg hover:text-dt transition-colors mb-3">
            <ArrowLeft size={16} />
            Back to Courses
          </Link>
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-mg" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
               aria-label="Search courses, instructors, topics"/>
            </div>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              aria-expanded={showFilters}
              className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                showFilters ? "bg-ember-strong text-white" : "bg-ow text-dt hover:bg-surface"
              }`}
            >
              <Filter size={20} /> Filter
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
          <div className="flex gap-4 mt-4 flex-wrap" role="group" aria-label="Search filters">
            <div>
              <label className="text-sm font-medium text-dt mb-2 block" htmlFor="filter-level">Level</label>
              <select
                id="filter-level"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-dt mb-2 block" htmlFor="filter-duration">Duration</label>
              <select
                id="filter-duration"
                value={filterDuration}
                onChange={(e) => setFilterDuration(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="all">Any Duration</option>
                <option value="short">Under 5 hours</option>
                <option value="medium">5–15 hours</option>
                <option value="long">Over 15 hours</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-dt mb-2 block" htmlFor="filter-price">Price</label>
              <select
                id="filter-price"
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="all">Free or Paid</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-dt mb-2 block" htmlFor="filter-rating">Rating</label>
              <select
                id="filter-rating"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="all">Any Rating</option>
                <option value="4.5">4.5 &amp; up</option>
                <option value="4">4.0 &amp; up</option>
                <option value="3">3.0 &amp; up</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-dt mb-2 block" htmlFor="filter-instructor">Instructor</label>
              <select
                id="filter-instructor"
                value={filterInstructor}
                onChange={(e) => setFilterInstructor(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="all">All Instructors</option>
                {instructors.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-dt mb-2 block" htmlFor="sort-by">Sort By</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-mg">
            Found <span className="font-semibold text-dt">{filteredResults.length}</span> results
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-ember-strong to-ember"></div>

                <div className="p-6">
                  <h3 className="font-bold text-dt mb-2 line-clamp-2">{result.title}</h3>
                  <p className="text-sm text-mg mb-4">by {result.instructor}</p>

                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-mg">Level</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        result.level === "Beginner" ? "bg-forge-soft text-ember2" :
                        result.level === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {result.level}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{result.rating}</span>
                      </div>
                      <span className="text-mg text-xs">{result.students.toLocaleString()} students</span>
                    </div>

                    <div className="flex items-center gap-2 text-mg">
                      <Clock size={16} />
                      <span>{result.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-ember-strong">${result.price}</span>
                    <Link
                      href={`/courses/${result.id}`}
                      className="px-4 py-2 bg-forge-soft text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors text-sm flex items-center gap-2"
                    >
                      <span>View</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-lg border border-border"
          >
            <Search size={48} className="mx-auto text-border mb-4" />
            <p className="text-mg text-lg mb-4">No courses found</p>
            <p className="text-mg mb-8">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterLevel("all");
                setFilterDuration("all");
                setFilterPrice("all");
                setFilterRating("all");
                setFilterInstructor("all");
                setSortBy("relevance");
              }}
              className="px-6 py-2 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        {filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 bg-gradient-to-r from-ember-strong to-ember text-white rounded-lg p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-forge-soft mb-8 text-lg">Join thousands of learners already advancing with Forge</p>
            <Link href={`/courses/${filteredResults[0].id}`} className="inline-block px-8 py-3 bg-white text-ember-strong rounded-lg font-medium hover:bg-forge-soft transition-colors">
              Explore Top Course
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
