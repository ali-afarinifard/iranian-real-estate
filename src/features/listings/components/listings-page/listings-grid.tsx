"use client";
import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import {
  PropertyCard,
  PropertyCardSkeleton,
} from "@/features/listings/components/PropertyCard";
import { PER_PAGE } from "@/lib/constants";
import type { PropertySummary } from "@/types";
import { useLoadMore } from "@/hooks/use-load-more";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

interface ListingsGridProps {
  properties: PropertySummary[];
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  total: number;
  onLoadMore: () => void;
}

export function ListingsGrid({
  properties,
  isLoading,
  isFetching,
  hasMore,
  total,
  onLoadMore,
}: ListingsGridProps) {
  const sentinelRef = useLoadMore({
    onLoadMore,
    enabled: hasMore && !isFetching,
  });
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  console.log("t: ", t);
  console.log("i18n: ", i18n);

  return (
    <>
      <Grid container spacing={3}>
        {isLoading
          ? Array.from({ length: PER_PAGE }).map((_, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <PropertyCardSkeleton />
              </Grid>
            ))
          : properties.map((property, i) => (
              <Grid item xs={12} sm={6} lg={4} key={property.id}>
                <PropertyCard property={property} index={i % PER_PAGE} />
              </Grid>
            ))}
      </Grid>

      {/* Sentinel — window-level observer */}
      <Box
        ref={sentinelRef}
        sx={{ py: 4, display: "flex", justifyContent: "center" }}
      >
        {isFetching && !isLoading && <CircularProgress size={28} />}
        {!hasMore && properties.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {`${isRTL ? toPersianNumber(total) : total} ${t("common.propertiesLoaded")}`}
          </Typography>
        )}
      </Box>
    </>
  );
}
