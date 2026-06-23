import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { IPropertyFilters } from '@/types';

// ─── State

interface FiltersState {
  current: IPropertyFilters;
  applied: IPropertyFilters;
  isDirty: boolean;
}

const initialFilters: IPropertyFilters = {
  sortBy: 'newest',
};

const initialState: FiltersState = {
  current: initialFilters,
  applied: initialFilters,
  isDirty: false,
};

// ─── Slice

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<IPropertyFilters>>) => {
      state.current = { ...state.current, ...action.payload };
      state.isDirty =
        JSON.stringify(state.current) !== JSON.stringify(state.applied);
    },
    applyFilters: (state) => {
      state.applied = { ...state.current };
      state.isDirty = false;
    },
    resetFilters: (state) => {
      state.current = initialFilters;
      state.applied = initialFilters;
      state.isDirty = false;
    },
    setFiltersFromURL: (state, action: PayloadAction<IPropertyFilters>) => {
      state.current = { ...initialFilters, ...action.payload };
      state.applied = { ...initialFilters, ...action.payload };
      state.isDirty = false;
    },
  },
});

// ─── Actions

export const filtersActions = filtersSlice.actions;

// ─── Selectors

export const selectCurrentFilters = (state: RootState) =>
  state.filters.current;

export const selectAppliedFilters = (state: RootState) =>
  state.filters.applied;

export const selectIsFiltersDirty = (state: RootState) =>
  state.filters.isDirty;