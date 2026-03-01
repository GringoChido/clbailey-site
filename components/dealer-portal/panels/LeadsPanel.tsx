"use client";

import { useState } from "react";
import { mockLeads } from "@/lib/salesforce/mock/lead.mock";
import StatusBadge from "../StatusBadge";
import type { Lead, LeadStatus } from "@/lib/salesforce/types";

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  quote_sent: "Quote Sent",
  won: "Won",
  lost: "Lost",
};

const sourceLabels: Record<string, string> = {
  website: "Website",
  trade_show: "Trade Show",
  referral: "Referral",
  phone: "Phone",
  campaign: "Campaign",
};

type FilterStatus = "all" | LeadStatus;

export default function LeadsPanel() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const leads = mockLeads;

  const filtered =
    filterStatus === "all" ? leads : leads.filter((l) => l.status === filterStatus);

  if (selectedLead) {
    return <LeadDetail lead={selectedLead} onBack={() => setSelectedLead(null)} />;
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(["all", "new", "contacted", "qualified", "quote_sent", "won", "lost"] as FilterStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`metadata px-3 py-1.5 transition-colors duration-200 whitespace-nowrap ${
              filterStatus === s
                ? "bg-primary text-white"
                : "bg-cloud/50 text-mid-gray hover:bg-cloud"
            }`}
          >
            {s === "all" ? "All" : statusLabels[s as LeadStatus]}
          </button>
        ))}
      </div>

      {/* Lead List */}
      <div className="border-t border-cloud">
        <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_120px_100px] gap-4 py-3 px-4">
          <span className="metadata">Name</span>
          <span className="metadata">Location</span>
          <span className="metadata">Source</span>
          <span className="metadata">Interest</span>
          <span className="metadata">Status</span>
          <span className="metadata text-right">Date</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="heading-sub mb-2">No leads found</p>
          </div>
        ) : (
          filtered.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className="w-full grid grid-cols-1 md:grid-cols-[1fr_120px_100px_100px_120px_100px] gap-2 md:gap-4 py-4 px-4 border-b border-cloud text-left hover:bg-off-white transition-colors duration-200"
            >
              <span className="text-xs font-[family-name:var(--font-display)] text-primary">
                {lead.customerName}
              </span>
              <span className="text-xs text-body">{lead.location}</span>
              <span className="text-xs text-body">{sourceLabels[lead.source]}</span>
              <span className="text-xs text-body line-clamp-1">{lead.productInterest}</span>
              <span><StatusBadge status={lead.status} /></span>
              <span className="text-xs text-body text-right">
                {new Date(lead.createdDate).toLocaleDateString("en-US", {
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

/* ─── Lead Detail Sub-view ─── */

function LeadDetail({ lead, onBack }: { lead: Lead; onBack: () => void }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="metadata text-mid-gray hover:text-primary transition-colors duration-200 mb-6"
      >
        &larr; Back to Leads
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-card text-xl">{lead.customerName}</h2>
          <p className="text-xs text-body mt-1">
            {lead.location} | {sourceLabels[lead.source]} |{" "}
            {new Date(lead.createdDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Customer Info */}
        <div>
          <p className="section-label mb-4">Contact Information</p>
          <div className="border border-cloud p-5 space-y-3">
            <div>
              <p className="metadata mb-1">Email</p>
              <p className="text-xs text-primary">{lead.email}</p>
            </div>
            <div>
              <p className="metadata mb-1">Phone</p>
              <p className="text-xs text-primary">{lead.phone}</p>
            </div>
            <div>
              <p className="metadata mb-1">ZIP Code</p>
              <p className="text-xs text-body">{lead.zip}</p>
            </div>
            {lead.roomSize && (
              <div>
                <p className="metadata mb-1">Room Size</p>
                <p className="text-xs text-body">{lead.roomSize}</p>
              </div>
            )}
            {lead.budgetRange && (
              <div>
                <p className="metadata mb-1">Budget Range</p>
                <p className="text-xs text-body">{lead.budgetRange}</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="btn-primary text-[10px] px-4 py-2">Mark as Contacted</button>
            <button className="btn-outline text-[10px] px-4 py-2">Create Quote</button>
            <button className="btn-outline text-[10px] px-4 py-2">Mark as Won</button>
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <p className="section-label mb-4">Activity</p>
          <div className="border-t border-cloud">
            {lead.activities.map((activity, i) => (
              <div key={i} className="py-3 border-b border-cloud">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-silver flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-xs text-primary">{activity.action}</p>
                    {activity.note && (
                      <p className="text-[11px] text-body mt-0.5">{activity.note}</p>
                    )}
                    <p className="text-[10px] text-silver mt-1">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {lead.notes.length > 0 && (
            <div className="mt-6">
              <p className="section-label mb-3">Notes</p>
              <div className="space-y-2">
                {lead.notes.map((note, i) => (
                  <p key={i} className="text-xs text-body border-l-2 border-cloud pl-3 py-1">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
