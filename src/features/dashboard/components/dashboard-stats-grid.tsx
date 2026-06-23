"use client";
import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import {
  HomeRounded,
  TrendingUpRounded,
  SearchRounded,
  AddHomeRounded,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { DashboardStatCard } from "./dashboard-stat-card";
import { formatPrice, toPersianNumber } from "@/lib/utils";
import { IDashboardStats } from "../dashboard-stat.types";
import { useTranslation } from "react-i18next";

interface IDashboardStatsGridProps {
  stats: IDashboardStats | undefined;
  isLoading: boolean;
}

export function DashboardStatsGrid({
  stats,
  isLoading,
}: IDashboardStatsGridProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  const statCards = stats
    ? [
        {
          icon: <HomeRounded />,
          label: t("dashboard.totalListings"),
          value: isRTL ? toPersianNumber(stats.totalListings) : stats.totalListings,
          color: theme.palette.primary.main,
        },
        {
          icon: <TrendingUpRounded />,
          label: t("dashboard.forSale"),
          value: isRTL ? toPersianNumber(stats.forSale) : stats.forSale,
          sub: `${t("common.avg")} ${formatPrice(stats.avgPriceSale)}`,
          color: "#22C55E",
        },
        {
          icon: <SearchRounded />,
          label: t("dashboard.forRent"),
          value: isRTL ? toPersianNumber(stats.forRent) : stats.forRent,
          color: theme.palette.secondary.main,
        },
        {
          icon: <AddHomeRounded />,
          label: t("dashboard.newThisMonth"),
          value: isRTL ? toPersianNumber(stats.newThisMonth) : stats.newThisMonth,
          color: "#F59E0B",
        },
      ]
    : [];

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {statCards.map((card, i) => (
        <Grid item xs={12} sm={6} lg={3} key={card.label}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <DashboardStatCard {...card} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
