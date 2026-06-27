"use client";

import React, { memo } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HOW_IT_WORKS_STEPS } from "../constants/home.constants";

const STEP_COLORS: Record<string, string> = {
  primary: "#1E40AF",
  secondary: "#F59E0B",
  success: "#22C55E",
};

export const HowItWorks = memo(function HowItWorks() {
  const { t } = useTranslation();

  const ts = (value: unknown): string => String(value);

  return (
    <Box
      component="section"
      aria-labelledby="how-it-works-heading"
      sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <Typography
          id="how-it-works-heading"
          variant="h3"
          fontWeight={800}
          textAlign="center"
          gutterBottom
        >
          {t("home.howItWorks.title")}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 480, mx: "auto" }}
        >
          {t("home.howItWorks.subtitle")}
        </Typography>

        <Grid
          container
          spacing={4}
          component="ol"
          aria-label="Steps to find a property"
          sx={{ listStyle: "none", }}
        >
          {HOW_IT_WORKS_STEPS.map((item) => {
            const color = STEP_COLORS[item.colorKey];
            return (
              <Grid item xs={12} md={4} key={item.step} component="li">
                <Box sx={{ textAlign: "center", px: 2 }}>
                  <Typography
                    aria-hidden="true"
                    sx={{
                      fontSize: "4rem",
                      fontWeight: 900,
                      color: `${color}26`,
                      lineHeight: 1,
                      mb: 1,
                      letterSpacing: "-0.05em",
                      userSelect: "none",
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {ts(t(item.titleKey, item.titleFallback))}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ts(t(item.descKey, item.descFallback))}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
});
