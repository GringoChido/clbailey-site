"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ConfigureNudgeProps {
  label: string;
}

const ConfigureNudge = ({ label }: ConfigureNudgeProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("configurator");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show nudge when configurator scrolls OUT of view (above viewport)
        setVisible(!entry.isIntersecting && window.scrollY > target.offsetTop);
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToConfigurator = () => {
    const target = document.getElementById("configurator");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <button
      onClick={scrollToConfigurator}
      aria-label={label}
      className={`hidden lg:flex fixed bottom-8 right-8 z-30 items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-3 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="metadata !text-white">{label}</span>
      <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.5} />
    </button>
  );
};

export default ConfigureNudge;
