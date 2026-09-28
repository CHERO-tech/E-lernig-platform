"use client";

import { useState } from "react";

interface CourseThumbnailProps {
  title: string;
  thumbnail?: string;
  className?: string;
}

// Trainers paste an arbitrary external image URL (there's no file upload
// backend to store one) — if it 404s or the host blocks hotlinking, fall
// back to the same gradient + initial treatment used when no thumbnail is
// set at all, rather than showing a broken image icon.
export default function CourseThumbnail({ title, thumbnail, className = "" }: CourseThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (thumbnail && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={thumbnail}
        alt={title}
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-ember-strong to-ember flex items-center justify-center text-white text-2xl font-bold ${className}`}
      aria-hidden="true"
    >
      {title.charAt(0).toUpperCase()}
    </div>
  );
}
