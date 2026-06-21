"use client";

import React from "react";
import { Alert, Box, Typography } from "@mui/material";
import { useAppSelector, selectViewMode } from "@/store";
import { useListings } from "../../hooks/use-listings";
import { ListingsToolbar } from "./listings-toolbar";
import { ListingsFilterChips } from "./listings-filter-chips";
import { ListingsGrid } from "./listings-grid";
import { ListingsList } from "./listings-list";
import { useTranslation } from "react-i18next";

export function ListingsClient() {
  const { t } = useTranslation();
  const viewMode = useAppSelector(selectViewMode);
  const {
    properties,
    hasMore,
    total,
    isLoading,
    isFetching,
    isError,
    loadMore,
  } = useListings();

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          {t("listings.heading")}
        </Typography>
      </Box>

      <ListingsToolbar />
      <ListingsFilterChips />

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {t("listings.error")}
        </Alert>
      )}

      {viewMode === "grid" && (
        <ListingsGrid
          properties={properties}
          isLoading={isLoading}
          isFetching={isFetching}
          hasMore={hasMore}
          total={total}
          onLoadMore={loadMore}
        />
      )}

      {viewMode === "list" && (
        <ListingsList
          properties={properties}
          isLoading={isLoading}
          isFetching={isFetching}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      )}
    </>
  );
}
