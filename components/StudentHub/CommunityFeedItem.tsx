"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CommunityPost } from "@/lib/studentHubData";
import { Heart } from "lucide-react";

interface CommunityFeedItemProps {
  post: CommunityPost;
}

export default function CommunityFeedItem({ post }: CommunityFeedItemProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <motion.div
      className="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* User Info */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {post.userInitials}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              {post.userName}
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {post.timeAgo}
            </span>
          </div>

          {/* Action Text */}
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
            {post.action}
          </p>

          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ scale: liked ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                size={16}
                className={liked ? "fill-emerald-600 text-emerald-600" : ""}
              />
            </motion.div>
            <span className={liked ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
