"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TradeProgramBlockProps {
  locale: string;
}

export default function TradeProgramBlock({ locale }: TradeProgramBlockProps) {
  const router = useRouter();
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) return;
    router.push(`/${locale}/dealer?zip=${zip}`);
  };

  return (
    <section className="bg-[var(--color-cloud)] py-16 lg:py-20">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Trade Program */}
          <div>
            <p className="section-label mb-4">Trade Program</p>
            <h3 className="heading-card mb-4">Become an Authorized Dealer</h3>
            <p className="text-[13px] leading-[26px] text-[var(--color-body)] mb-6">
              Interior designers, retailers, and industry professionals get direct access to our
              custom game room furniture. No minimums. Easy ordering.
            </p>
            <Link href={`/${locale}/dealer-portal`} className="btn-outline">
              Learn More
            </Link>
          </div>

          {/* Find a Dealer */}
          <div>
            <p className="section-label mb-4">Find a Dealer</p>
            <h3 className="heading-card mb-4">Find an Authorized Dealer</h3>
            <p className="text-[13px] leading-[26px] text-[var(--color-body)] mb-6">
              Every C.L. Bailey table is sold, delivered, and installed by an authorized dealer
              near you.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder="ZIP Code"
                maxLength={5}
                inputMode="numeric"
                className="input-modern flex-1"
              />
              <button
                type="submit"
                disabled={zip.length !== 5}
                className="btn-primary disabled:opacity-40"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
