import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyFilters, ViewMode, ColorMode, Language, Notification } from '@/types';

// Filters Slice

interface FiltersState {
  current: PropertyFilters;
  applied: PropertyFilters;
  isDirty: boolean;
}

const initialFilters: PropertyFilters = {
  sortBy: 'newest',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    current: initialFilters,
    applied: initialFilters,
    isDirty: false,
  } as FiltersState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<PropertyFilters>>) => {
      state.current = { ...state.current, ...action.payload };
      state.isDirty = JSON.stringify(state.current) !== JSON.stringify(state.applied);
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
    setFiltersFromURL: (state, action: PayloadAction<PropertyFilters>) => {
      state.current = { ...initialFilters, ...action.payload };
      state.applied = { ...initialFilters, ...action.payload };
      state.isDirty = false;
    },
  },
});

// Favorites Slice

interface FavoritesState {
  ids: string[];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: [] } as FavoritesState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(i => i !== id);
      } else {
        state.ids.push(id);
      }
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
  },
});

// Auth Slice

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// UI Slice

interface UIState {
  viewMode: ViewMode;
  colorMode: ColorMode;
  language: Language;
  sidebarOpen: boolean;
  filterDrawerOpen: boolean;
  notifications: Notification[];
  mapSidebarOpen: boolean;
  selectedPropertyId: string | null;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    viewMode: 'grid',
    colorMode: 'light',
    language: 'en',
    sidebarOpen: false,
    filterDrawerOpen: false,
    notifications: [],
    mapSidebarOpen: false,
    selectedPropertyId: null,
  } as UIState,
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
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      state.notifications.push({
        ...action.payload,
        id: `notif-${Date.now()}`,
        createdAt: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const favoritesActions = favoritesSlice.actions;
export const authActions = authSlice.actions;
export const uiActions = uiSlice.actions;

export { filtersSlice, favoritesSlice, authSlice, uiSlice };
