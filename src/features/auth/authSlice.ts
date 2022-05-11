import { getUsers } from "./api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserState } from "./interfaces";
import { login } from "./api";
import * as dataTypes from "./interfaces";
declare var abp: any;
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (input: dataTypes.LoginDetails) => {
    const response = await login(input);
    let tokenExpireDate = new Date(new Date().getTime() + 1000 * 1800000);
    abp.auth.setToken(response.access_Token, tokenExpireDate);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const getUsersAsync = createAsyncThunk("auth/getUsers", async () => {
  const response = await getUsers();
  return response;
});
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  localStorage.clear();

  abp.auth.clearToken();
});

const initialState: UserState = {
  isLoggedIn: false,
  name: "Jeeva",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        console.log("aaaaaaaaaaaaaaaaaaa", state.isLoggedIn);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn = false;
      });
    builder

      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        window.location.href = "/";
      })
      .addCase(logoutAsync.rejected, (state) => {});
  },
});
export const isUserLoggedin = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
