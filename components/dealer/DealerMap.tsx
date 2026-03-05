"use client";

import { useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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
const DEFAULT_CENTER: [number, number] = [-98.5, 39.8];
const DEFAULT_ZOOM = 3.5;

const DealerMap = ({
  dealers,
  selectedId,
  hoveredId,
  userLocation,
  onSelectDealer,
  onHoverDealer,
}: DealerMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const createMarkerEl = useCallback(
    (dealerId: string, isSelected: boolean, isHovered: boolean) => {
      const el = document.createElement("div");
      el.style.width = isSelected ? "20px" : isHovered ? "18px" : "14px";
      el.style.height = isSelected ? "20px" : isHovered ? "18px" : "14px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = isSelected ? BRAND_GOLD : BRAND_GREEN;
      el.style.border = `2px solid ${isSelected ? BRAND_GREEN : "white"}`;
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";
      el.style.cursor = "pointer";
      el.style.transition = "all 0.2s ease";
      el.dataset.dealerId = dealerId;
      return el;
    },
    []
  );

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.warn("Mapbox token not set. Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local");
      return;
    }

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: userLocation
        ? [userLocation.lng, userLocation.lat]
        : DEFAULT_CENTER,
      zoom: userLocation ? 8 : DEFAULT_ZOOM,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    // Desaturate the base style once loaded
    map.on("style.load", () => {
      const layers = map.getStyle().layers;
      if (layers) {
        for (const layer of layers) {
          if (
            layer.type === "fill" &&
            layer.id.includes("land")
          ) {
            map.setPaintProperty(layer.id, "fill-color", "#f0ede8");
          }
          if (layer.type === "line" && layer.id.includes("road")) {
            map.setPaintProperty(layer.id, "line-color", "#ddd9d3");
          }
        }
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers when dealers change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    dealers.forEach((dealer) => {
      const isSelected = dealer.id === selectedId;
      const isHovered = dealer.id === hoveredId;
      const el = createMarkerEl(dealer.id, isSelected, isHovered);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectDealer(dealer.id);
      });

      el.addEventListener("mouseenter", () => {
        onHoverDealer(dealer.id);
        if (popupRef.current) popupRef.current.remove();
        popupRef.current = new mapboxgl.Popup({
          offset: 12,
          closeButton: false,
          closeOnClick: false,
          className: "dealer-popup",
        })
          .setLngLat([dealer.lng, dealer.lat])
          .setHTML(
            `<div style="font-family:var(--font-display);font-size:13px;font-weight:400;color:#1a1a1a;padding:2px 4px;">${dealer.name}</div>`
          )
          .addTo(map);
      });

      el.addEventListener("mouseleave", () => {
        onHoverDealer(null);
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([dealer.lng, dealer.lat])
        .addTo(map);

      markersRef.current.set(dealer.id, marker);
    });
  }, [dealers, selectedId, hoveredId, createMarkerEl, onSelectDealer, onHoverDealer]);

  // Fly to selected dealer
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;

    const dealer = dealers.find((d) => d.id === selectedId);
    if (dealer) {
      map.flyTo({
        center: [dealer.lng, dealer.lat],
        zoom: 10,
        duration: 800,
      });
    }
  }, [selectedId, dealers]);

  // Fit bounds when dealers change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || dealers.length === 0) return;

    // Wait for map to be ready
    if (!map.isStyleLoaded()) {
      map.once("style.load", fitBounds);
    } else {
      fitBounds();
    }

    function fitBounds() {
      if (dealers.length === 1) {
        map!.flyTo({
          center: [dealers[0].lng, dealers[0].lat],
          zoom: 10,
          duration: 600,
        });
        return;
      }

      const bounds = new mapboxgl.LngLatBounds();
      if (userLocation) {
        bounds.extend([userLocation.lng, userLocation.lat]);
      }
      dealers.slice(0, 8).forEach((d) => bounds.extend([d.lng, d.lat]));

      map!.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 12,
        duration: 600,
      });
    }
  }, [dealers, userLocation]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div className="w-full h-[300px] md:min-h-[540px] flex items-center justify-center bg-[#f0ede8]" style={{ borderRadius: "2px" }}>
        <div className="text-center p-6">
          <p className="text-[14px] text-[#777] mb-2" style={{ fontFamily: "var(--font-sans)" }}>
            Map unavailable
          </p>
          <p className="text-[12px] text-[#999]" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
            Add NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] md:h-[540px]"
      style={{ borderRadius: "2px" }}
    />
  );
};

export default DealerMap;
