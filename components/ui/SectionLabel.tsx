export default function SectionLabel({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-8">
      <span
        className={`section-label ${
          dark ? "!text-[var(--color-silver)]" : ""
        }`}
      >
        {label}
      </span>
      <div className={`mt-3 h-px ${dark ? "bg-[var(--color-mid-gray)]" : "bg-[var(--color-cloud)]"}`} />
    </div>
  );
}
