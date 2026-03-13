"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DealerLocator() {
  const [zip, setZip] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = zip.trim();
    router.push(query ? `/en/dealer?zip=${query}` : "/en/dealer");
  };

  return (
    <section style={{ backgroundColor: "#1a3a2a" }} className="py-10">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <p
          className="mb-3 text-[10px] tracking-[2.5px] uppercase"
          style={{
            fontFamily: "var(--font-label)",
            fontWeight: 500,
            color: "#c8a96e",
          }}
        >
          Dealer Exclusive
        </p>

        <h2 className="heading-display text-xl md:text-2xl mb-6 text-white">
          Your Dealer Is Closer Than You Think
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 justify-center mb-4"
        >
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter your zip code"
            className="w-full md:w-[280px] px-4 py-3 text-[13px] text-[#1a1a1a] placeholder:text-[#999] bg-white focus:outline-none focus:border-[#c8a96e]/40 transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              borderRadius: "2px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 text-[11px] tracking-[1.5px] uppercase text-white hover:brightness-125 transition-all duration-300"
            style={{
              fontFamily: "var(--font-label)",
              fontWeight: 500,
              backgroundColor: "#0f2a1c",
              borderRadius: "2px",
            }}
          >
            Find a Dealer
          </button>
        </form>

        <p
          className="text-[12px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Every table is delivered and installed by an authorized dealer in your
          area.
        </p>
      </div>
    </section>
  );
}
