import React from "react";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { DashboardClient } from "@/features/dashboard/components";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your real estate dashboard — market stats and saved properties.",
};

export default function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <DashboardClient />
    </Container>
  );
}
