import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    return new Promise<{ token: string; user: { name: string } }>(
      (resolve, reject) => {
        setTimeout(() => {
          if (email === "barbero@corte.com" && password === "123456") {
            resolve({ token: "fake-token", user: { name: "Barbero Pro" } });
          } else {
            reject(new Error("Credenciales incorrectas"));
          }
        }, 1000);
      }
    );
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null as string | null,
    token: null as string | null,
    user: null as { name: string } | null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
