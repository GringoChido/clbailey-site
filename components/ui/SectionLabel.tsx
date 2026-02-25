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
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-gray-400" : "text-gray-400"
        }`}
      >
        {label}
      </span>
      <div className={`mt-3 h-px ${dark ? "bg-gray-700" : "bg-gray-200"}`} />
    </div>
  );
}
