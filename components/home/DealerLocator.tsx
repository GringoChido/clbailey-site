"use client";

import { useState } from "react";
import Link from "next/link";

interface DealerResult {
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  distance: number;
  website?: string;
}

export default function DealerLocator() {
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
      const res = await fetch(`/api/dealers/search?zip=${zip}&limit=3`);
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
    <section className="py-20 lg:py-28 bg-brown text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Copy */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cream/40 mb-4">
              Dealer Network
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl mb-6 leading-tight">
              See it in person.
              <br />
              Buy with confidence.
            </h2>
            <p className="text-cream/60 leading-relaxed mb-8 max-w-md">
              Every C.L. Bailey table is sold through authorized dealers who
              provide white-glove delivery, professional installation, and
              local service for the life of your table.
            </p>
            <Link
              href="/dealer"
              className="text-sm text-cream/50 hover:text-cream transition-colors uppercase tracking-wider"
            >
              View All Dealers &rarr;
            </Link>
          </div>

          {/* Right: Search */}
          <div>
            <form onSubmit={handleSearch} className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-cream/40 mb-3">
                Enter your ZIP code
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="77377"
                  maxLength={5}
                  className="flex-1 bg-transparent border border-cream/20 px-5 py-3.5 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-cream/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={zip.length !== 5 || searching}
                  className="bg-cream text-brown px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-40"
                >
                  {searching ? "..." : "Search"}
                </button>
              </div>
            </form>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-4">
                {results.map((d) => (
                  <div
                    key={d.id}
                    className="border border-cream/10 p-5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-lg">{d.name}</h4>
                      <span className="text-xs text-cream/40">
                        {d.distance} mi
                      </span>
                    </div>
                    <p className="text-sm text-cream/50 mb-1">
                      {d.city}, {d.state}
                    </p>
                    <a
                      href={`tel:${d.phone.replace(/-/g, "")}`}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {d.phone}
                    </a>
                  </div>
                ))}
              </div>
            )}

            {searched && results.length === 0 && (
              <p className="text-sm text-cream/40">
                No dealers found near that ZIP code.{" "}
                <Link href="/contact-us" className="underline hover:text-cream">
                  Contact us
                </Link>{" "}
                for assistance.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
