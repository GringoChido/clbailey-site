"use client";

import { useState } from "react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: "product" | "sales" | "installation" | "marketing";
  format: "video" | "document" | "webinar";
  duration: string;
  date?: string;
  completed?: boolean;
}

const trainingModules: TrainingModule[] = [
  {
    id: "tm-001",
    title: "2026 Product Line Overview",
    description: "Complete walkthrough of all current models, finishes, and pricing. Covers pool tables, shuffleboards, and game room furniture.",
    category: "product",
    format: "video",
    duration: "45 min",
    completed: true,
  },
  {
    id: "tm-002",
    title: "Skylar and Dutchess Selling Points",
    description: "Key differentiators, target customer profiles, and objection handling for our two best-selling pool table models.",
    category: "sales",
    format: "video",
    duration: "20 min",
    completed: true,
  },
  {
    id: "tm-003",
    title: "Shuffleboard Installation Best Practices",
    description: "Step-by-step guide for proper shuffleboard delivery, assembly, leveling, and climatic adjuster calibration.",
    category: "installation",
    format: "document",
    duration: "15 min read",
    completed: false,
  },
  {
    id: "tm-004",
    title: "Finish and Felt Selection Guide",
    description: "How to help customers choose the right wood finish and felt color for their space. Includes room lighting considerations.",
    category: "sales",
    format: "document",
    duration: "10 min read",
    completed: false,
  },
  {
    id: "tm-005",
    title: "Pool Table Assembly and Leveling",
    description: "Professional assembly procedures for all pool table models. Covers slate alignment, felt installation, and final leveling.",
    category: "installation",
    format: "video",
    duration: "35 min",
    completed: false,
  },
  {
    id: "tm-006",
    title: "Spring 2026 Marketing Campaign Toolkit",
    description: "Overview of the Spring 2026 campaign assets, social media templates, email sequences, and in-store signage guidelines.",
    category: "marketing",
    format: "webinar",
    duration: "30 min",
    date: "2026-03-15",
    completed: false,
  },
  {
    id: "tm-007",
    title: "Warranty Process and Claims Handling",
    description: "How to register warranties, submit claims through the portal, and communicate resolution timelines to customers.",
    category: "product",
    format: "document",
    duration: "12 min read",
    completed: false,
  },
  {
    id: "tm-008",
    title: "Dealer Portal Walkthrough",
    description: "Tour of the dealer portal features: placing orders, managing leads, checking inventory, and generating quotes.",
    category: "sales",
    format: "video",
    duration: "15 min",
    completed: false,
  },
  {
    id: "tm-009",
    title: "Room Sizing Consultation",
    description: "How to conduct a room sizing consultation with customers. Covers minimum clearances, cue length adjustments, and multi-use spaces.",
    category: "sales",
    format: "document",
    duration: "8 min read",
    completed: true,
  },
  {
    id: "tm-010",
    title: "Addison Model Preview: Pre-launch Training",
    description: "Advance training on the upcoming Addison pool table. Construction details, target positioning, and pre-order process.",
    category: "product",
    format: "webinar",
    duration: "40 min",
    date: "2026-03-22",
    completed: false,
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "sales", label: "Sales" },
  { id: "installation", label: "Installation" },
  { id: "marketing", label: "Marketing" },
] as const;

const formatLabels: Record<TrainingModule["format"], string> = {
  video: "Video",
  document: "Document",
  webinar: "Webinar",
};

export default function TrainingPanel() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered =
    categoryFilter === "all"
      ? trainingModules
      : trainingModules.filter((m) => m.category === categoryFilter);

  const completedCount = trainingModules.filter((m) => m.completed).length;
  const totalCount = trainingModules.length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-card mb-1">Training and Resources</h2>
          <p className="text-body text-sm">
            Product knowledge, sales techniques, installation guides, and marketing resources.
          </p>
        </div>
        <div className="text-right">
          <p className="metadata mb-1">Progress</p>
          <p className="text-primary text-sm">
            {completedCount} of {totalCount} completed
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-1 bg-cloud w-full">
          <div
            className="h-1 bg-primary transition-all duration-500"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`metadata px-4 py-2 border transition-colors duration-300 whitespace-nowrap ${
              categoryFilter === cat.id
                ? "border-primary text-primary bg-primary/5"
                : "border-cloud text-silver hover:text-mid-gray hover:border-silver"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Upcoming webinars */}
      {filtered.some((m) => m.format === "webinar" && m.date) && (
        <div className="mb-10">
          <h3 className="section-label mb-4">Upcoming Webinars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered
              .filter((m) => m.format === "webinar" && m.date)
              .map((module) => (
                <div
                  key={module.id}
                  className="border border-cloud p-6 bg-whisper"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="metadata text-mid-gray mb-2">
                        {module.date
                          ? new Date(module.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                      <h4 className="heading-card text-base">{module.title}</h4>
                    </div>
                    <span className="metadata text-silver flex-shrink-0">
                      {module.duration}
                    </span>
                  </div>
                  <p className="text-body text-sm mb-4">{module.description}</p>
                  <button className="btn-primary text-xs px-4 py-2">
                    Register
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Training modules list */}
      <h3 className="section-label mb-4">Training Library</h3>
      <div className="space-y-3">
        {filtered
          .filter((m) => m.format !== "webinar" || !m.date)
          .map((module) => (
            <div
              key={module.id}
              className={`border border-cloud p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors duration-200 hover:bg-off-white ${
                module.completed ? "opacity-70" : ""
              }`}
            >
              {/* Completion indicator */}
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 border flex items-center justify-center ${
                    module.completed
                      ? "bg-primary border-primary"
                      : "border-silver"
                  }`}
                >
                  {module.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="heading-card text-base">{module.title}</h4>
                </div>
                <p className="text-body text-sm line-clamp-2">
                  {module.description}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="metadata text-silver">
                  {formatLabels[module.format]}
                </span>
                <span className="metadata text-silver">{module.duration}</span>
                <button
                  className={`metadata transition-colors duration-300 ${
                    module.completed
                      ? "text-silver"
                      : "text-primary hover:text-true-black"
                  }`}
                >
                  {module.completed ? "Review" : "Start"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-body">No training modules found in this category.</p>
        </div>
      )}

      {/* Resources section */}
      <div className="mt-12">
        <h3 className="section-label mb-4">Quick Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Product Comparison Chart",
              description: "Side-by-side comparison of all pool table models with dimensions, weights, and features.",
              type: "PDF",
            },
            {
              title: "Finish Swatch Reference",
              description: "Printable swatch sheet showing all available wood finishes and felt colors.",
              type: "PDF",
            },
            {
              title: "Room Size Calculator",
              description: "Interactive guide for determining minimum and recommended room dimensions.",
              type: "Link",
            },
            {
              title: "Warranty Registration Guide",
              description: "Step-by-step instructions for registering warranties through the dealer portal.",
              type: "PDF",
            },
            {
              title: "Installation Checklist",
              description: "Pre-delivery and post-installation checklist for quality assurance.",
              type: "PDF",
            },
            {
              title: "Dealer Support Directory",
              description: "Contact information for regional reps, technical support, and order management.",
              type: "PDF",
            },
          ].map((resource) => (
            <div
              key={resource.title}
              className="border border-cloud p-5 hover:bg-off-white transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="heading-card text-sm">{resource.title}</h4>
                <span className="metadata text-silver flex-shrink-0">
                  {resource.type}
                </span>
              </div>
              <p className="text-body text-xs mb-3">{resource.description}</p>
              <button className="metadata text-primary hover:text-true-black transition-colors duration-300">
                {resource.type === "Link" ? "Open" : "Download"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
