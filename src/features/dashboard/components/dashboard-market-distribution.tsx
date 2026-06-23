"use client";
import React from "react";
import { Box, LinearProgress, Paper, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IDashboardStats } from "../dashboard-stat.types";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

interface DashboardMarketDistributionProps {
  stats: IDashboardStats;
}

interface DistributionRowProps {
  label: string;
  count: number;
  total: number;
  color?: "primary" | "secondary";
  trackColor: string;
  isRTL?: boolean;
}

function DistributionRow({
  label,
  count,
  total,
  color = "primary",
  trackColor,
  isRTL,
}: DistributionRowProps) {
  const pct = Math.round((count / total) * 100);
  const displayPct = isRTL ? toPersianNumber(pct) : pct;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          {displayPct}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(count / total) * 100}
        color={color}
        sx={{ height: 8, borderRadius: 4, bgcolor: alpha(trackColor, 0.12) }}
      />
    </Box>
  );
}

export function DashboardMarketDistribution({
  stats,
}: DashboardMarketDistributionProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {t("dashboard.marketDistribution")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DistributionRow
          label={t("dashboard.forSale")}
          count={stats.forSale}
          total={stats.totalListings}
          color="primary"
          trackColor={theme.palette.primary.main}
          isRTL={isRTL}
        />
        <DistributionRow
          label={t("dashboard.forRent")}
          count={stats.forRent}
          total={stats.totalListings}
          color="secondary"
          trackColor={theme.palette.secondary.main}
          isRTL={isRTL}
        />
      </Box>
    </Paper>
  );
}
