"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface DealerResult {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website?: string;
  distance: number;
  type: "authorized" | "premium";
}

export default function DealerSearch() {
  const t = useTranslations("dealer");
  const [zip, setZip] = useState("");
  const [results, setResults] = useState<DealerResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) return;
    setSearching(true);
    setSearched(false);

    try {
      const res = await fetch(`/api/dealers/search?zip=${zip}&limit=10`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  return (
    <div>
      <ScrollReveal>
        <p className="section-label mb-3">
          {t("searchLabel")}
        </p>
        <div className="h-px bg-[var(--color-cloud)] mb-8" />
      </ScrollReveal>

      {/* Search Form */}
      <ScrollReveal delay={1}>
        <form onSubmit={handleSearch} className="flex gap-3 max-w-md mb-12">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder={t("placeholder")}
            maxLength={5}
            className="input-modern flex-1"
          />
          <button
            type="submit"
            disabled={zip.length !== 5 || searching}
            className="btn-primary disabled:opacity-40"
          >
            {searching ? t("searching") : t("search")}
          </button>
        </form>
      </ScrollReveal>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((d) => (
            <div key={d.id} className="border border-[var(--color-cloud)] p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="heading-card mb-1">{d.name}</h3>
                  {d.type === "premium" && (
                    <span className="inline-block metadata !text-[var(--color-mid-gray)] bg-[var(--color-off-white)] px-2 py-0.5">
                      {t("premiumDealer")}
                    </span>
                  )}
                </div>
                <span className="text-[13px] text-[var(--color-mid-gray)]">{d.distance} {t("mi")}</span>
              </div>
              <div className="text-[13px] text-[var(--color-body)] space-y-1 mb-3">
                <p>{d.address}</p>
                <p>{d.city}, {d.state} {d.zip}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={`tel:${d.phone.replace(/-/g, "")}`}
                  className="text-[13px] text-[var(--color-primary)] hover:text-[var(--color-mid-gray)] transition-colors duration-300"
                >
                  {d.phone}
                </a>
                {d.website && (
                  <a
                    href={d.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[var(--color-mid-gray)] hover:text-[var(--color-primary)] transition-colors duration-300"
                  >
                    {t("website")} &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[13px] text-[var(--color-body)] mb-4">{t("noResults")}</p>
          <Link href="/contact-us" className="text-[13px] text-[var(--color-primary)] underline hover:no-underline">
            {t("contactUs")}
          </Link>
        </div>
      )}

      {!searched && (
        <div className="py-12 text-center">
          <p className="heading-sub text-xl mb-2">{t("networkTitle")}</p>
          <p className="text-[13px] text-[var(--color-body)]">{t("networkDescription")}</p>
        </div>
      )}
    </div>
  );
}
