"use client";
import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { FavoriteRounded, SearchRounded } from "@mui/icons-material";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

export function FavoritesEmpty() {
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        p: 8,
        borderRadius: 3,
        textAlign: "center",
        border: "2px dashed",
        borderColor: "divider",
      }}
    >
      <FavoriteRounded sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t("favorites.noSavedProperties")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {t("favorites.browseListingsTapHeartIcon")}
      </Typography>
      <Button
        component={NextLink}
        href="/listings"
        variant="contained"
        startIcon={<SearchRounded />}
        size="large"
      >
        {t("favorites.browseProperties")}
      </Button>
    </Paper>
  );
}
