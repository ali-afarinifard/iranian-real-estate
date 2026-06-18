"use client";

import React, { memo } from "react";
import { Grid } from "@mui/material";
import { useGetFeaturedPropertiesQuery } from "@/store/api/propertiesApi";
import { PropertyCard, PropertyCardSkeleton } from "@/features/listings/components/PropertyCard";

const MAX_FEATURED = 6;


export const FeaturedSectionClient = memo(function FeaturedSectionClient() {
  const { data, isLoading } = useGetFeaturedPropertiesQuery();

  return (
    <Grid container spacing={3}>
      {isLoading
        ? Array.from({ length: MAX_FEATURED }).map((_, i) => (
            <Grid item xs={12} sm={6} lg={4} key={`skeleton-${i}`}>
              <PropertyCardSkeleton />
            </Grid>
          ))
        : data?.data.slice(0, MAX_FEATURED).map((property, i) => (
            <Grid item xs={12} sm={6} lg={4} key={property.id}>
              <PropertyCard property={property} index={i} />
            </Grid>
          ))}
    </Grid>
  );
});