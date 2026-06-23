"use client";
import React, { useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  PropertyCard,
  PropertyCardSkeleton,
} from "@/features/listings/components/property-card";
import type { IPropertySummary } from "@/types";
import { useLoadMore } from "@/hooks/use-load-more";

interface IListingsListProps {
  properties: IPropertySummary[];
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function ListingsList({
  properties,
  isLoading,
  isFetching,
  hasMore,
  onLoadMore,
}: IListingsListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sentinelRef = useLoadMore({
    onLoadMore,
    enabled: hasMore && !isFetching,
    root: scrollRef,
  });

  const rowVirtualizer = useVirtualizer({
    count: properties.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 188,
    overscan: 5,
  });

  return (
    <Box ref={scrollRef} sx={{ height: "75vh", overflowY: "auto", pr: 1 }}>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <PropertyCardSkeleton viewMode="list" />
          </Box>
        ))
      ) : (
        <Box
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <Box
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                paddingBottom: "16px",
              }}
            >
              <PropertyCard
                property={properties[virtualRow.index]}
                viewMode="list"
                index={virtualRow.index}
              />
            </Box>
          ))}
        </Box>
      )}

      <Box
        ref={sentinelRef}
        sx={{ py: 2, display: "flex", justifyContent: "center" }}
      >
        {isFetching && !isLoading && <CircularProgress size={28} />}
      </Box>
    </Box>
  );
}
