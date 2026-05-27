import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Role = "admin" | "user";

interface AuthState {
  isLoggedIn: boolean;
  role: Role | null;
  user: {
    name: string;
    email: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ role: Role; name: string; email: string; token: string }>
    ) {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.user = { name: action.payload.name, email: action.payload.email };
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;