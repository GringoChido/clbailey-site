"use client";

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  // Order statuses
  draft: { bg: "bg-cloud/50", text: "text-mid-gray", label: "Draft" },
  submitted: { bg: "bg-silver/15", text: "text-mid-gray", label: "Submitted" },
  confirmed: { bg: "bg-primary/8", text: "text-primary", label: "Confirmed" },
  in_production: { bg: "bg-primary/12", text: "text-primary", label: "In Production" },
  shipped: { bg: "bg-primary/15", text: "text-primary", label: "Shipped" },
  delivered: { bg: "bg-primary/20", text: "text-primary", label: "Delivered" },
  // Lead statuses
  new: { bg: "bg-silver/15", text: "text-mid-gray", label: "New" },
  contacted: { bg: "bg-primary/8", text: "text-primary", label: "Contacted" },
  qualified: { bg: "bg-primary/12", text: "text-primary", label: "Qualified" },
  quote_sent: { bg: "bg-primary/15", text: "text-primary", label: "Quote Sent" },
  won: { bg: "bg-primary/20", text: "text-primary", label: "Won" },
  lost: { bg: "bg-cloud", text: "text-body", label: "Lost" },
  // Warranty statuses
  under_review: { bg: "bg-silver/15", text: "text-mid-gray", label: "Under Review" },
  approved: { bg: "bg-primary/12", text: "text-primary", label: "Approved" },
  parts_shipped: { bg: "bg-primary/15", text: "text-primary", label: "Parts Shipped" },
  resolved: { bg: "bg-primary/20", text: "text-primary", label: "Resolved" },
  // Ticket statuses
  open: { bg: "bg-silver/15", text: "text-mid-gray", label: "Open" },
  in_progress: { bg: "bg-primary/12", text: "text-primary", label: "In Progress" },
  awaiting_response: { bg: "bg-primary/8", text: "text-mid-gray", label: "Awaiting Response" },
  // Inventory statuses
  in_stock: { bg: "bg-primary/8", text: "text-primary", label: "In Stock" },
  low_stock: { bg: "bg-silver/20", text: "text-mid-gray", label: "Low Stock" },
  out_of_stock: { bg: "bg-cloud", text: "text-body", label: "Out of Stock" },
  made_to_order: { bg: "bg-cloud/50", text: "text-mid-gray", label: "Made to Order" },
  // Priority
  standard: { bg: "bg-cloud/50", text: "text-body", label: "Standard" },
  urgent: { bg: "bg-primary/15", text: "text-primary", label: "Urgent" },
};

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = statusStyles[status] ?? { bg: "bg-cloud", text: "text-body", label: status };
  const displayLabel = label ?? style.label;

  return (
    <span className={`inline-block px-3 py-1 metadata ${style.bg} ${style.text}`}>
      {displayLabel}
    </span>
  );
}
