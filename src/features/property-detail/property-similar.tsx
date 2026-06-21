"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PropertyCard } from "@/features/listings/components/PropertyCard";
import type { PropertySummary } from "@/types";
import { useTranslation } from "react-i18next";

interface PropertySimilarProps {
  properties: PropertySummary[];
}

export function PropertySimilar({ properties }: PropertySimilarProps) {
  if (!properties.length) return null;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight={800} gutterBottom>
        {t("property.similarProperties")}
      </Typography>
      <Grid container spacing={3}>
        {properties.map((property, i) => (
          <Grid item xs={12} sm={6} lg={3} key={property.id}>
            <PropertyCard property={property} index={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
