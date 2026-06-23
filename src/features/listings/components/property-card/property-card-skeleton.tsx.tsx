"use client";

import React, { memo } from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";

interface IPropertyCardSkeletonProps {
  viewMode?: "grid" | "list";
}

export const PropertyCardSkeleton = memo(function PropertyCardSkeleton({
  viewMode = "grid",
}: IPropertyCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <Card sx={{ display: "flex", height: 180, overflow: "hidden" }}>
        <Skeleton
          variant="rectangular"
          width={240}
          height="100%"
          sx={{ flexShrink: 0 }}
        />
        <CardContent sx={{ flex: 1, p: 2.5 }}>
          <Skeleton variant="text" width="30%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={100} sx={{ ml: "auto" }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={220} />
      <CardContent sx={{ p: 2 }}>
        <Skeleton variant="text" width="35%" height={14} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="80%" height={22} />
        <Skeleton variant="text" width="55%" height={22} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1.5 }} />
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Skeleton variant="text" width={32} />
          <Skeleton variant="text" width={32} />
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={50} sx={{ ml: "auto" }} />
        </Box>
      </CardContent>
    </Card>
  );
});
