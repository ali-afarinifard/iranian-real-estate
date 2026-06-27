"use client";
import React, { Suspense } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { ArrowForwardRounded } from "@mui/icons-material";
import NextLink from "next/link";
import { FeaturedSectionClient } from "./featured-section.client";
import { useTranslation } from "react-i18next";
import { PropertyCardSkeleton } from "@/features/listings/components/property-card";

function FeaturedSkeleton() {
  return (
    <Grid
      container
      spacing={3}
      aria-busy="true"
      aria-label="Loading featured properties"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid item xs={12} sm={6} lg={4} key={i}>
          <PropertyCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export function FeaturedSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <Box
      component="section"
      aria-labelledby="featured-heading"
      sx={{ py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              color="primary.main"
              fontWeight={700}
              component="p"
              fontSize={"13px"}
            >
              {t("home.featured.handPicked")}
            </Typography>
            <Typography
              id="featured-heading"
              variant="h3"
              fontWeight={800}
              sx={{ mt: 0.5 }}
            >
              {t("home.featured.featuredProperties")}
            </Typography>
          </Box>

          <Button
            component={NextLink}
            href="/listings"
            startIcon={isRTL ? <ArrowForwardRounded /> : undefined}
            endIcon={!isRTL ? <ArrowForwardRounded /> : undefined}
            sx={{
              display: { xs: "none", sm: "flex" },
              "& .MuiButton-startIcon": {
                "[dir='rtl'] &": {
                  marginRight: "-2px",
                  marginLeft: "6px",
                },
              },
            }}
          >
            {t("common.viewAll")}
          </Button>
        </Box>

        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedSectionClient />
        </Suspense>

        <Box sx={{ textAlign: "center", mt: 4, display: { sm: "none" } }}>
          <Button
            component={NextLink}
            href="/listings"
            startIcon={isRTL ? <ArrowForwardRounded /> : undefined}
            endIcon={isRTL ? undefined : <ArrowForwardRounded />}
            variant="outlined"
            sx={{
              "& .MuiButton-startIcon": {
                "[dir='rtl'] &": {
                  marginRight: "-2px",
                  marginLeft: "6px",
                },
              },
            }}
          >
            {t("listings.viewAllProperties")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
