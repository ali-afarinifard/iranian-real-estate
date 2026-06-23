"use client";

import React from "react";
import { Alert, Box, Typography } from "@mui/material";
import { useAppSelector, selectFavoriteIds } from "@/store";
import { FavoritesGrid } from "./favorites-grid";
import { useTranslation } from "react-i18next";
import { useGetPropertiesQuery } from "@/store/api/propertiesApi";

export function FavoritesClient() {
  const { t } = useTranslation();
  const favoriteIds = useAppSelector(selectFavoriteIds);

  const { data, isLoading, isError } = useGetPropertiesQuery({
    page: 1,
    perPage: 100,
  });

  const favoriteProperties =
    data?.data.filter((p) => favoriteIds.includes(p.id)) ?? [];

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          {t("dashboard.savedProperties")}
        </Typography>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {t("listings.error")}
        </Alert>
      )}
      <FavoritesGrid properties={favoriteProperties} isLoading={isLoading} />
    </>
  );
}
