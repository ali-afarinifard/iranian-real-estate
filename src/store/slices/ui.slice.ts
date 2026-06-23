import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ViewMode, ColorMode, Language, INotification } from '@/types';

// ─── State

interface UIState {
  viewMode: ViewMode;
  colorMode: ColorMode;
  language: Language;
  sidebarOpen: boolean;
  filterDrawerOpen: boolean;
  notifications: INotification[];
  mapSidebarOpen: boolean;
  selectedPropertyId: string | null;
}

const initialState: UIState = {
  viewMode: 'grid',
  colorMode: 'light',
  language: 'en',
  sidebarOpen: false,
  filterDrawerOpen: false,
  notifications: [],
  mapSidebarOpen: false,
  selectedPropertyId: null,
};

// ─── Slice

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === 'light' ? 'dark' : 'light';
    },
    setColorMode: (state, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setFilterDrawer: (state, action: PayloadAction<boolean>) => {
      state.filterDrawerOpen = action.payload;
    },
    setMapSidebar: (state, action: PayloadAction<boolean>) => {
      state.mapSidebarOpen = action.payload;
    },
    setSelectedProperty: (state, action: PayloadAction<string | null>) => {
      state.selectedPropertyId = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<INotification, 'id' | 'createdAt'>>,
    ) => {
      state.notifications.push({
        ...action.payload,
        id: `notif-${Date.now()}`,
        createdAt: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
  },
});

// ─── Actions

export const uiActions = uiSlice.actions;

// ─── Selectors

export const selectViewMode = (state: RootState) => state.ui.viewMode;

export const selectColorMode = (state: RootState) => state.ui.colorMode;

export const selectLanguage = (state: RootState) => state.ui.language;

export const selectFilterDrawerOpen = (state: RootState) =>
  state.ui.filterDrawerOpen;

export const selectMapSidebarOpen = (state: RootState) =>
  state.ui.mapSidebarOpen;

export const selectSelectedPropertyId = (state: RootState) =>
  state.ui.selectedPropertyId;

export const selectNotifications = (state: RootState) =>
  state.ui.notifications;