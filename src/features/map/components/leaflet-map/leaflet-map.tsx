"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MAP_CONFIG } from "@/lib/constants";
import { formatTomanPrice } from "@/lib/localize";
import type { IMapProperty, Language } from "@/types";
import type { Map, LayerGroup } from "leaflet";
import { ILeafletContainer, ILeafletModule } from "./types/leaflet-map.types";

interface ILeafletMapProps {
  properties: IMapProperty[];
  selectedId: string | null;
  onSelectProperty: (property: IMapProperty) => void;
  onHoverProperty: (property: IMapProperty | null) => void;
  colorMode: "light" | "dark";
}

const TILE_URLS = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
} as const;

const MARKER_COLORS = {
  selected: { bg: "#EF4444", shadow: "0 4px 20px rgba(239,68,68,0.55)" },
  sale: { bg: "#1463C7", shadow: "0 4px 16px rgba(20,99,199,0.45)" },
  rent: { bg: "#F97316", shadow: "0 4px 16px rgba(249,115,22,0.45)" },
} as const;

let leafletModule: ILeafletModule | null = null;

async function loadLeaflet(): Promise<ILeafletModule> {
  if (leafletModule) return leafletModule;

  const mod = await import("leaflet");
  await import("leaflet/dist/leaflet.css");

  const L = (mod.default ?? mod) as unknown as ILeafletModule;

  delete L.Icon.Default.prototype["_getIconUrl"];
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  leafletModule = L;
  return L;
}

function buildMarkerHtml(
  bg: string,
  shadow: string,
  isSelected: boolean,
  label: string,
): string {
  return `
    <div style="position:relative;display:inline-flex;flex-direction:column;align-items:center;">
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
        transition:transform 0.2s cubic-bezier(.34,1.56,.64,1),box-shadow 0.2s;
        cursor:pointer;
        letter-spacing:-0.01em;
      ">${label}</div>
      <div style="
        width:8px;height:8px;
        background:${bg};
        clip-path:polygon(0 0,100% 0,50% 100%);
        margin-top:-1px;
      "></div>
    </div>`;
}

export default function LeafletMap({
  properties,
  selectedId,
  onSelectProperty,
  onHoverProperty,
  colorMode,
}: ILeafletMapProps) {
  const containerRef = useRef<ILeafletContainer>(null);
  const mapRef = useRef<Map | null>(null);
  const layerGroupRef = useRef<LayerGroup | null>(null);
  const tileLayerRef = useRef<{ setUrl: (url: string) => void } | null>(null);
  const readyRef = useRef(false);
  const hasFittedRef = useRef(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const lang = i18n.language as Language;

  const propertiesRef = useRef(properties);
  const selectedIdRef = useRef(selectedId);
  const onSelectRef = useRef(onSelectProperty);
  const onHoverRef = useRef(onHoverProperty);
  const langRef = useRef(lang);
  const isRTLRef = useRef(isRTL);
  const colorModeRef = useRef(colorMode);

  propertiesRef.current = properties;
  selectedIdRef.current = selectedId;
  onSelectRef.current = onSelectProperty;
  onHoverRef.current = onHoverProperty;
  langRef.current = lang;
  isRTLRef.current = isRTL;
  colorModeRef.current = colorMode;

  const renderMarkers = useCallback(
    (
      props: IMapProperty[],
      activeId: string | null,
      onSelect: (p: IMapProperty) => void,
      onHover: (p: IMapProperty | null) => void,
      currentLang: Language,
      currentIsRTL: boolean,
    ) => {
      const L = leafletModule;
      if (!layerGroupRef.current || !L) return;

      layerGroupRef.current.clearLayers();

      props.forEach((property) => {
        const isSelected = property.id === activeId;
        const isSale = property.listingType === "sale";

        const colors = isSelected
          ? MARKER_COLORS.selected
          : isSale
            ? MARKER_COLORS.sale
            : MARKER_COLORS.rent;

        const suffix = isSale ? "" : currentIsRTL ? " / ماهانه" : " /mo";
        const label = `${formatTomanPrice(property.price, currentLang)}${suffix}`;

        const icon = L.divIcon({
          className: "",
          html: buildMarkerHtml(colors.bg, colors.shadow, isSelected, label),
          iconAnchor: [36, 32],
          iconSize: [72, 32],
        });

        const marker = L.marker([property.lat, property.lng], { icon });

        marker.on("click", () => onSelect(property));
        marker.on("mouseover", () => onHover(property));
        marker.on("mouseout", () => onHover(null));

        layerGroupRef.current!.addLayer(marker);
      });

      if (
        !hasFittedRef.current &&
        !activeId &&
        mapRef.current &&
        props.length > 0
      ) {
        const bounds = L.latLngBounds(props.map((p) => [p.lat, p.lng]));
        mapRef.current.fitBounds(bounds as Parameters<Map["fitBounds"]>[0], {
          padding: [48, 48],
          maxZoom: 13,
        });
        hasFittedRef.current = true;
      }
    },
    [],
  );

  const renderMarkersRef = useRef(renderMarkers);
  renderMarkersRef.current = renderMarkers;

  // ── Init map
  useEffect(() => {
    if (readyRef.current || !containerRef.current) return;
    if (containerRef.current._leaflet_id != null) return;

    let cancelled = false;

    (async () => {
      const L = await loadLeaflet();
      if (cancelled || !containerRef.current) return;
      if (containerRef.current._leaflet_id != null) return;

      const map = L.map(containerRef.current, {
        center: MAP_CONFIG.defaultCenter,
        zoom: MAP_CONFIG.defaultZoom,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const isMobile = window.innerWidth < 900;
      const zoomStyle = document.createElement("style");
      zoomStyle.textContent = `
      .leaflet-bottom.leaflet-right .leaflet-control-zoom {
        margin-bottom: ${isMobile ? "100px" : "10px"} !important;
      }
    `;
      containerRef.current.appendChild(zoomStyle);

      const tileLayer = L.tileLayer(TILE_URLS[colorModeRef.current], {
        attribution: "© OpenStreetMap © CartoDB",
        subdomains: "abcd",
        maxZoom: 19,
      });
      tileLayer.addTo(map);
      tileLayerRef.current = tileLayer as unknown as {
        setUrl: (url: string) => void;
      };

      layerGroupRef.current = L.layerGroup();
      layerGroupRef.current.addTo(map);
      mapRef.current = map;
      readyRef.current = true;

      if (propertiesRef.current.length > 0) {
        renderMarkersRef.current(
          propertiesRef.current,
          selectedIdRef.current,
          onSelectRef.current,
          onHoverRef.current,
          langRef.current,
          isRTLRef.current,
        );
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerGroupRef.current = null;
        tileLayerRef.current = null;
        readyRef.current = false;
        hasFittedRef.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(TILE_URLS[colorMode]);
  }, [colorMode]);

  // ── Re-render markers
  useEffect(() => {
    if (!readyRef.current || !layerGroupRef.current || !properties.length)
      return;
    renderMarkers(
      properties,
      selectedId,
      onSelectProperty,
      onHoverProperty,
      lang,
      isRTL,
    );
  }, [
    properties,
    selectedId,
    onSelectProperty,
    onHoverProperty,
    lang,
    isRTL,
    renderMarkers,
  ]);

  useEffect(() => {
    if (!readyRef.current || !mapRef.current || !selectedId) return;
    const prop = properties.find((p) => p.id === selectedId);
    if (prop) {
      mapRef.current.setView([prop.lat, prop.lng], 14, { animate: true });
    }
  }, [selectedId, properties]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
      role="region"
      aria-label="Property map"
    />
  );
}
