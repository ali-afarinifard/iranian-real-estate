"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Stack,
  Button,
  alpha,
} from "@mui/material";
import {
  CloseRounded,
  BedRounded,
  SquareFootRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";
import NextLink from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMapPropertiesQuery } from "@/store/api/propertiesApi";
import { formatPrice, formatArea } from "@/lib/utils";
import type { MapProperty } from "@/store/api/propertiesApi";

// Dynamic import (Leaflet needs browser)
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

export default function MapPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(
    null,
  );

  const { data, isLoading, isError, refetch } = useGetMapPropertiesQuery({
    city: undefined,
  });
  const properties = data?.data ?? [];

  const handleSelect = useCallback((property: MapProperty) => {
    setSelectedProperty(property);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProperty(null);
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
      <Box sx={{ flex: 1, position: "relative" }}>
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
              <CircularProgress />
              <Typography variant="body2" color="text.secondary">
                Loading properties…
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

        <LeafletMap
          properties={properties}
          selectedId={selectedProperty?.id ?? null}
          onSelectProperty={handleSelect}
          colorMode={theme.palette.mode}
        />

        {/* Legend */}
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            bottom: 24,
            left: 16,
            zIndex: 1000,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
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
            <Typography variant="caption" color="text.secondary">
              {properties.length} listings
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Desktop sidebar panel */}
      <AnimatePresence>
        {selectedProperty && !isMobile && (
          <motion.div
            key={selectedProperty.id}
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: 10, height: "100%" }}
          >
            <PropertyPanel property={selectedProperty} onClose={handleClose} />
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
            sx: { borderRadius: "20px 20px 0 0", maxHeight: "65vh" },
          }}
        >
          {selectedProperty && (
            <PropertyPanel
              property={selectedProperty}
              onClose={handleClose}
              mobile
            />
          )}
        </Drawer>
      )}
    </Box>
  );
}

// Property detail panel
function PropertyPanel({
  property,
  onClose,
  mobile = false,
}: {
  property: MapProperty;
  onClose: () => void;
  mobile?: boolean;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: mobile ? "100%" : 360,
        height: mobile ? "auto" : "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        borderLeft: mobile ? "none" : `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative", height: 220, flexShrink: 0 }}>
        <NextImage
          src={property.primaryImage.url}
          alt={property.primaryImage.alt}
          fill
          sizes="360px"
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          }}
        />

        {/* Close */}
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: alpha("#000", 0.45),
            color: "#fff",
            "&:hover": { bgcolor: alpha("#000", 0.65) },
          }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>

        {/* Price + type */}
        <Box sx={{ position: "absolute", bottom: 12, left: 12 }}>
          <Chip
            label={property.listingType === "sale" ? "For Sale" : "For Rent"}
            size="small"
            sx={{
              bgcolor: property.listingType === "sale" ? "#1463C7" : "#F97316",
              color: "#fff",
              fontWeight: 700,
              mb: 0.75,
            }}
          />
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: "#fff", lineHeight: 1.2 }}
          >
            {formatPrice(property.price, property.currency as "EUR")}
            {property.listingType === "rent" && (
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.8)", ml: 0.5 }}
              >
                /mo
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1, p: 2.5, overflowY: "auto" }}>
        <Typography variant="overline" color="primary.main" fontWeight={700}>
          {property.type}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mt: 0.5, mb: 1.5, lineHeight: 1.3 }}
        >
          {property.title}
        </Typography>

        <Stack direction="row" spacing={2.5} sx={{ mb: 3 }}>
          {property.bedrooms > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <BedRounded sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" fontWeight={600}>
                {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <SquareFootRounded sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" fontWeight={600}>
              {formatArea(property.area)}
            </Typography>
          </Box>
        </Stack>

        <Button
          component={NextLink}
          href={`/property/${property.id}`}
          variant="contained"
          fullWidth
          size="large"
          endIcon={<ArrowForwardRounded />}
        >
          View Full Details
        </Button>
      </Box>
    </Box>
  );
}
