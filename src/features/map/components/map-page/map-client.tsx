"use client";

import React, { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  CircularProgress,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useGetMapPropertiesQuery } from "@/store/api/propertiesApi";
import { MapPropertyPanel } from "@/features/map/components/map-property-panel";
import { MapLoadingOverlay } from "./map-loading-overlay";
import { MapErrorOverlay } from "./map-error-overlay";
import { MapLegend } from "./map-legend";
import { MapHoverCard } from "./map-hover-card";
import { IMapProperty } from "@/types";

const LeafletMap = dynamic(
  () => import("@/features/map/components/leaflet-map/leaflet-map"),
  {
    ssr: false,
    loading: () => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    ),
  },
);

export function MapClient() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedProperty, setSelectedProperty] = useState<IMapProperty | null>(
    null,
  );
  const [hoveredProperty, setHoveredProperty] = useState<IMapProperty | null>(
    null,
  );
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const mapBoxRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, refetch } = useGetMapPropertiesQuery({
    city: undefined,
  });
  const properties = data?.data ?? [];

  const handleSelect = useCallback((property: IMapProperty) => {
    setSelectedProperty(property);
    setHoveredProperty(null);
  }, []);

  const handleClose = useCallback(() => setSelectedProperty(null), []);
  const handleHover = useCallback(
    (property: IMapProperty | null) => setHoveredProperty(property),
    [],
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = mapBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Map container */}
      <Box
        ref={mapBoxRef}
        sx={{ flex: 1, position: "relative" }}
        onMouseMove={handleMouseMove}
      >
        {isLoading && <MapLoadingOverlay />}
        {isError && <MapErrorOverlay onRetry={refetch} />}

        <LeafletMap
          properties={properties}
          selectedId={selectedProperty?.id ?? null}
          onSelectProperty={handleSelect}
          onHoverProperty={handleHover}
          colorMode={theme.palette.mode}
        />

        {/* Hover card */}
        <AnimatePresence>
          {hoveredProperty && !selectedProperty && !isMobile && (
            <Box
              sx={{
                position: "absolute",
                left: hoverPos.x + 16,
                top: hoverPos.y - 180,
                zIndex: 2000,
                pointerEvents: "none",
              }}
            >
              <MapHoverCard property={hoveredProperty} />
            </Box>
          )}
        </AnimatePresence>

        {!isMobile && <MapLegend count={properties.length} />}
      </Box>

      {/* Desktop sidebar */}
      <AnimatePresence mode="wait" initial={false}>
        {selectedProperty && !isMobile && (
          <motion.div
            key="sidebar-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { type: "tween", duration: 0.22, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.15 },
            }}
            style={{
              zIndex: 10,
              height: "100%",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <MapPropertyPanel
              property={selectedProperty}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom drawer */}
      {isMobile && (
        <Drawer
          anchor="bottom"
          open={!!selectedProperty}
          onClose={handleClose}
          PaperProps={{
            sx: { borderRadius: "20px 20px 0 0", maxHeight: "70vh" },
          }}
        >
          <AnimatePresence>
            {selectedProperty && (
              <motion.div
                key={selectedProperty.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <MapPropertyPanel
                  property={selectedProperty}
                  onClose={handleClose}
                  mobile
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Drawer>
      )}
    </Box>
  );
}
