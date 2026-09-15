"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Star, Users, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/lib/courses/useCourses";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const { courses } = useCourses();

  const allResults = courses.map(c => ({
    id: c.id,
    type: "course",
    title: c.title,
    instructor: c.instructor,
    level: c.level,
    rating: c.rating,
    students: c.students,
    duration: `${c.durationHours} hours`,
    price: c.price,
  }));

  const filteredResults = allResults
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => filterLevel === "all" || item.level === filterLevel)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.students - a.students;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
              />
            </div>
            <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter size={20} /> Filter
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Level</label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{filteredResults.length}</span> results
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
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-ember-strong to-ember"></div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{result.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">by {result.instructor}</p>

                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level</span>
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
                      <span className="text-gray-500 text-xs">{result.students.toLocaleString()} students</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
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
            className="text-center py-16 bg-white rounded-lg border border-gray-200"
          >
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-4">No courses found</p>
            <p className="text-gray-500 mb-8">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterLevel("all");
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
