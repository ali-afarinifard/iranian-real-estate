"use client";

import React from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import {
  GridViewRounded,
  SearchRounded,
  SortRounded,
  ViewListRounded,
} from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
  selectFilters,
  selectViewMode,
} from "@/store";
import { filtersActions, uiActions } from "@/store/slices";
import { FilterPanel } from "@/features/filters/components/FilterPanel";
import { SORT_OPTIONS } from "@/lib/constants";
import { useSearchDebounce } from "../../hooks/use-search-debounce";
import type { ViewMode } from "@/types";
import { useTranslation } from "react-i18next";

export function ListingsToolbar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const viewMode = useAppSelector(selectViewMode);
  const { t, i18n } = useTranslation();
  const { searchInput, setSearchInput } = useSearchDebounce(filters.query);

  const isRTL = i18n.dir() === "rtl";

  const handleSortChange = (value: typeof filters.sortBy) => {
    dispatch(filtersActions.setFilter({ sortBy: value }));
    dispatch(filtersActions.applyFilters());
  };

  const handleViewModeChange = (_: React.MouseEvent, val: ViewMode | null) => {
    if (val) dispatch(uiActions.setViewMode(val));
  };

  const buttons = [
    <Tooltip key="grid" title="Grid view">
      <ToggleButton value="grid">
        <GridViewRounded fontSize="small" />
      </ToggleButton>
    </Tooltip>,
    <Tooltip key="list" title="List view">
      <ToggleButton value="list">
        <ViewListRounded fontSize="small" />
      </ToggleButton>
    </Tooltip>,
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "center" },
      }}
    >
      <TextField
        placeholder={t("common.propertiesSearch")}
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
        <FilterPanel />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select
            value={filters.sortBy ?? "newest"}
            onChange={(e) =>
              handleSortChange(e.target.value as typeof filters.sortBy)
            }
            startAdornment={
              <SortRounded
                sx={{ mr: 0.5, fontSize: 18, color: "text.secondary" }}
              />
            }
            sx={{
              borderRadius: 2,
              "& .MuiSvgIcon-fontSizeMedium": {
                "[dir='rtl'] &": {
                  position: "relative",
                  right: "8px",
                },
              },
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              px: 1.5,
              borderColor: "divider",
            },
            "& .MuiToggleButton-root:first-of-type": {
              borderRadius: isRTL ? "0 8px 8px 0" : "8px 0 0 8px",
            },
            "& .MuiToggleButton-root:last-of-type": {
              borderRadius: isRTL ? "8px 0 0 8px" : "0 8px 8px 0",
            },
          }}
        >
          {isRTL ? [...buttons].reverse() : buttons}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
