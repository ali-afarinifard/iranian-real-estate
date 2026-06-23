"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  selectCurrentFilters,
  selectFilterDrawerOpen,
} from "@/store";
import { filtersActions, selectIsFiltersDirty, uiActions } from "@/store/slices";
import { countActiveFilters } from "@/lib/utils";
import type { IPropertyFilters } from "@/types";

export function useFilterPanel() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const filters = useAppSelector(selectCurrentFilters);
  const isDirty = useAppSelector(selectIsFiltersDirty);
  const open = useAppSelector(selectFilterDrawerOpen);
  const activeCount = countActiveFilters(filters);
  const isRTL = i18n.dir() === "rtl";

  const update = useCallback(
    (patch: Partial<IPropertyFilters>) => {
      dispatch(filtersActions.setFilter(patch));
    },
    [dispatch],
  );

  const openDrawer = useCallback(
    () => dispatch(uiActions.setFilterDrawer(true)),
    [dispatch],
  );

  const closeDrawer = useCallback(
    () => dispatch(uiActions.setFilterDrawer(false)),
    [dispatch],
  );

  const handleApply = useCallback(() => {
    dispatch(filtersActions.applyFilters());
    dispatch(uiActions.setFilterDrawer(false));
  }, [dispatch]);

  const handleReset = useCallback(
    () => dispatch(filtersActions.resetFilters()),
    [dispatch],
  );

  return {
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
  };
}
