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
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          {t("searchLabel")}
        </p>
        <div className="h-px bg-gray-200 mb-8" />
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
            <div key={d.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{d.name}</h3>
                  {d.type === "premium" && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {t("premiumDealer")}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400">{d.distance} {t("mi")}</span>
              </div>
              <div className="text-sm text-gray-500 space-y-1 mb-3">
                <p>{d.address}</p>
                <p>{d.city}, {d.state} {d.zip}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={`tel:${d.phone.replace(/-/g, "")}`}
                  className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {d.phone}
                </a>
                {d.website && (
                  <a
                    href={d.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
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
          <p className="text-gray-500 mb-4">{t("noResults")}</p>
          <Link href="/contact-us" className="text-sm text-gray-900 underline hover:no-underline">
            {t("contactUs")}
          </Link>
        </div>
      )}

      {!searched && (
        <div className="py-12 text-center text-gray-300">
          <p className="text-xl font-light mb-2">{t("networkTitle")}</p>
          <p className="text-sm">{t("networkDescription")}</p>
        </div>
      )}
    </div>
  );
}
