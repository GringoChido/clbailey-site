"use client";

interface TimelineStep {
  label: string;
  date?: string;
  note?: string;
  completed: boolean;
  active: boolean;
}

interface StatusTimelineProps {
  steps: TimelineStep[];
}

export default function StatusTimeline({ steps }: StatusTimelineProps) {
  return (
    <div className="flex items-start gap-0 overflow-x-auto py-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start flex-1 min-w-[120px]">
          {/* Step circle + label */}
          <div className="flex flex-col items-center text-center flex-1">
            <div
              className={`w-3 h-3 flex-shrink-0 ${
                step.completed
                  ? "bg-primary"
                  : step.active
                    ? "bg-silver"
                    : "bg-cloud"
              }`}
            />
            {/* Line */}
            {i < steps.length - 1 && (
              <div className="sr-only" />
            )}
            <p
              className={`metadata mt-2 ${
                step.completed ? "text-primary" : "text-body"
              }`}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-[10px] text-body mt-1">
                {new Date(step.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div
              className={`h-px flex-1 mt-1.5 ${
                step.completed ? "bg-primary" : "bg-cloud"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
