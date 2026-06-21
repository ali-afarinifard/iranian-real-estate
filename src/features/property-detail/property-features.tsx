"use client";
import React, { use } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { CheckCircleRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface PropertyFeaturesProps {
  features: string[];
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  if (!features.length) return null;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {t("filters.features")}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {features.map((feat) => (
          <Chip
            key={feat}
            label={t(feat)}
            icon={<CheckCircleRounded />}
            variant="outlined"
            size="small"
            color="primary"
            sx={{
              fontWeight: 500,
              "& .MuiChip-icon": {
                position: "relative",
                right: isRTL ? "6px" : undefined,
              },
              "& .MuiChip-label": {
                position: "relative",
                top: !isRTL ? "1px" : undefined,
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
