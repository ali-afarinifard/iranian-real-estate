// src/features/map/components/LeafletMap.tsx
"use client";

import { useEffect, useRef } from "react";
import type { MapProperty } from "@/store/api/propertiesApi";
import { MAP_CONFIG } from "@/lib/constants";

interface LeafletMapProps {
  properties: MapProperty[];
  selectedId: string | null;
  onSelectProperty: (property: MapProperty) => void;
  onHoverProperty: (property: MapProperty | null) => void;
  colorMode: "light" | "dark";
}

let L: any = null;

export default function LeafletMap({
  properties,
  selectedId,
  onSelectProperty,
  onHoverProperty,
  colorMode,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const readyRef = useRef(false);

  const propertiesRef = useRef(properties);
  const selectedIdRef = useRef(selectedId);
  const onSelectRef = useRef(onSelectProperty);
  const onHoverRef = useRef(onHoverProperty);
  propertiesRef.current = properties;
  selectedIdRef.current = selectedId;
  onSelectRef.current = onSelectProperty;
  onHoverRef.current = onHoverProperty;

  // Init map
  useEffect(() => {
    if (readyRef.current || !containerRef.current) return;
    if ((containerRef.current as any)._leaflet_id != null) return;

    (async () => {
      if (!L) {
        const mod = await import("leaflet");
        await import("leaflet/dist/leaflet.css");
        L = mod.default ?? mod;
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

      if (propertiesRef.current.length > 0) {
        renderMarkers(
          propertiesRef.current,
          selectedIdRef.current,
          onSelectRef.current,
          onHoverRef.current,
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

  // Re-render markers
  useEffect(() => {
    if (!readyRef.current || !layerGroupRef.current || !properties.length)
      return;
    renderMarkers(properties, selectedId, onSelectProperty, onHoverProperty);
  }, [properties, selectedId, onSelectProperty, onHoverProperty]);

  // Pan to selected
  useEffect(() => {
    if (!readyRef.current || !mapRef.current || !selectedId) return;
    const prop = properties.find((p) => p.id === selectedId);
    if (prop)
      mapRef.current.setView([prop.lat, prop.lng], 14, { animate: true });
  }, [selectedId, properties]);

  // Marker renderer
  function renderMarkers(
    props: MapProperty[],
    activeId: string | null,
    onSelect: (p: MapProperty) => void,
    onHover: (p: MapProperty | null) => void,
  ) {
    if (!layerGroupRef.current || !L) return;
    layerGroupRef.current.clearLayers();

    props.forEach((property) => {
      const isSelected = property.id === activeId;
      const isSale = property.listingType === "sale";
      const bg = isSelected ? "#EF4444" : isSale ? "#1463C7" : "#F97316";
      const shadow = isSelected
        ? "0 4px 20px rgba(239,68,68,0.55)"
        : isSale
          ? "0 4px 16px rgba(20,99,199,0.45)"
          : "0 4px 16px rgba(249,115,22,0.45)";

      const icon = L.divIcon({
        className: "",
        html: `
          <div class="nestify-marker" style="
            position:relative;
            display:inline-flex;
            flex-direction:column;
            align-items:center;
          ">
            <div style="
              background:${bg};
              color:#fff;
              padding:6px 12px;
              border-radius:24px;
              font-weight:700;
              font-size:12px;
              font-family:Inter,sans-serif;
              white-space:nowrap;
              box-shadow:${shadow};
              border:2.5px solid #fff;
              transform:${isSelected ? "scale(1.18)" : "scale(1)"};
              transition:transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
              cursor:pointer;
              letter-spacing:-0.01em;
            ">€${(property.price / 1000).toFixed(0)}k${isSale ? "" : "/m"}</div>
            <div style="
              width:8px;height:8px;
              background:${bg};
              clip-path:polygon(0 0,100% 0,50% 100%);
              margin-top:-1px;
            "></div>
          </div>`,
        iconAnchor: [36, 32],
        iconSize: [72, 32],
      });

      const marker = L.marker([property.lat, property.lng], { icon });

      marker.on("click", () => onSelect(property));
      marker.on("mouseover", () => onHover(property));
      marker.on("mouseout", () => onHover(null));

      layerGroupRef.current.addLayer(marker);
    });
  }

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
