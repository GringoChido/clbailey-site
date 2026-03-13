"use client";

import dynamic from "next/dynamic";

const AIConcierge = dynamic(() => import("@/components/ui/AIConcierge"), {
  ssr: false,
});

export default function LazyAIConcierge() {
  return <AIConcierge />;
}
