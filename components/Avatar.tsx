interface AvatarProps {
  value?: string;
  name?: string;
  className?: string;
}

// `user.avatar` is either a short text initial (e.g. "AS") or, since photo
// upload was added, a data: URL for an uploaded image — there's no backend
// to store a real file, so the image itself lives in the user record.
export default function Avatar({ value, name, className = "" }: AvatarProps) {
  const isImage = !!value && (value.startsWith("data:image") || value.startsWith("http"));

  if (isImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={value} alt={name ? `${name}'s avatar` : "Avatar"} className={`object-cover ${className}`} />;
  }

  return (
    <div
      className={`bg-gradient-to-br from-ember-strong to-ember flex items-center justify-center text-white font-bold ${className}`}
    >
      {value || name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
}
