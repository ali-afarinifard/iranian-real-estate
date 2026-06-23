"use client";

import React from "react";
import { Alert, Box, Button, Container, Divider, Grid } from "@mui/material";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import NextLink from "next/link";
import {
  useGetPropertyBySlugQuery,
  useGetSimilarPropertiesQuery,
} from "@/store/api/propertiesApi";
import { usePropertySSE } from "@/hooks/use-property-see";
import { PropertyDetailSkeleton } from "./property-detail-skeleton";
import { PropertyGallery } from "./property-gallery";
import { PropertyInfo } from "./property-info";
import { PropertyFeatures } from "./property-features";
import { PropertyPriceCard } from "./property-price-card";
import { PropertySimilar } from "./property-similar";
import { PropertyAgentCard } from "./property-agent-card";
import { useTranslation } from "react-i18next";

interface IPropertyClientProps {
  slug: string;
}

export function PropertyClient({ slug }: IPropertyClientProps) {
  const {
    data: property,
    isLoading,
    isError,
  } = useGetPropertyBySlugQuery(slug);
  const { t,i18n } = useTranslation();

  const { data: similar } = useGetSimilarPropertiesQuery(property?.id ?? "", {
    skip: !property?.id,
  });

  const isRTL = i18n.dir() === "rtl";

  usePropertySSE({ enabled: !!property });

  if (isLoading) return <PropertyDetailSkeleton />;

  if (isError || !property) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">
          {t("property.slug.propertyNotFound")}{" "}
          <NextLink href="/listings">Browse all listings</NextLink>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Button
        component={NextLink}
        href="/listings"
        startIcon={isRTL ? <ArrowForwardRounded /> : <ArrowBackRounded />}
        sx={{
          mb: 3,
          color: "text.secondary",
          "& .MuiButton-startIcon": {
            "[dir='rtl'] &": {
              marginRight: "-2px",
              marginLeft: "6px",
            },
          },
        }}
      >
        {t("property.slug.backToListings")}
      </Button>

      <Grid container spacing={4}>
        {/* gallery + info */}
        <Grid item xs={12} lg={8}>
          <PropertyGallery images={property.images} />
          <PropertyInfo property={property} />
          <Divider sx={{ mb: 3 }} />
          <PropertyFeatures features={property.features} />
        </Grid>

        {/* price + agent (sticky) */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: "sticky", top: 88 }}>
            <PropertyPriceCard property={property} />
            <PropertyAgentCard agent={property.agent} />
          </Box>
        </Grid>
      </Grid>

      <PropertySimilar properties={similar?.data ?? []} />
    </Container>
  );
}
