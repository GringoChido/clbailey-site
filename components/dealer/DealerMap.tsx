"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import type { DealerWithDistance } from "@/lib/dealer-types";

interface DealerMapProps {
  dealers: DealerWithDistance[];
  selectedId: string | null;
  hoveredId: string | null;
  userLocation: { lat: number; lng: number } | null;
  onSelectDealer: (id: string) => void;
  onHoverDealer: (id: string | null) => void;
}

const BRAND_GREEN = "#1a3a2a";
const BRAND_GOLD = "#c8a96e";
const DEFAULT_CENTER = { lat: 39.8, lng: -98.5 };
const DEFAULT_ZOOM = 4;

const DealerMarker = ({
  dealer,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  dealer: DealerWithDistance;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const size = isSelected ? 20 : isHovered ? 18 : 14;

  return (
    <AdvancedMarker
      position={{ lat: dealer.lat, lng: dealer.lng }}
      onClick={() => onSelect(dealer.id)}
      onMouseEnter={() => {
        onHover(dealer.id);
        setShowInfo(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setShowInfo(false);
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: isSelected ? BRAND_GOLD : BRAND_GREEN,
          border: `2px solid ${isSelected ? BRAND_GREEN : "white"}`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      />
      {showInfo && (
        <InfoWindow
          anchor={null}
          position={{ lat: dealer.lat, lng: dealer.lng }}
          pixelOffset={[0, -16]}
          headerDisabled
          onCloseClick={() => setShowInfo(false)}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 13,
              fontWeight: 400,
              color: "#1a1a1a",
              padding: "2px 4px",
            }}
          >
            {dealer.name}
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

const MapController = ({
  dealers,
  selectedId,
  userLocation,
}: {
  dealers: DealerWithDistance[];
  selectedId: string | null;
  userLocation: { lat: number; lng: number } | null;
}) => {
  const map = useMap();
  const hasInitialFit = useRef(false);

  // Fit bounds when dealers change
  useEffect(() => {
    if (!map || dealers.length === 0) return;

    // Skip re-fitting if a dealer is selected (flyTo handles that)
    if (selectedId && hasInitialFit.current) return;

    const bounds = new google.maps.LatLngBounds();
    if (userLocation) {
      bounds.extend(userLocation);
    }
    dealers.slice(0, 8).forEach((d) => bounds.extend({ lat: d.lat, lng: d.lng }));

    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    hasInitialFit.current = true;
  }, [map, dealers, userLocation, selectedId]);

  // Pan to selected dealer
  useEffect(() => {
    if (!map || !selectedId) return;
    const dealer = dealers.find((d) => d.id === selectedId);
    if (dealer) {
      map.panTo({ lat: dealer.lat, lng: dealer.lng });
      map.setZoom(10);
    }
  }, [map, selectedId, dealers]);

  return null;
};

const DealerMap = ({
  dealers,
  selectedId,
  hoveredId,
  userLocation,
  onSelectDealer,
  onHoverDealer,
}: DealerMapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSelect = useCallback(
    (id: string) => onSelectDealer(id),
    [onSelectDealer]
  );

  const handleHover = useCallback(
    (id: string | null) => onHoverDealer(id),
    [onHoverDealer]
  );

  if (!apiKey) {
    return (
      <div
        className="w-full h-[300px] md:h-[540px] flex items-center justify-center bg-[#f0ede8]"
        style={{ borderRadius: "2px" }}
      >
        <div className="text-center p-6">
          <p
            className="text-[14px] text-[#777] mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Map unavailable
          </p>
          <p
            className="text-[12px] text-[#999]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the interactive map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] md:h-[540px]" style={{ borderRadius: "2px" }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={
            userLocation
              ? { lat: userLocation.lat, lng: userLocation.lng }
              : DEFAULT_CENTER
          }
          defaultZoom={userLocation ? 8 : DEFAULT_ZOOM}
          gestureHandling="greedy"
          disableDefaultUI
          zoomControl
          mapId="dealer-locator"
          style={{ width: "100%", height: "100%", borderRadius: "2px" }}
        >
          {dealers.map((dealer) => (
            <DealerMarker
              key={dealer.id}
              dealer={dealer}
              isSelected={dealer.id === selectedId}
              isHovered={dealer.id === hoveredId}
              onSelect={handleSelect}
              onHover={handleHover}
            />
          ))}
          <MapController
            dealers={dealers}
            selectedId={selectedId}
            userLocation={userLocation}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default DealerMap;
