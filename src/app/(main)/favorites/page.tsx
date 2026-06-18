"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import { FavoriteRounded, SearchRounded } from "@mui/icons-material";
import NextLink from "next/link";
import { useGetFavoritesQuery } from "@/store/api/propertiesApi";
import { PropertyCard, PropertyCardSkeleton } from "@/features/listings/components/PropertyCard";

export default function FavoritesPage() {
  const { data, isLoading, isError } = useGetFavoritesQuery();

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Saved Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isLoading
            ? "Loading..."
            : `${data?.data.length ?? 0} saved properties`}
        </Typography>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load favorites.
        </Alert>
      )}

      <Grid container spacing={3}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <PropertyCardSkeleton />
            </Grid>
          ))
        ) : data?.data.length ? (
          data.data.map((p, i) => (
            <Grid item xs={12} sm={6} lg={4} key={p.id}>
              <PropertyCard property={p} index={i} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 8,
                borderRadius: 3,
                textAlign: "center",
                border: "2px dashed",
                borderColor: "divider",
              }}
            >
              <FavoriteRounded
                sx={{ fontSize: 56, color: "text.disabled", mb: 2 }}
              />
              <Typography variant="h5" fontWeight={700} gutterBottom>
                No saved properties
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Browse listings and tap the heart icon to save properties here.
              </Typography>
              <Button
                component={NextLink}
                href="/listings"
                variant="contained"
                startIcon={<SearchRounded />}
                size="large"
              >
                Browse Properties
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
