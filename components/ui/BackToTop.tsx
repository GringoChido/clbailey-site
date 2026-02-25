"use client";

export default function BackToTop({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="back-to-top group flex items-center justify-between w-full"
    >
      <span>{label}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted group-hover:text-ink transition-colors duration-300"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
