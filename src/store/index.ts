import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { propertiesApi } from './api/propertiesApi';
import { filtersSlice, favoritesSlice, authSlice, uiSlice } from './slices';

export const store = configureStore({
  reducer: {
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    filters: filtersSlice.reducer,
    favorites: favoritesSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these everywhere instead of plain useDispatch/useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selectors
export const selectFilters = (state: RootState) => state.filters.applied;
export const selectCurrentFilters = (state: RootState) => state.filters.current;
export const selectFiltersDirty = (state: RootState) => state.filters.isDirty;
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectIsFavorited = (id: string) => (state: RootState) => state.favorites.ids.includes(id);
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectViewMode = (state: RootState) => state.ui.viewMode;
export const selectColorMode = (state: RootState) => state.ui.colorMode;
export const selectLanguage = (state: RootState) => state.ui.language;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectFilterDrawerOpen = (state: RootState) => state.ui.filterDrawerOpen;
export const selectSelectedPropertyId = (state: RootState) => state.ui.selectedPropertyId;
