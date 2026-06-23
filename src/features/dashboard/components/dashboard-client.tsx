"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import NextLink from "next/link";
import {
  useGetStatsQuery,
  useGetFavoritesQuery,
} from "@/store/api/propertiesApi";
import { useAppSelector, selectUser } from "@/store";
import { usePropertySSE } from "@/hooks/use-property-see";
import { DashboardStatsGrid } from "./dashboard-stats-grid";
import { DashboardMarketDistribution } from "./dashboard-market-distribution";
import { DashboardSavedProperties } from "./dashboard-saved-properties";
import { useTranslation } from "react-i18next";

export function DashboardClient() {
  const user = useAppSelector(selectUser);
  const { data: stats, isLoading: statsLoading } = useGetStatsQuery();
  const { data: favorites, isLoading: favLoading } = useGetFavoritesQuery();
  const { t } = useTranslation();

  usePropertySSE({ enabled: true });

  const firstName = user?.name?.split(" ")[0];

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            {`${t("dashboard.welcome")}${firstName ? `, ${firstName}` : ""}`}👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("dashboard.whatshappening")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={NextLink}
          href="/listings"
          startIcon={<SearchRounded />}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              "& .MuiButton-startIcon": {
                "[dir='rtl'] &": {
                  marginRight: "-2px",
                  marginLeft: "6px",
                },
              },
            },
          }}
        >
          {t("dashboard.browseMarket")}
        </Button>
      </Box>

      <DashboardStatsGrid stats={stats} isLoading={statsLoading} />

      {stats && <DashboardMarketDistribution stats={stats} />}

      <DashboardSavedProperties
        properties={favorites?.data ?? []}
        isLoading={favLoading}
      />
    </>
  );
}
