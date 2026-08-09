import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/src/lib/store";
import type { AuthUser } from "./auth-types";

export type AuthStatus =
  | "idle"
  | "checking"
  | "authenticated"
  | "anonymous"
  | "unavailable";

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authCheckStarted(state) {
      state.status = "checking";
    },
    sessionReceived(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    sessionCleared(state) {
      state.user = null;
      state.status = "anonymous";
    },
    authCheckFailed(state) {
      state.user = null;
      state.status = "unavailable";
    },
  },
});

export const {
  authCheckStarted,
  sessionReceived,
  sessionCleared,
  authCheckFailed,
} = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.status === "authenticated" && Boolean(state.auth.user);
export const selectIsAdmin = (state: RootState) =>
  state.auth.status === "authenticated" &&
  Boolean(
    state.auth.user?.role === "super-admin" ||
      state.auth.user?.permissions?.includes("dashboard.view"),
  );

export default authSlice.reducer;
