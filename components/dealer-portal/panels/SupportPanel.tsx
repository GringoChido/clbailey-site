"use client";

import { useState } from "react";
import { mockTickets } from "@/lib/salesforce/mock/support.mock";
import StatusBadge from "../StatusBadge";
import type { SupportTicket, TicketCategory, TicketStatus } from "@/lib/salesforce/types";

const categoryLabels: Record<TicketCategory, string> = {
  order_issue: "Order Issue",
  warranty_claim: "Warranty",
  product_question: "Product Question",
  marketing_request: "Marketing",
  portal_help: "Portal Help",
  other: "Other",
};

const statusLabels: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  awaiting_response: "Awaiting Response",
  resolved: "Resolved",
};

type SupportView = "list" | "detail" | "new";
type FilterStatus = "all" | TicketStatus;

export default function SupportPanel() {
  const [view, setView] = useState<SupportView>("list");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const tickets = mockTickets;

  const filtered =
    filterStatus === "all" ? tickets : tickets.filter((t) => t.status === filterStatus);

  if (view === "detail" && selectedTicket) {
    return (
      <TicketDetail
        ticket={selectedTicket}
        onBack={() => {
          setView("list");
          setSelectedTicket(null);
        }}
      />
    );
  }

  if (view === "new") {
    return (
      <NewTicketForm
        onBack={() => setView("list")}
        onSubmit={() => setView("list")}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {(["all", "open", "in_progress", "awaiting_response", "resolved"] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`metadata px-3 py-1.5 transition-colors duration-200 whitespace-nowrap ${
                filterStatus === s
                  ? "bg-primary text-white"
                  : "bg-cloud/50 text-mid-gray hover:bg-cloud"
              }`}
            >
              {s === "all" ? "All" : statusLabels[s as TicketStatus]}
            </button>
          ))}
        </div>
        <button
          onClick={() => setView("new")}
          className="btn-primary text-[10px] px-4 py-2 flex-shrink-0 ml-4"
        >
          New Ticket
        </button>
      </div>

      <div className="border-t border-cloud">
        <div className="hidden md:grid grid-cols-[100px_1fr_120px_120px_100px] gap-4 py-3 px-4">
          <span className="metadata">Ticket #</span>
          <span className="metadata">Subject</span>
          <span className="metadata">Category</span>
          <span className="metadata">Status</span>
          <span className="metadata text-right">Date</span>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="heading-sub mb-2">No tickets found</p>
          </div>
        ) : (
          filtered.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => {
                setSelectedTicket(ticket);
                setView("detail");
              }}
              className="w-full grid grid-cols-1 md:grid-cols-[100px_1fr_120px_120px_100px] gap-2 md:gap-4 py-4 px-4 border-b border-cloud text-left hover:bg-off-white transition-colors duration-200"
            >
              <span className="text-xs font-[family-name:var(--font-display)] text-primary">
                {ticket.ticketNumber}
              </span>
              <div>
                <span className="text-xs text-primary">{ticket.subject}</span>
                {ticket.priority === "urgent" && (
                  <StatusBadge status="urgent" />
                )}
              </div>
              <span className="text-xs text-body">
                {categoryLabels[ticket.category]}
              </span>
              <span><StatusBadge status={ticket.status} /></span>
              <span className="text-xs text-body text-right">
                {new Date(ticket.createdDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Ticket Detail Sub-view ─── */

function TicketDetail({ ticket, onBack }: { ticket: SupportTicket; onBack: () => void }) {
  const [reply, setReply] = useState("");

  return (
    <div>
      <button
        onClick={onBack}
        className="metadata text-mid-gray hover:text-primary transition-colors duration-200 mb-6"
      >
        &larr; Back to Tickets
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-card text-xl">{ticket.ticketNumber}</h2>
          <p className="text-xs text-body mt-1">
            {categoryLabels[ticket.category]} |{" "}
            {new Date(ticket.createdDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {ticket.priority === "urgent" && <StatusBadge status="urgent" />}
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <h3 className="heading-card mb-2">{ticket.subject}</h3>
      <p className="text-xs text-body leading-relaxed mb-8">{ticket.description}</p>

      {/* Messages */}
      <p className="section-label mb-4">Conversation</p>
      <div className="border-t border-cloud mb-6">
        {ticket.messages.map((msg, i) => (
          <div key={i} className="py-4 border-b border-cloud">
            <div className="flex items-center gap-2 mb-1">
              <span className="metadata">{msg.author}</span>
              <span className="text-[10px] text-silver">
                {new Date(msg.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-xs text-body leading-relaxed">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Reply */}
      {ticket.status !== "resolved" && (
        <div>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="input-modern min-h-[100px] resize-y mb-3"
            placeholder="Write a reply..."
          />
          <button className="btn-primary">Send Reply</button>
        </div>
      )}
    </div>
  );
}

/* ─── New Ticket Form ─── */

function NewTicketForm({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [category, setCategory] = useState<TicketCategory>("product_question");
  const [priority, setPriority] = useState<"standard" | "urgent">("standard");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <button
        onClick={onBack}
        className="metadata text-mid-gray hover:text-primary transition-colors duration-200 mb-6"
      >
        &larr; Back to Tickets
      </button>

      <h2 className="heading-card text-xl mb-8">Submit a Support Ticket</h2>

      <div className="max-w-lg space-y-5">
        <div>
          <label className="section-label block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TicketCategory)}
            className="input-modern"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="section-label block mb-2">Priority</label>
          <div className="flex gap-3">
            {(["standard", "urgent"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`metadata px-4 py-2 border transition-colors duration-200 ${
                  priority === p
                    ? "border-primary bg-primary text-white"
                    : "border-cloud text-body hover:border-silver"
                }`}
              >
                {p === "standard" ? "Standard" : "Urgent"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="section-label block mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-modern"
            placeholder="Brief description of the issue"
          />
        </div>

        <div>
          <label className="section-label block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-modern min-h-[120px] resize-y"
            placeholder="Provide as much detail as possible..."
          />
        </div>

        <div className="pt-4">
          <button onClick={onSubmit} className="btn-primary">
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
