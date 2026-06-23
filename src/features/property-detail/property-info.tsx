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
import { formatArea, toPersianNumber } from "@/lib/utils";
import { formatRelativeTime, toPersianDigits } from "@/lib/localize";
import type { IProperty } from "@/types";
import { useTranslation } from "react-i18next";
import type { Language } from "@/types";
import { useLocalize } from "@/hooks/use-localize";

interface IPropertyInfoProps {
  property: IProperty;
}

const STATUS_COLORS = {
  available: "success",
  pending: "warning",
  sold: "error",
  rented: "error",
} as const;

export function PropertyInfo({ property }: IPropertyInfoProps) {
  const { t, i18n } = useTranslation();
  const localize = useLocalize();
  const isRTL = i18n.dir() === "rtl";
  const lang = i18n.language as Language;

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
          label={t(`property.status.${property.status}`)}
          color={STATUS_COLORS[property.status] ?? "default"}
          sx={{ fontWeight: 700 }}
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
          {t(`property.type.${property.type}`)} ·{" "}
          {localize(property.location.district)}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mt: 0.5, mb: 1.5, lineHeight: 1.2 }}
        >
          {localize(property.title)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocationOnRounded sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {localize(property.location.address)},{" "}
            {localize(property.location.district)},{" "}
            {localize(property.location.city)}
            {property.location.zipCode &&
              ` · ${
                isRTL
                  ? toPersianDigits(property.location.zipCode)
                  : property.location.zipCode
              }`}
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
              isRTL ? toPersianDigits(property.bedrooms) : property.bedrooms
            }
          />
        )}
        {property.bathrooms > 0 && (
          <StatItem
            icon={<BathtubRounded color="primary" />}
            label={t("property.bathrooms")}
            value={
              isRTL ? toPersianDigits(property.bathrooms) : property.bathrooms
            }
          />
        )}
        <StatItem
          icon={<SquareFootRounded color="primary" />}
          label={t("property.area")}
          value={
            isRTL
              ? toPersianDigits(formatArea(property.area))
              : formatArea(property.area)
          }
        />
        {property.parkingSpots > 0 && (
          <StatItem
            icon={<GarageRounded color="primary" />}
            label={t("property.parking")}
            value={
              isRTL
                ? toPersianDigits(property.parkingSpots)
                : property.parkingSpots
            }
          />
        )}
        {property.floor !== undefined && (
          <StatItem
            label={t("property.floor")}
            value={
              isRTL
                ? `${toPersianDigits(property.floor)} / ${toPersianDigits(property.totalFloors ?? 0)}`
                : `${property.floor} / ${property.totalFloors}`
            }
          />
        )}
        {property.yearBuilt && (
          <StatItem
            label={t("property.yearBuilt")}
            value={
              isRTL ? toPersianDigits(property.yearBuilt) : property.yearBuilt
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
          {isRTL ? toPersianNumber(localize(property.description)) : localize(property.description)}
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
            {isRTL
              ? `ثبت شده ${formatRelativeTime(property.createdAt, lang)}`
              : `Listed ${formatRelativeTime(property.createdAt, lang)}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <VisibilityRounded sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {isRTL
              ? `${toPersianDigits(property.viewCount.toLocaleString())} بازدید`
              : `${property.viewCount.toLocaleString()} views`}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

interface IStatItemProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

function StatItem({ icon, label, value }: IStatItemProps) {
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
