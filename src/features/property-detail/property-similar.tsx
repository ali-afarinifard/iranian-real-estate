"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PropertyCard } from "@/features/listings/components/property-card";
import type { IPropertySummary } from "@/types";
import { useTranslation } from "react-i18next";

interface IPropertySimilarProps {
  properties: IPropertySummary[];
}

export function PropertySimilar({ properties }: IPropertySimilarProps) {
  const { t } = useTranslation();

  if (!properties.length) return null;

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
