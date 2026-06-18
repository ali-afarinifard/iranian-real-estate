"use client";

import React, { memo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { SearchRounded, MapRounded } from "@mui/icons-material";
import NextLink from "next/link";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HeroStats } from "./hero-stats";
import { QUICK_FILTERS } from "../home.constants";

const HERO_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const STATS_ANIMATION = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.7,
    delay: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
};

export const HeroSection = memo(function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Box
      component="section"
      aria-label={t("home.hero.title")}
      sx={{
        position: "relative",
        minHeight: { xs: "88vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <NextImage
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&h=1000&fit=crop"
          alt="Amsterdam canal houses"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "linear-gradient(135deg, rgba(1,17,46,0.95) 0%, rgba(7,55,122,0.7) 60%, rgba(0,0,0,0.4) 100%)"
              : "linear-gradient(135deg, rgba(1,17,46,0.88) 0%, rgba(7,55,122,0.6) 60%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </Box>

      <Container
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 } }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left: headline + CTA */}
          <Grid item xs={12} md={7}>
            <motion.div {...HERO_ANIMATION}>
              <Chip
                label={t("home.hero.realEstatePlatformTitle")}
                sx={{
                  bgcolor: alpha("#fff", 0.15),
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  fontWeight: 600,
                  mb: 3,
                  border: `1px solid ${alpha("#fff", 0.2)}`,
                }}
              />

              <Typography
                component="h1"
                variant="h1"
                sx={{
                  color: "#fff",
                  fontSize: { xs: "2.5rem", md: "3.75rem", lg: "4.5rem" },
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  mb: 3,
                }}
              >
                {t("home.hero.title")}
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, #FCD34D)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("home.hero.highlight")}
                </Box>
              </Typography>

              <Typography
                component="p"
                variant="h6"
                sx={{
                  color: alpha("#fff", 0.8),
                  fontWeight: 400,
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                {t("home.hero.subtitle")}
              </Typography>

              {/* Quick filter chips */}
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{ mb: 4, gap: 1 }}
                role="list"
                aria-label="Quick property filters"
              >
                {QUICK_FILTERS.map((f) => (
                  <Chip
                    key={f.labelKey}
                    label={t(f.labelKey)}
                    icon={f.icon}
                    component={NextLink}
                    href={`/listings?${f.type ? `type=${f.type}` : `listingType=${f.listingType}`}`}
                    clickable
                    role="listitem"
                    sx={{
                      bgcolor: alpha("#fff", 0.12),
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${alpha("#fff", 0.2)}`,
                      fontWeight: 600,
                      "&:hover": { bgcolor: alpha("#fff", 0.22) },
                      "& .MuiChip-icon": {
                        color: "#fff",
                        position: "relative",
                        right: isRTL ? "12px" : undefined,
                      },
                      "& .MuiChip-label": {
                        position: "relative",
                        top: !isRTL ? "1px" : undefined,
                      },
                    }}
                  />
                ))}
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                gap={isRTL ? 2 : undefined}
              >
                <Button
                  component={NextLink}
                  href="/listings"
                  variant="contained"
                  size="large"
                  startIcon={<SearchRounded />}
                  sx={{
                    bgcolor: "secondary.main",
                    "&:hover": { bgcolor: "secondary.dark" },
                    px: 4,
                    py: 1.75,
                    fontSize: "1rem",
                    "& .MuiButton-startIcon": {
                      "[dir='rtl'] &": {
                        marginRight: "-2px",
                        marginLeft: "6px",
                      },
                    },
                  }}
                >
                  {t("home.hero.browseButton")}
                </Button>
                <Button
                  component={NextLink}
                  href="/map"
                  variant="outlined"
                  size="large"
                  startIcon={<MapRounded />}
                  sx={{
                    borderColor: alpha("#fff", 0.5),
                    color: "#fff",
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: alpha("#fff", 0.1),
                    },
                    px: 4,
                    py: 1.75,
                    fontSize: "1rem",
                    "& .MuiButton-startIcon": {
                      "[dir='rtl'] &": {
                        marginRight: "-2px",
                        marginLeft: "6px",
                      },
                    },
                  }}
                >
                  {t("home.hero.mapButton")}
                </Button>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right: stats panel */}
          <Grid item xs={12} md={5}>
            <motion.div {...STATS_ANIMATION}>
              <HeroStats />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});
