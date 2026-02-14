export default function SectionLabel({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`border-t pt-4 ${
        dark ? "border-cream/20" : "border-brown/20"
      }`}
    >
      <span
        className={`heritage-label ${
          dark ? "text-cream/50" : "text-brown/50"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
