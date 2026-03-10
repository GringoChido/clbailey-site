"use client";

import { useState } from "react";
import { Plus, Edit3, Eye, Archive, Send } from "lucide-react";
import { adminAnnouncements } from "@/lib/admin/mock-data";
import type { AdminAnnouncement, AnnouncementCategory, AnnouncementStatus } from "@/lib/admin/types";

const categoryLabels: Record<AnnouncementCategory, string> = {
  product_update: "Product Update",
  pricing: "Pricing",
  operations: "Operations",
  marketing: "Marketing",
};

const statusStyles: Record<AnnouncementStatus, string> = {
  draft: "bg-amber-50 text-amber-700 border border-amber-200",
  published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  archived: "bg-gray-50 text-gray-500 border border-gray-200",
};

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AnnouncementsPanel() {
  const [announcements, setAnnouncements] = useState(adminAnnouncements);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    body: "",
    category: "product_update" as AnnouncementCategory,
    targetAudience: "all" as string,
  });

  const published = announcements.filter((a) => a.status === "published");
  const drafts = announcements.filter((a) => a.status === "draft");

  const handlePublish = () => {
    const newAnnouncement: AdminAnnouncement = {
      id: `ann${announcements.length + 1}`,
      title: draft.title,
      body: draft.body,
      category: draft.category,
      status: "published",
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      targetAudience: draft.targetAudience as AdminAnnouncement["targetAudience"],
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setComposing(false);
    setDraft({ title: "", body: "", category: "product_update", targetAudience: "all" });
  };

  const handleArchive = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, status: "archived" as AnnouncementStatus } : a
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-label mb-2">Administration</p>
          <h1 className="heading-display text-[28px]">Announcements</h1>
        </div>
        <button
          onClick={() => setComposing(!composing)}
          className="btn-primary flex items-center gap-2 text-[12px]"
        >
          <Plus size={14} />
          New Announcement
        </button>
      </div>

      {/* Compose form */}
      {composing && (
        <div className="bg-white border border-[var(--color-cloud)] p-6 mb-8 animate-fade-up">
          <p className="section-label mb-5">Compose Announcement</p>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] text-[var(--color-body)] mb-2">Title</label>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Announcement title"
                className="input-modern w-full"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[var(--color-body)] mb-2">Body</label>
              <textarea
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                placeholder="Write your announcement..."
                rows={4}
                className="input-modern w-full resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-[var(--color-body)] mb-2">Category</label>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value as AnnouncementCategory })}
                  className="input-modern w-full"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[13px] text-[var(--color-body)] mb-2">Target Audience</label>
                <select
                  value={draft.targetAudience}
                  onChange={(e) => setDraft({ ...draft, targetAudience: e.target.value })}
                  className="input-modern w-full"
                >
                  <option value="all">All Dealers</option>
                  <option value="platinum">Platinum Only</option>
                  <option value="gold">Gold & Above</option>
                  <option value="silver">Silver & Above</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePublish}
                disabled={!draft.title || !draft.body}
                className="btn-primary flex items-center gap-2 text-[12px] disabled:opacity-40"
              >
                <Send size={12} /> Publish Now
              </button>
              <button
                onClick={() => setComposing(false)}
                className="btn-outline text-[12px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drafts */}
      {drafts.length > 0 && (
        <div className="mb-8">
          <p className="section-label mb-4">Drafts</p>
          <div className="space-y-3">
            {drafts.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} onArchive={handleArchive} />
            ))}
          </div>
        </div>
      )}

      {/* Published */}
      <div>
        <p className="section-label mb-4">Published</p>
        <div className="space-y-3">
          {published.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} onArchive={handleArchive} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnnouncementCard({
  announcement: a,
  onArchive,
}: {
  announcement: AdminAnnouncement;
  onArchive: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-[var(--color-cloud)]">
      <div className="flex items-start justify-between px-5 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[1px] ${statusStyles[a.status]}`}>
              {a.status}
            </span>
            <span className="text-[10px] uppercase tracking-[1.5px] text-[var(--color-mid-gray)] font-[var(--font-raleway)]">
              {categoryLabels[a.category]}
            </span>
            <span className="text-[11px] text-[var(--color-silver)]">
              {formatDate(a.publishedAt || a.createdAt)}
            </span>
          </div>
          <h3 className="heading-card text-[15px] mb-1">{a.title}</h3>
          {expanded && (
            <p className="text-[13px] text-[var(--color-body)] leading-[24px] mt-3 animate-fade-up">
              {a.body}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-[var(--color-mid-gray)] hover:text-[var(--color-primary)] transition-colors"
            title={expanded ? "Collapse" : "Preview"}
          >
            <Eye size={14} />
          </button>
          <button
            className="p-2 text-[var(--color-mid-gray)] hover:text-[var(--color-primary)] transition-colors"
            title="Edit"
          >
            <Edit3 size={14} />
          </button>
          {a.status !== "archived" && (
            <button
              onClick={() => onArchive(a.id)}
              className="p-2 text-[var(--color-mid-gray)] hover:text-red-500 transition-colors"
              title="Archive"
            >
              <Archive size={14} />
            </button>
          )}
        </div>
      </div>
      {a.targetAudience !== "all" && (
        <div className="px-5 pb-3">
          <span className="text-[10px] uppercase tracking-[1px] text-[var(--color-silver)]">
            Target: {a.targetAudience} tier only
          </span>
        </div>
      )}
    </div>
  );
}
