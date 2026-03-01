"use client";

import { useState } from "react";
import { mockRegistrations, mockWarrantyClaims } from "@/lib/salesforce/mock/warranty.mock";
import StatusBadge from "../StatusBadge";
import StatusTimeline from "../StatusTimeline";
import type { WarrantyClaim, WarrantyClaimStatus } from "@/lib/salesforce/types";

const claimStatusSteps: WarrantyClaimStatus[] = [
  "submitted",
  "under_review",
  "approved",
  "parts_shipped",
  "resolved",
];

const claimStatusLabels: Record<WarrantyClaimStatus, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  parts_shipped: "Parts Shipped",
  resolved: "Resolved",
};

type WarrantyView = "claims" | "registrations" | "claim-detail";

export default function WarrantyPanel() {
  const [view, setView] = useState<WarrantyView>("claims");
  const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);
  const registrations = mockRegistrations;
  const claims = mockWarrantyClaims;

  if (view === "claim-detail" && selectedClaim) {
    return (
      <ClaimDetail
        claim={selectedClaim}
        onBack={() => {
          setView("claims");
          setSelectedClaim(null);
        }}
      />
    );
  }

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setView("claims")}
          className={`metadata pb-2 transition-colors duration-200 ${
            view === "claims" ? "text-primary border-b border-primary" : "text-silver hover:text-mid-gray"
          }`}
        >
          Warranty Claims
        </button>
        <button
          onClick={() => setView("registrations")}
          className={`metadata pb-2 transition-colors duration-200 ${
            view === "registrations" ? "text-primary border-b border-primary" : "text-silver hover:text-mid-gray"
          }`}
        >
          Registrations
        </button>
      </div>

      {view === "claims" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs text-body">{claims.length} warranty claims</p>
            <button className="btn-primary text-[10px] px-4 py-2">
              Submit New Claim
            </button>
          </div>

          <div className="border-t border-cloud">
            <div className="hidden md:grid grid-cols-[100px_1fr_120px_120px_100px] gap-4 py-3 px-4">
              <span className="metadata">Claim #</span>
              <span className="metadata">Product / Issue</span>
              <span className="metadata">Customer</span>
              <span className="metadata">Status</span>
              <span className="metadata text-right">Date</span>
            </div>
            {claims.map((claim) => (
              <button
                key={claim.id}
                onClick={() => {
                  setSelectedClaim(claim);
                  setView("claim-detail");
                }}
                className="w-full grid grid-cols-1 md:grid-cols-[100px_1fr_120px_120px_100px] gap-2 md:gap-4 py-4 px-4 border-b border-cloud text-left hover:bg-off-white transition-colors duration-200"
              >
                <span className="text-xs font-[family-name:var(--font-display)] text-primary">
                  {claim.claimNumber}
                </span>
                <div>
                  <span className="text-xs text-primary">{claim.productName}</span>
                  <span className="text-[11px] text-body block line-clamp-1 mt-0.5">
                    {claim.issueDescription}
                  </span>
                </div>
                <span className="text-xs text-body">{claim.customerName}</span>
                <span><StatusBadge status={claim.status} /></span>
                <span className="text-xs text-body text-right">
                  {new Date(claim.createdDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "registrations" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs text-body">{registrations.length} registered products</p>
            <button className="btn-primary text-[10px] px-4 py-2">
              Register Product
            </button>
          </div>

          <div className="border-t border-cloud">
            <div className="hidden md:grid grid-cols-[140px_1fr_120px_120px_120px] gap-4 py-3 px-4">
              <span className="metadata">Serial Number</span>
              <span className="metadata">Product</span>
              <span className="metadata">Customer</span>
              <span className="metadata">Delivery Date</span>
              <span className="metadata">Warranty Exp.</span>
            </div>
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr_120px_120px_120px] gap-2 md:gap-4 py-4 px-4 border-b border-cloud"
              >
                <span className="text-xs font-[family-name:var(--font-display)] text-primary">
                  {reg.serialNumber}
                </span>
                <span className="text-xs text-primary">{reg.productName}</span>
                <span className="text-xs text-body">{reg.customerName}</span>
                <span className="text-xs text-body">
                  {new Date(reg.deliveryDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-body">
                  {new Date(reg.warrantyExpiration).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Claim Detail Sub-view ─── */

function ClaimDetail({ claim, onBack }: { claim: WarrantyClaim; onBack: () => void }) {
  const timelineSteps = claimStatusSteps.map((step) => {
    const event = claim.statusTimeline.find((e) => e.status === step);
    const currentIdx = claimStatusSteps.indexOf(claim.status);
    const stepIdx = claimStatusSteps.indexOf(step);
    return {
      label: claimStatusLabels[step],
      date: event?.date,
      note: event?.note,
      completed: stepIdx <= currentIdx,
      active: step === claim.status,
    };
  });

  return (
    <div>
      <button
        onClick={onBack}
        className="metadata text-mid-gray hover:text-primary transition-colors duration-200 mb-6"
      >
        &larr; Back to Claims
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-card text-xl">{claim.claimNumber}</h2>
          <p className="text-xs text-body mt-1">
            {claim.productName} | {claim.customerName} |{" "}
            {new Date(claim.createdDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      {/* Status Timeline */}
      <div className="mb-10 border border-cloud p-6">
        <p className="section-label mb-2">Claim Progress</p>
        <StatusTimeline steps={timelineSteps} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Issue Details */}
        <div>
          <p className="section-label mb-4">Issue Details</p>
          <div className="border border-cloud p-5 space-y-3">
            <div>
              <p className="metadata mb-1">Serial Number</p>
              <p className="text-xs text-primary">{claim.serialNumber}</p>
            </div>
            <div>
              <p className="metadata mb-1">Issue Description</p>
              <p className="text-xs text-body leading-relaxed">{claim.issueDescription}</p>
            </div>
            <div>
              <p className="metadata mb-1">Requested Resolution</p>
              <p className="text-xs text-body">{claim.requestedResolution}</p>
            </div>
          </div>
        </div>

        {/* Communication Thread */}
        <div>
          <p className="section-label mb-4">Communication</p>
          <div className="border-t border-cloud space-y-0">
            {claim.messages.map((msg, i) => (
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
        </div>
      </div>
    </div>
  );
}
