"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";

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
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      <SectionLabel label={t("searchLabel")} />
      <div className="border-t border-brown/20 pt-4">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-md mb-12">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder={t("placeholder")}
            maxLength={5}
            className="flex-1 border border-brown/20 bg-transparent px-5 py-3.5 text-sm focus:outline-none focus:border-brown transition-colors"
          />
          <button
            type="submit"
            disabled={zip.length !== 5 || searching}
            className="bg-brown text-cream px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-brown-light transition-colors disabled:opacity-40"
          >
            {searching ? t("searching") : t("search")}
          </button>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((d) => (
              <div key={d.id} className="border border-brown/10 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-serif text-xl mb-1">{d.name}</h3>
                    {d.type === "premium" && (
                      <span className="inline-block text-xs uppercase tracking-wider bg-brown/10 text-brown/70 px-2 py-0.5">
                        {t("premiumDealer")}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-brown/40">{d.distance} {t("mi")}</span>
                </div>
                <div className="text-sm text-brown/60 space-y-1 mb-3">
                  <p>{d.address}</p>
                  <p>{d.city}, {d.state} {d.zip}</p>
                </div>
                <div className="flex gap-4">
                  <a
                    href={`tel:${d.phone.replace(/-/g, "")}`}
                    className="text-sm text-brown hover:text-brown-light transition-colors"
                  >
                    {d.phone}
                  </a>
                  {d.website && (
                    <a
                      href={d.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brown/50 hover:text-brown transition-colors"
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
            <p className="text-brown/50 mb-4">{t("noResults")}</p>
            <Link href="/contact-us" className="text-sm text-brown underline hover:no-underline">
              {t("contactUs")}
            </Link>
          </div>
        )}

        {!searched && (
          <div className="py-12 text-center text-brown/30">
            <p className="font-serif text-xl mb-2">{t("networkTitle")}</p>
            <p className="text-sm">{t("networkDescription")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
