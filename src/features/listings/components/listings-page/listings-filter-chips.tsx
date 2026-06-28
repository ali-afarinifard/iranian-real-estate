"use client";

import React from "react";
import { Chip, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector, selectFilters } from "@/store";
import { filtersActions } from "@/store/slices";
import { countActiveFilters } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function ListingsFilterChips() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const {t} = useTranslation();
  const activeFilterCount = countActiveFilters(filters);

  if (activeFilterCount === 0) return null;

  const removeFilter = (patch: Parameters<typeof filtersActions.setFilter>[0]) => {
    dispatch(filtersActions.setFilter(patch));
    dispatch(filtersActions.applyFilters());
  };

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3, gap: 1 }}>
      {filters.listingType && (
        <Chip
          label={`For ${filters.listingType === "sale" ? "Sale" : "Rent"}`}
          size="small"
          onDelete={() => removeFilter({ listingType: undefined })}
        />
      )}

      {filters.type?.map((t) => (
        <Chip
          key={t}
          label={t}
          size="small"
          onDelete={() =>
            removeFilter({ type: filters.type?.filter((x) => x !== t) })
          }
        />
      ))}

      {filters.city && (
        <Chip
          label={filters.city}
          size="small"
          onDelete={() => removeFilter({ city: undefined })}
        />
      )}

      <Chip
        label={t("filters.clearAll")}
        size="small"
        color="error"
        variant="outlined"
        onClick={() => dispatch(filtersActions.resetFilters())}
      />
    </Stack>
  );
}