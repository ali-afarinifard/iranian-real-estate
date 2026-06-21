"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import { BedRounded, SquareFootRounded } from "@mui/icons-material";
import NextImage from "next/image";
import { motion } from "framer-motion";
import type { MapProperty } from "@/store/api/propertiesApi";
import { formatPrice, formatArea, toPersianNumber } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface MapHoverCardProps {
  property: MapProperty;
}

export function MapHoverCard({ property }: MapHoverCardProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const isSale = property.listingType === "sale";
  const isRTL = i18n.dir() === "rtl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ pointerEvents: "none" }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 260,
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        }}
      >
        <Box sx={{ position: "relative", height: 140 }}>
          <NextImage
            src={property.primaryImage.url}
            alt={property.primaryImage.alt}
            fill
            sizes="260px"
            style={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
            }}
          />
          <Chip
            label={isSale ? t("dashboard.forSale") : t("dashboard.forRent")}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: isSale ? "#1463C7" : "#F97316",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.7rem",
            }}
          />
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              position: "absolute",
              bottom: 10,
              left: 12,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            {formatPrice(property.price, property.currency as "EUR")}
            {!isSale && (
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

        <Box sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            noWrap
            sx={{ mb: 0.5 }}
          >
            {property.title}
          </Typography>
          <Stack direction="row" gap={1.5} alignItems="center">
            {property.bedrooms > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                <BedRounded sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="caption" fontWeight={600}>
                  {isRTL
                    ? toPersianNumber(property.bedrooms)
                    : property.bedrooms}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <SquareFootRounded
                sx={{ fontSize: 14, color: "text.secondary" }}
              />
              <Typography variant="caption" fontWeight={600}>
                {isRTL
                  ? toPersianNumber(formatArea(property.area))
                  : formatArea(property.area)}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ ml: "auto !important" }}
            >
              {t("map.clickDetails")}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </motion.div>
  );
}
