"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import type { Dealer, DealerWithDistance } from "@/lib/dealer-types";
import {
  filterDealers,
  sortByDistance,
  sortAlphabetically,
} from "@/lib/dealer-utils";
import DealerSearchBar from "./DealerSearchBar";
import DealerList from "./DealerList";
import InquiryModal from "./InquiryModal";
import dealerData from "@/data/dealers.json";
import { company } from "@/lib/products";

const DealerMap = dynamic(() => import("./DealerMap"), { ssr: false });

const allDealers = dealerData as Dealer[];

const DealerLocatorPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const [hoveredDealerId, setHoveredDealerId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [inquiryDealerId, setInquiryDealerId] = useState<string | null>(null);

  // Request geolocation on mount
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {} // Denied, use default
    );
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter + sort dealers
  const filteredDealers: DealerWithDistance[] = useMemo(() => {
    const filtered = filterDealers(allDealers, debouncedQuery, activeModel);
    return userLocation
      ? sortByDistance(filtered, userLocation.lat, userLocation.lng)
      : sortAlphabetically(filtered);
  }, [debouncedQuery, activeModel, userLocation]);

  const handleSelectDealer = useCallback((id: string) => {
    setSelectedDealerId((prev) => (prev === id ? null : id));
  }, []);

  const handleHoverDealer = useCallback((id: string | null) => {
    setHoveredDealerId(id);
  }, []);

  const handleOpenInquiry = useCallback((id: string) => {
    setInquiryDealerId(id);
  }, []);

  const inquiryDealer = inquiryDealerId
    ? allDealers.find((d) => d.id === inquiryDealerId) ?? null
    : null;

  return (
    <div className="bg-[#faf9f6]">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1a3a2a 0%, #264d38 60%, #2d5a42 100%)",
        }}
      >
        {/* Diagonal line pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,1) 30px, rgba(255,255,255,1) 31px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
          <p
            className="text-[10px] tracking-[3px] uppercase text-[#c8a96e] mb-4"
            style={{ fontFamily: "var(--font-label)" }}
          >
            The C.L. Bailey Co.
          </p>
          <h1 className="heading-hero text-white mb-4">
            Find Your Authorized Dealer
          </h1>
          <p
            className="max-w-lg mx-auto text-[14px] leading-relaxed"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Every C.L. Bailey table is delivered, installed, and serviced by an
            authorized dealer in your area.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <DealerSearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        activeModel={activeModel}
        onModelChange={setActiveModel}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((v) => !v)}
      />

      {/* Map + List Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Map */}
          <div
            className="border border-[#e0ddd8] overflow-hidden"
            style={{ borderRadius: "2px" }}
          >
            <DealerMap
              dealers={filteredDealers}
              selectedId={selectedDealerId}
              hoveredId={hoveredDealerId}
              userLocation={userLocation}
              onSelectDealer={handleSelectDealer}
              onHoverDealer={handleHoverDealer}
            />
          </div>

          {/* List */}
          <DealerList
            dealers={filteredDealers}
            hasLocation={!!userLocation}
            selectedId={selectedDealerId}
            hoveredId={hoveredDealerId}
            onSelect={handleSelectDealer}
            onHover={handleHoverDealer}
            onInquiry={handleOpenInquiry}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1a3a2a]">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <p
            className="text-[10px] tracking-[3px] uppercase text-[#c8a96e] mb-4"
            style={{ fontFamily: "var(--font-label)" }}
          >
            Can&apos;t find a dealer near you?
          </p>
          <h2 className="heading-display text-white text-2xl md:text-3xl mb-6">
            We&apos;ll connect you directly.
          </h2>
          <div className="space-y-2 mb-8">
            <p
              className="text-[14px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              <a
                href={`tel:${company.phone.replace(/-/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {company.phone}
              </a>
            </p>
            <p
              className="text-[14px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              <a
                href={`mailto:${company.email}`}
                className="hover:text-white transition-colors"
              >
                {company.email}
              </a>
            </p>
          </div>
          <a
            href="/contact-us"
            className="inline-block px-8 py-3 text-[11px] tracking-[2.5px] uppercase border border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e] hover:text-[#1a3a2a] transition-all duration-300"
            style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        dealer={inquiryDealer}
        open={!!inquiryDealerId}
        onClose={() => setInquiryDealerId(null)}
      />
    </div>
  );
};

export default DealerLocatorPage;
