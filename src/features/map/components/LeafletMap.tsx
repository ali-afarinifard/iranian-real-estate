"use client";

import { useEffect, useRef } from "react";
import type { MapProperty } from "@/store/api/propertiesApi";
import { MAP_CONFIG } from "@/lib/constants";

interface LeafletMapProps {
  properties: MapProperty[];
  selectedId: string | null;
  onSelectProperty: (property: MapProperty) => void;
  colorMode: "light" | "dark";
}


let L: any = null;

export default function LeafletMap({
  properties,
  selectedId,
  onSelectProperty,
  colorMode,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const readyRef = useRef(false);

  const propertiesRef = useRef(properties);
  const selectedIdRef = useRef(selectedId);
  const onSelectRef = useRef(onSelectProperty);
  propertiesRef.current = properties;
  selectedIdRef.current = selectedId;
  onSelectRef.current = onSelectProperty;

  // Step 1: Init map
  useEffect(() => {
    if (readyRef.current || !containerRef.current) return;
    if ((containerRef.current as any)._leaflet_id != null) return;

    (async () => {
      if (!L) {
        const mod = await import("leaflet");
        await import("leaflet/dist/leaflet.css");
        L = mod.default ?? mod;

        // Fix icon paths — use CDN so no local file needed
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      }

      if (!containerRef.current) return;
      if ((containerRef.current as any)._leaflet_id != null) return;

      const map = L.map(containerRef.current, {
        center: MAP_CONFIG.defaultCenter,
        zoom: MAP_CONFIG.defaultZoom,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const tileUrl =
        colorMode === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        attribution: "© OpenStreetMap © CartoDB",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      readyRef.current = true;

      // Render markers immediately if properties already loaded
      if (propertiesRef.current.length > 0) {
        renderMarkers(
          propertiesRef.current,
          selectedIdRef.current,
          onSelectRef.current,
        );
      }
    })();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerGroupRef.current = null;
        readyRef.current = false;
      }
    };
  }, []);

  // Step 2: Re-render markers when properties or selectedId changes
  useEffect(() => {
    if (!readyRef.current || !layerGroupRef.current) return;
    if (!properties.length) return;
    renderMarkers(properties, selectedId, onSelectProperty);
  }, [properties, selectedId, onSelectProperty]);

  // Step 3: Pan to selected
  useEffect(() => {
    if (!readyRef.current || !mapRef.current || !selectedId) return;
    const prop = properties.find((p) => p.id === selectedId);
    if (prop) {
      mapRef.current.setView([prop.lat, prop.lng], 15, { animate: true });
    }
  }, [selectedId, properties]);

  // Marker renderer
  function renderMarkers(
    props: MapProperty[],
    activeId: string | null,
    onSelect: (p: MapProperty) => void,
  ) {
    if (!layerGroupRef.current || !L) return;

    layerGroupRef.current.clearLayers();

    props.forEach((property) => {
      const isSelected = property.id === activeId;
      const isSale = property.listingType === "sale";
      const bg = isSelected ? "#EF4444" : isSale ? "#1463C7" : "#F97316";
      const border = isSelected ? "#B91C1C" : "#fff";
      const priceK = `€${(property.price / 1000).toFixed(0)}k${isSale ? "" : "/m"}`;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          background:${bg};color:#fff;
          padding:4px 10px;border-radius:20px;
          font-weight:700;font-size:11px;
          font-family:Inter,sans-serif;white-space:nowrap;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          border:2px solid ${border};
          transform:${isSelected ? "scale(1.18)" : "scale(1)"};
          cursor:pointer;
        ">${priceK}</div>`,
        iconAnchor: [28, 14],
      });

      const marker = L.marker([property.lat, property.lng], { icon });
      marker.on("click", () => onSelect(property));
      marker.bindTooltip(
        `<b>${property.title}</b><br/>${property.bedrooms > 0 ? `${property.bedrooms} bed · ` : ""}${property.area}m²`,
        { direction: "top", offset: [0, -10] },
      );
      layerGroupRef.current.addLayer(marker);
    });
  }

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
