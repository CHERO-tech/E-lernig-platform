export default function BrandMark() {
  return (
    <svg className="mark" viewBox="0 0 26 26" fill="none">
      <path
        d="M13 2 L23 8 L23 18 L13 24 L3 18 L3 8 Z"
        stroke="var(--ember)"
        strokeWidth="1.6"
      />
      <path
        d="M13 8 L13 24 M3 8 L13 14 L23 8"
        stroke="var(--ember)"
        strokeWidth="1.6"
        opacity="0.55"
      />
    </svg>
  );
}
