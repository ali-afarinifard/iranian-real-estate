import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// ─── State

interface IFavoritesState {
  ids: string[];
}

const initialState: IFavoritesState = {
  ids: [],
};

// ─── Slice

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((i) => i !== id);
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
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

// ─── Actions

export const favoritesActions = favoritesSlice.actions;

// ─── Selectors

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;

export const selectFavoriteCount = (state: RootState) =>
  state.favorites.ids.length;

/** Memoization-friendly per-item selector — pass the id once, reuse the result */
export const selectIsFavorited = (id: string) => (state: RootState) =>
  state.favorites.ids.includes(id);