import React from "react";
import { Box, Container, Grid, Skeleton } from "@mui/material";

export function PropertyDetailSkeleton() {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 3, mb: 1.5 }} />
          <Box sx={{ display: "flex", gap: 1 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" width={80} height={60} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="70%" height={40} />
            <Skeleton variant="text" width="50%" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
        </Grid>
      </Grid>
    </Container>
  );
}