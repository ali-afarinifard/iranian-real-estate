"use client";
import React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import {
  BathtubRounded,
  BedRounded,
  CalendarMonthRounded,
  GarageRounded,
  LocationOnRounded,
  SquareFootRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { formatArea, timeAgo, toPersianNumber } from "@/lib/utils";
import type { Property } from "@/types";
import { useTranslation } from "react-i18next";

interface PropertyInfoProps {
  property: Property;
}

const STATUS_COLORS = {
  available: "success",
  pending: "warning",
  sold: "error",
  rented: "error",
} as const;

export function PropertyInfo({ property }: PropertyInfoProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Status badges */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Chip
          label={
            property.listingType === "sale"
              ? t("property.forSale")
              : t("property.forRent")
          }
          color={property.listingType === "sale" ? "primary" : "secondary"}
          sx={{ fontWeight: 700 }}
        />
        <Chip
          label={property.status}
          color={STATUS_COLORS[property.status] ?? "default"}
          sx={{ fontWeight: 700, textTransform: "capitalize" }}
        />
        {property.isNew && (
          <Chip
            label={t("property.new")}
            color="success"
            sx={{ fontWeight: 700 }}
          />
        )}
      </Box>

      {/* Title + location */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" color="primary.main" fontWeight={700}>
          {property.type} · {property.location.district}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mt: 0.5, mb: 1.5, lineHeight: 1.2 }}
        >
          {property.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocationOnRounded sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {property.location.address}, {property.location.district},{" "}
            {property.location.city}
            {property.location.zipCode && ` · ${property.location.zipCode}`}
          </Typography>
        </Box>
      </Box>

      {/* Key stats */}
      <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ gap: 2, mb: 3 }}>
        {property.bedrooms > 0 && (
          <StatItem
            icon={<BedRounded color="primary" />}
            label={t("property.bedrooms")}
            value={
              isRTL ? toPersianNumber(property.bedrooms) : property.bedrooms
            }
          />
        )}
        {property.bathrooms > 0 && (
          <StatItem
            icon={<BathtubRounded color="primary" />}
            label={t("property.bathrooms")}
            value={
              isRTL ? toPersianNumber(property.bathrooms) : property.bathrooms
            }
          />
        )}
        <StatItem
          icon={<SquareFootRounded color="primary" />}
          label={t("property.area")}
          value={
            isRTL
              ? toPersianNumber(formatArea(property.area))
              : formatArea(property.area)
          }
        />
        {property.parkingSpots > 0 && (
          <StatItem
            icon={<GarageRounded color="primary" />}
            label={t("property.parking")}
            value={
              isRTL
                ? toPersianNumber(property.parkingSpots)
                : property.parkingSpots
            }
          />
        )}
        {property.floor !== undefined && (
          <StatItem
            label={t("property.floor")}
            value={`${isRTL ? toPersianNumber(property.floor) : property.floor} / ${isRTL ? toPersianNumber(property.totalFloors) : property.totalFloors}`}
          />
        )}
        {property.yearBuilt && (
          <StatItem
            label={t("property.yearBuilt")}
            value={
              isRTL ? toPersianNumber(property.yearBuilt) : property.yearBuilt
            }
          />
        )}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {t("property.description")}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {property.description}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Meta */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <CalendarMonthRounded
            sx={{ fontSize: 16, color: "text.secondary" }}
          />
          <Typography variant="caption" color="text.secondary">
            Listed {timeAgo(property.createdAt)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <VisibilityRounded sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {property.viewCount.toLocaleString()} views
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

interface StatItemProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography fontWeight={700}>{value}</Typography>
      </Box>
    </Box>
  );
}
