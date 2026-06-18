"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Tooltip,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  TextField,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  GridViewRounded,
  ViewListRounded,
  SearchRounded,
  SortRounded,
} from "@mui/icons-material";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useAppDispatch,
  useAppSelector,
  selectFilters,
  selectViewMode,
} from "@/store";
import { uiActions, filtersActions } from "@/store/slices";
import { useGetPropertiesQuery } from "@/store/api/propertiesApi";
import { FilterPanel } from "@/features/filters/components/FilterPanel";
import { SORT_OPTIONS, PER_PAGE } from "@/lib/constants";
import { countActiveFilters } from "@/lib/utils";
import { PropertyCard, PropertyCardSkeleton } from "@/features/listings/components/PropertyCard";

export default function ListingsPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const viewMode = useAppSelector(selectViewMode);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(filters.query ?? "");
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeFilterCount = countActiveFilters(filters);

  const { data, isLoading, isFetching, isError } = useGetPropertiesQuery({
    filters,
    page,
    perPage: PER_PAGE,
  });

  const properties = data?.data ?? [];
  const hasMore = data ? page < data.meta.totalPages : false;
  const total = data?.meta.total ?? 0;

  // Infinite scroll via IntersectionObserver
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isFetching],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Search debounce
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(filtersActions.setFilter({ query: searchInput || undefined }));
      dispatch(filtersActions.applyFilters());
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput, dispatch]);

  const rowVirtualizer = useVirtualizer({
    count: properties.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 188,
    overscan: 5,
  });

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Browse Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isLoading
            ? "Loading..."
            : `${total.toLocaleString()} properties found`}
          {activeFilterCount > 0 &&
            ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active`}
        </Typography>
      </Box>

      {/*Toolbar */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
        }}
      >
        {/* Search */}
        <TextField
          placeholder="Search by title or district..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          sx={{ flex: 1, maxWidth: { md: 380 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 20, color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            ml: { sm: "auto" },
          }}
        >
          {/* Filter */}
          <FilterPanel />

          {/* Sort */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={filters.sortBy ?? "newest"}
              onChange={(e) => {
                dispatch(
                  filtersActions.setFilter({
                    sortBy: e.target.value as typeof filters.sortBy,
                  }),
                );
                dispatch(filtersActions.applyFilters());
              }}
              startAdornment={
                <SortRounded
                  sx={{ mr: 0.5, fontSize: 18, color: "text.secondary" }}
                />
              }
              sx={{ borderRadius: 2 }}
            >
              {SORT_OPTIONS.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* View toggle */}
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && dispatch(uiActions.setViewMode(val))}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                px: 1.5,
                borderRadius: "8px !important",
                border: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <Tooltip title="Grid view">
              <ToggleButton value="grid">
                <GridViewRounded fontSize="small" />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="List view">
              <ToggleButton value="list">
                <ViewListRounded fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          sx={{ mb: 3, gap: 1 }}
        >
          {filters.listingType && (
            <Chip
              label={`For ${filters.listingType === "sale" ? "Sale" : "Rent"}`}
              size="small"
              onDelete={() => {
                dispatch(filtersActions.setFilter({ listingType: undefined }));
                dispatch(filtersActions.applyFilters());
              }}
            />
          )}
          {filters.type?.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              onDelete={() => {
                dispatch(
                  filtersActions.setFilter({
                    type: filters.type?.filter((x) => x !== t),
                  }),
                );
                dispatch(filtersActions.applyFilters());
              }}
            />
          ))}
          {filters.city && (
            <Chip
              label={filters.city}
              size="small"
              onDelete={() => {
                dispatch(filtersActions.setFilter({ city: undefined }));
                dispatch(filtersActions.applyFilters());
              }}
            />
          )}
          {(filters.priceMin || filters.priceMax) && (
            <Chip
              label={`€${(filters.priceMin ?? 0).toLocaleString()} – €${(filters.priceMax ?? 0).toLocaleString()}`}
              size="small"
              onDelete={() => {
                dispatch(
                  filtersActions.setFilter({
                    priceMin: undefined,
                    priceMax: undefined,
                  }),
                );
                dispatch(filtersActions.applyFilters());
              }}
            />
          )}
          <Chip
            label="Clear all"
            size="small"
            color="error"
            variant="outlined"
            onClick={() => dispatch(filtersActions.resetFilters())}
          />
        </Stack>
      )}

      {/* Error */}
      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load properties. Please try again.
        </Alert>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <>
          <Grid container spacing={3}>
            {isLoading
              ? Array.from({ length: PER_PAGE }).map((_, i) => (
                  <Grid item xs={12} sm={6} lg={4} key={i}>
                    <PropertyCardSkeleton />
                  </Grid>
                ))
              : properties.map((property, i) => (
                  <Grid item xs={12} sm={6} lg={4} key={property.id}>
                    <PropertyCard property={property} index={i % PER_PAGE} />
                  </Grid>
                ))}
          </Grid>

          {/* Load more sentinel */}
          <Box
            ref={loadMoreRef}
            sx={{ py: 4, display: "flex", justifyContent: "center" }}
          >
            {isFetching && !isLoading && <CircularProgress size={28} />}
            {!hasMore && properties.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                All {total} properties loaded.
              </Typography>
            )}
          </Box>
        </>
      )}

      {/* List View with TanStack Virtual */}
      {viewMode === "list" && (
        <Box ref={listRef} sx={{ height: "75vh", overflowY: "auto", pr: 1 }}>
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

          {/* Infinite scroll */}
          <Box
            ref={loadMoreRef}
            sx={{ py: 2, display: "flex", justifyContent: "center" }}
          >
            {isFetching && !isLoading && <CircularProgress size={24} />}
          </Box>
        </Box>
      )}
    </Container>
  );
}
