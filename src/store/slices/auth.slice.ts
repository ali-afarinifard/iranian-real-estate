import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// ─── State

interface IAuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface IAuthState {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// ─── Slice

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthUser | null>) => {
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

// ─── Actions

export const authActions = authSlice.actions;

// ─── Selectors

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;