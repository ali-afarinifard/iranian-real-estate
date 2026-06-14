"use client";

import React, { useCallback } from "react";
import {
  Box,
  Typography,
  Drawer,
  Button,
  Slider,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Stack,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CloseRounded,
  FilterListRounded,
  RestartAltRounded,
} from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
  selectCurrentFilters,
  selectFiltersDirty,
  selectFilterDrawerOpen,
} from "@/store";
import { filtersActions, uiActions } from "@/store/slices";
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  SORT_OPTIONS,
  PROPERTY_FEATURES,
  CITIES,
} from "@/lib/constants";
import { countActiveFilters } from "@/lib/utils";
import { PropertyFilters } from "@/types";

const BEDROOMS = [1, 2, 3, 4, 5];
const PRICE_MAX_SALE = 5_000_000;
const PRICE_MAX_RENT = 10_000;
const AREA_MAX = 500;

export function FilterPanel() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectCurrentFilters);
  const isDirty = useAppSelector(selectFiltersDirty);
  const open = useAppSelector(selectFilterDrawerOpen);
  const activeCount = countActiveFilters(filters);

  const update = useCallback(
    (patch: Partial<PropertyFilters>) => {
      dispatch(filtersActions.setFilter(patch));
    },
    [dispatch],
  );

  const handleApply = () => {
    dispatch(filtersActions.applyFilters());
    dispatch(uiActions.setFilterDrawer(false));
  };

  const handleReset = () => dispatch(filtersActions.resetFilters());

  const isRent = filters.listingType === "rent";
  const priceMax = isRent ? PRICE_MAX_RENT : PRICE_MAX_SALE;

  return (
    <>
      {/* Trigger button */}
      <Tooltip title="Filters">
        <Badge badgeContent={activeCount} color="secondary">
          <Button
            variant="outlined"
            startIcon={<FilterListRounded />}
            onClick={() => dispatch(uiActions.setFilterDrawer(true))}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Filters
          </Button>
        </Badge>
      </Tooltip>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => dispatch(uiActions.setFilterDrawer(false))}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 380 },
            p: 0,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FilterListRounded color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Filters
            </Typography>
            {activeCount > 0 && (
              <Chip
                label={`${activeCount} active`}
                size="small"
                color="primary"
              />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {activeCount > 0 && (
              <Tooltip title="Reset all">
                <IconButton size="small" onClick={handleReset} color="error">
                  <RestartAltRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <IconButton
              size="small"
              onClick={() => dispatch(uiActions.setFilterDrawer(false))}
            >
              <CloseRounded />
            </IconButton>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2 }}>
          {/* Listing Type */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 1.5 }}
            >
              Listing Type
            </Typography>
            <Stack direction="row" spacing={1}>
              {[{ value: undefined, label: "All" }, ...LISTING_TYPES].map(
                (lt) => (
                  <Chip
                    key={lt.label}
                    label={lt.label}
                    onClick={() =>
                      update({
                        listingType: lt.value as PropertyFilters["listingType"],
                      })
                    }
                    variant={
                      filters.listingType === lt.value ? "filled" : "outlined"
                    }
                    color={
                      filters.listingType === lt.value ? "primary" : "default"
                    }
                    sx={{ fontWeight: 600, flex: 1 }}
                  />
                ),
              )}
            </Stack>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Property Type */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 1.5 }}
            >
              Property Type
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {PROPERTY_TYPES.map((pt) => {
                const active = filters.type?.includes(pt.value);
                return (
                  <Chip
                    key={pt.value}
                    label={pt.label}
                    onClick={() => {
                      const current = filters.type ?? [];
                      update({
                        type: active
                          ? current.filter((t) => t !== pt.value)
                          : [...current, pt.value],
                      });
                    }}
                    variant={active ? "filled" : "outlined"}
                    color={active ? "primary" : "default"}
                    sx={{ fontWeight: 600 }}
                  />
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* City */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 1.5 }}
            >
              City
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filters.city ?? ""}
                displayEmpty
                onChange={(e) => update({ city: e.target.value || undefined })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>All Cities</em>
                </MenuItem>
                {CITIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Price Range */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 0.5 }}
            >
              Price Range
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              €{(filters.priceMin ?? 0).toLocaleString()} — €
              {(filters.priceMax ?? priceMax).toLocaleString()}
              {isRent && "/mo"}
            </Typography>
            <Slider
              value={[filters.priceMin ?? 0, filters.priceMax ?? priceMax]}
              min={0}
              max={priceMax}
              step={isRent ? 200 : 10000}
              onChange={(_, val) => {
                const [min, max] = val as number[];
                update({
                  priceMin: min || undefined,
                  priceMax: max === priceMax ? undefined : max,
                });
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `€${(v / 1000).toFixed(0)}k`}
              disableSwap
              sx={{ color: "primary.main" }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Area Range */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 0.5 }}
            >
              Area (m²)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              {filters.areaMin ?? 0} m² — {filters.areaMax ?? AREA_MAX}+ m²
            </Typography>
            <Slider
              value={[filters.areaMin ?? 0, filters.areaMax ?? AREA_MAX]}
              min={0}
              max={AREA_MAX}
              step={10}
              onChange={(_, val) => {
                const [min, max] = val as number[];
                update({
                  areaMin: min || undefined,
                  areaMax: max === AREA_MAX ? undefined : max,
                });
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}m²`}
              disableSwap
              sx={{ color: "secondary.main" }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Bedrooms */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 1.5 }}
            >
              Bedrooms
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { label: "Any", value: undefined },
                ...BEDROOMS.map((b) => ({
                  label: b === 5 ? "5+" : String(b),
                  value: b,
                })),
              ].map((opt) => {
                const isActive =
                  opt.value === undefined
                    ? !filters.bedrooms?.length
                    : filters.bedrooms?.includes(opt.value);
                return (
                  <Chip
                    key={opt.label}
                    label={opt.label}
                    size="small"
                    onClick={() => {
                      if (opt.value === undefined) {
                        update({ bedrooms: undefined });
                      } else {
                        const current = filters.bedrooms ?? [];
                        update({
                          bedrooms: current.includes(opt.value)
                            ? current.filter((b) => b !== opt.value)
                            : [...current, opt.value],
                        });
                      }
                    }}
                    variant={isActive ? "filled" : "outlined"}
                    color={isActive ? "primary" : "default"}
                    sx={{ fontWeight: 600, minWidth: 40 }}
                  />
                );
              })}
            </Stack>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Features */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 1.5 }}
            >
              Features & Amenities
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {PROPERTY_FEATURES.slice(0, 12).map((feat) => {
                const active = filters.features?.includes(feat);
                return (
                  <Chip
                    key={feat}
                    label={feat}
                    size="small"
                    onClick={() => {
                      const current = filters.features ?? [];
                      update({
                        features: active
                          ? current.filter((f) => f !== feat)
                          : [...current, feat],
                      });
                    }}
                    variant={active ? "filled" : "outlined"}
                    color={active ? "secondary" : "default"}
                    sx={{ fontWeight: 500, fontSize: "0.75rem" }}
                  />
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Sort */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={700}
              display="block"
              sx={{ mb: 1.5 }}
            >
              Sort By
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filters.sortBy ?? "newest"}
                onChange={(e) =>
                  update({
                    sortBy: e.target.value as PropertyFilters["sortBy"],
                  })
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
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            display: "flex",
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={handleReset}
            disabled={activeCount === 0}
            startIcon={<RestartAltRounded />}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleApply}
            disabled={!isDirty}
          >
            Show Results
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
