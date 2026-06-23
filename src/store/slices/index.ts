// ─── Slices
export { filtersSlice, filtersActions } from "./filters.slice";
export { favoritesSlice, favoritesActions } from "./favorites.slice";
export { authSlice, authActions } from "./auth.slice";
export { uiSlice, uiActions } from "./ui.slice";

// ─── Selectors
export {
  selectCurrentFilters,
  selectAppliedFilters,
  selectIsFiltersDirty,
} from "./filters.slice";

export {
  selectFavoriteIds,
  selectFavoriteCount,
  selectIsFavorited,
} from "./favorites.slice";

export {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
} from "./auth.slice";

export {
  selectViewMode,
  selectColorMode,
  selectLanguage,
  selectFilterDrawerOpen,
  selectMapSidebarOpen,
  selectSelectedPropertyId,
  selectNotifications,
} from "./ui.slice";
