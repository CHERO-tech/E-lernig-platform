"use client";

import React from "react";
import { motion } from "framer-motion";
import { MotivationalQuote } from "@/lib/studentHubData";

interface MotivationalQuoteCardProps {
  quote: MotivationalQuote;
}

export default function MotivationalQuoteCard({ quote }: MotivationalQuoteCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 p-8 md:p-12 shadow-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative Quote Mark */}
      <div className="absolute top-4 left-6 text-emerald-300 text-7xl opacity-20 font-serif">
        "
      </div>

      <div className="relative z-10">
        <p className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
          {quote.text}
        </p>
        <p className="text-emerald-100 text-lg font-medium">— {quote.author}</p>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
