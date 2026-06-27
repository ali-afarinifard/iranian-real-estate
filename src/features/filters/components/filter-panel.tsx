"use client";

import { Box, Drawer, Divider } from "@mui/material";
import { useFilterPanel } from "../hooks/use-filter-panel";
import { FilterTriggerButton } from "./filter-trigger-button";
import { FilterPanelHeader } from "./filter-panel-header";
import { FilterPanelActions } from "./filter-panel-actions";
import { FilterCitySelect } from "./filter-city-select";
import { FilterPriceRange } from "./filter-price-range";
import { FilterAreaRange } from "./filter-area-range";
import { FilterBedroomSelector } from "./filter-bedroom-selector";
import { FilterFeatures } from "./filter-features";
import { FilterSortSelect } from "./filter-sort-select";
import { FilterListingType } from "./filter-listing-type";
import { FilterPropertyType } from "../types/filter-property-type";

export function FilterPanel() {
  const {
    filters,
    isDirty,
    open,
    activeCount,
    isRTL,
    update,
    openDrawer,
    closeDrawer,
    handleApply,
    handleReset,
  } = useFilterPanel();

  const isRent = filters.listingType === "rent";

  return (
    <>
      <FilterTriggerButton activeCount={activeCount} onClick={openDrawer} />

      <Drawer
        anchor="left"
        open={open}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 420 },
            p: 0,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <FilterPanelHeader
          activeCount={activeCount}
          isRTL={isRTL}
          onClose={closeDrawer}
          onReset={handleReset}
        />

        <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2 }}>
          <FilterListingType
            value={filters.listingType}
            onChange={update}
          />
          <Divider sx={{ my: 3 }} />

          <FilterPropertyType value={filters.type} onChange={update} />
          <Divider sx={{ my: 3 }} />

          <FilterCitySelect value={filters.city} onChange={update} />
          <Divider sx={{ my: 3 }} />

          <FilterPriceRange
            priceMin={filters.priceMin}
            priceMax={filters.priceMax}
            isRent={isRent}
            onChange={update}
          />
          <Divider sx={{ my: 3 }} />

          <FilterAreaRange
            areaMin={filters.areaMin}
            areaMax={filters.areaMax}
            onChange={update}
          />
          <Divider sx={{ my: 3 }} />

          <FilterBedroomSelector
            value={filters.bedrooms}
            isRTL={isRTL}
            onChange={update}
          />
          <Divider sx={{ my: 3 }} />

          <FilterFeatures value={filters.features} onChange={update} />
          <Divider sx={{ my: 3 }} />

          <FilterSortSelect value={filters.sortBy} onChange={update} />
        </Box>

        <FilterPanelActions
          activeCount={activeCount}
          isDirty={isDirty}
          onReset={handleReset}
          onApply={handleApply}
        />
      </Drawer>
    </>
  );
}