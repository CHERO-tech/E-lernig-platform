"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Star, Users, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const allResults = [
    { id: 1, type: "course", title: "Web Development Fundamentals", instructor: "John Smith", level: "Beginner", rating: 4.8, students: 1240, duration: "40 hours", price: "$49" },
    { id: 2, type: "course", title: "Advanced React Patterns", instructor: "Sarah Chen", level: "Advanced", rating: 4.9, students: 890, duration: "35 hours", price: "$79" },
    { id: 3, type: "course", title: "UI/UX Design Masterclass", instructor: "Mike Johnson", level: "Intermediate", rating: 4.7, students: 650, duration: "45 hours", price: "$59" },
    { id: 4, type: "course", title: "Python for Data Science", instructor: "Alex Kumar", level: "Intermediate", rating: 4.8, students: 920, duration: "50 hours", price: "$69" },
    { id: 5, type: "course", title: "Mobile Development with Flutter", instructor: "Emma Davis", level: "Beginner", rating: 4.6, students: 540, duration: "42 hours", price: "$49" },
    { id: 6, type: "course", title: "Cloud Architecture on AWS", instructor: "Tom Wilson", level: "Advanced", rating: 4.9, students: 780, duration: "38 hours", price: "$99" },
    { id: 7, type: "course", title: "TypeScript Mastery", instructor: "James Brown", level: "Intermediate", rating: 4.8, students: 620, duration: "36 hours", price: "$69" },
    { id: 8, type: "course", title: "Machine Learning Basics", instructor: "Lisa Chen", level: "Intermediate", rating: 4.7, students: 450, duration: "48 hours", price: "$79" },
  ];

  const filteredResults = allResults
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => filterLevel === "all" || item.level === filterLevel)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.students - a.students;
      if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
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
                <div className="h-40 bg-gradient-to-br from-green-400 to-emerald-500"></div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{result.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">by {result.instructor}</p>

                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        result.level === "Beginner" ? "bg-green-100 text-green-700" :
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
                    <span className="text-lg font-bold text-green-600">{result.price}</span>
                    <Link
                      href={`/courses/${result.id}`}
                      className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm flex items-center gap-2"
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
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
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
            className="mt-16 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-green-100 mb-8 text-lg">Join thousands of learners already advancing with Forge</p>
            <Link href={`/courses/${filteredResults[0].id}`} className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Explore Top Course
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
