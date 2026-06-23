import React from "react";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { ListingsClient } from "@/features/listings/components/listings-page";

export const metadata: Metadata = {
  title: "Browse Properties",
  description: "Search and filter thousands of properties for sale and rent.",
};

export default function ListingsPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <ListingsClient />
    </Container>
  );
}
