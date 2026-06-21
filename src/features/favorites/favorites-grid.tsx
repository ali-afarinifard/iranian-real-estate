import React from "react";
import { Grid } from "@mui/material";
import { PropertyCard, PropertyCardSkeleton } from "@/features/listings/components/PropertyCard";
import { FavoritesEmpty } from "./favorites-empty";
import type { PropertySummary } from "@/types";

interface FavoritesGridProps {
  properties: PropertySummary[];
  isLoading: boolean;
}

export function FavoritesGrid({ properties, isLoading }: FavoritesGridProps) {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid item xs={12} sm={6} lg={4} key={i}>
            <PropertyCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!properties.length) {
    return <FavoritesEmpty />;
  }

  return (
    <Grid container spacing={3}>
      {properties.map((property, i) => (
        <Grid item xs={12} sm={6} lg={4} key={property.id}>
          <PropertyCard property={property} index={i} />
        </Grid>
      ))}
    </Grid>
  );
}