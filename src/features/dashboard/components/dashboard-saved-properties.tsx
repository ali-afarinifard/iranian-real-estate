"use client";
import React from "react";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { FavoriteRounded } from "@mui/icons-material";
import NextLink from "next/link";
import {
  PropertyCard,
  PropertyCardSkeleton,
} from "@/features/listings/components/PropertyCard";
import type { PropertySummary } from "@/types";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

const PREVIEW_COUNT = 3;

interface DashboardSavedPropertiesProps {
  properties: PropertySummary[];
  isLoading: boolean;
}

function SavedPropertiesEmpty() {
  return (
    <Paper
      sx={{
        p: 6,
        borderRadius: 3,
        textAlign: "center",
        border: "2px dashed",
        borderColor: "divider",
      }}
    >
      <FavoriteRounded sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No saved properties yet
      </Typography>
      <Button
        component={NextLink}
        href="/listings"
        variant="contained"
        sx={{ mt: 1 }}
      >
        Start Browsing
      </Button>
    </Paper>
  );
}

export function DashboardSavedProperties({
  properties,
  isLoading,
}: DashboardSavedPropertiesProps) {
  const { t, i18n } = useTranslation();
  const preview = properties.slice(0, PREVIEW_COUNT);

  const isRTL = i18n.dir() === "rtl";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {t("dashboard.savedProperties")}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {properties.length > 0 && (
              <Chip
                label={
                  isRTL ? toPersianNumber(properties.length) : properties.length
                }
                size="small"
                color="primary"
                sx={{
                  "& .MuiChip-label": {
                    position: "relative",
                    top: '1.3px'
                  },
                }}
              />
            )}
          </Typography>
        </Box>
        <Button component={NextLink} href="/favorites" size="small">
          {t("common.viewAll")}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {isLoading ? (
          Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <PropertyCardSkeleton />
            </Grid>
          ))
        ) : preview.length ? (
          preview.map((property, i) => (
            <Grid item xs={12} sm={6} lg={4} key={property.id}>
              <PropertyCard property={property} index={i} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <SavedPropertiesEmpty />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
