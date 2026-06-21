"use client";

import React from "react";
import { Alert, Box, Typography } from "@mui/material";
import { useGetFavoritesQuery } from "@/store/api/propertiesApi";
import { FavoritesGrid } from "./favorites-grid";
import { useTranslation } from "react-i18next";

export function FavoritesClient() {
  const { data, isLoading, isError } = useGetFavoritesQuery();
  const {t} = useTranslation();
  const properties = data?.data ?? [];

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
      <FavoritesGrid properties={properties} isLoading={isLoading} />
    </>
  );
}
