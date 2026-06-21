import React from "react";
import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import { FavoritesClient } from "@/features/favorites";

export const metadata: Metadata = {
  title: "Saved Properties",
  description: "View and manage your saved properties.",
};

export default function FavoritesPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <FavoritesClient />
    </Container>
  );
}
