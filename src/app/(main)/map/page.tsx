"use client";

import React, { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Stack,
  Button,
  Divider,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMapPropertiesQuery } from "@/store/api/propertiesApi";
import { MapHoverCard } from "@/features/map/components/MapHoverCard";
import { MapPropertyPanel } from "@/features/map/components/MapPropertyPanel";
import type { MapProperty } from "@/store/api/propertiesApi";

const LeafletMap = dynamic(
  () => import("@/features/map/components/LeafletMap"),
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

// ── Map Page
export default function MapPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(
    null,
  );
  const [hoveredProperty, setHoveredProperty] = useState<MapProperty | null>(
    null,
  );
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const mapBoxRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, refetch } = useGetMapPropertiesQuery({
    city: undefined,
  });
  const properties = data?.data ?? [];

  const handleSelect = useCallback((property: MapProperty) => {
    setSelectedProperty(property);
    setHoveredProperty(null);
  }, []);

  const handleClose = useCallback(() => setSelectedProperty(null), []);

  const handleHover = useCallback((property: MapProperty | null) => {
    setHoveredProperty(property);
  }, []);

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
      {/* Map container*/}
      <Box
        ref={mapBoxRef}
        sx={{ flex: 1, position: "relative" }}
        onMouseMove={handleMouseMove}
      >
        {/* Loading overlay */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(theme.palette.background.paper, 0.75),
              backdropFilter: "blur(4px)",
            }}
          >
            <Stack alignItems="center" spacing={2}>
              <CircularProgress size={40} />
              <Typography variant="body2" color="text.secondary">
                Loading listings…
              </Typography>
            </Stack>
          </Box>
        )}

        {/* Error state */}
        {isError && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Alert
              severity="error"
              action={
                <Button size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              }
            >
              Failed to load map data.
            </Alert>
          </Box>
        )}

        {/* Leaflet map */}
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

        {/* Legend */}
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: 24,
            left: 16,
            zIndex: 1000,
            px: 2,
            py: 1.25,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backdropFilter: "blur(8px)",
            bgcolor: alpha(theme.palette.background.paper, 0.9),
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#1463C7",
              }}
            />
            <Typography variant="caption" fontWeight={600}>
              For Sale
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#F97316",
              }}
            />
            <Typography variant="caption" fontWeight={600}>
              For Rent
            </Typography>
          </Box>
          {properties.length > 0 && (
            <>
              <Divider orientation="vertical" flexItem />
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                {properties.length} listings
              </Typography>
            </>
          )}
        </Paper>
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
