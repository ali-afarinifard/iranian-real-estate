"use client";
import React from "react";
import { Box, Divider, Paper, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { toPersianNumber } from "@/lib/utils";

interface MapLegendProps {
  count: number;
}

interface LegendDotProps {
  color: string;
  label: string;
}

function LegendDot({ color, label }: LegendDotProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box
        sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color }}
      />
      <Typography variant="caption" fontWeight={600}>
        {label}
      </Typography>
    </Box>
  );
}

export function MapLegend({ count }: MapLegendProps) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        bottom: 24,
        left: 16,
        zIndex: 1000,
        px: 2,
        py: 1.25,
        borderRadius: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backdropFilter: "blur(8px)",
        bgcolor: alpha(theme.palette.background.paper, 0.9),
      }}
    >
      <LegendDot color="#1463C7" label={t("dashboard.forSale")} />
      <LegendDot color="#F97316" label={t("dashboard.forRent")} />
      {count > 0 && (
        <>
          <Divider orientation="vertical" flexItem />
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {isRTL ? toPersianNumber(count) : count} {t("common.listings")}
          </Typography>
        </>
      )}
    </Paper>
  );
}
