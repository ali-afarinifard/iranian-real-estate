"use client";

import React, { memo } from "react";
import { Box, Paper, Typography, Grid, useTheme, alpha } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HERO_STATS } from "../home.constants";
import { toPersianNumber } from "@/lib/utils";

export const HeroStats = memo(function HeroStats() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: alpha(isDark ? "#1E293B" : "#fff", isDark ? 0.85 : 0.9),
        backdropFilter: "blur(16px)",
        border: `1px solid ${alpha("#fff", 0.15)}`,
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {t("home.stats.marketOverview")}
      </Typography>

      <Grid
        container
        spacing={2}
        component="ul"
        aria-label="Market statistics"
        sx={{ listStyle: "none", p: 0, m: 0, mt: 0.5 }}
      >
        {HERO_STATS.map((stat) => {
          const label = t(stat.labelKey, stat.fallback);
          return (
            <Grid item xs={4} key={stat.labelKey} component="li">
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ color: "primary.main", mb: 0.5 }} aria-hidden="true">
                  {stat.icon}
                </Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="primary.main"
                  aria-label={`${stat.value} ${label}`}
                >
                  {isRTL ? toPersianNumber(stat.value) : stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.primary"
                  sx={{ lineHeight: 1.3, fontSize: "13px", fontWeight: 500 }}
                >
                  {label}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: 2.5,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          fontWeight={500}
          gutterBottom
        >
          {t("home.stats.avgPriceLabel")}
        </Typography>
        <Typography variant="h4" fontWeight={800} color="primary.main">
          {isRTL ? toPersianNumber("127,045,00 میلیارد") : "127,045,00 billion"}
        </Typography>
        <Typography variant="caption" color="success.main" fontWeight={600}>
          {t("home.stats.fromLastQuarter")}
        </Typography>
      </Box>
    </Paper>
  );
});
