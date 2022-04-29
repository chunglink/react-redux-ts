import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { UserState } from './types';
import {login} from './api'


export const loginAsync = createAsyncThunk(
    'auth/login',
    async () => {
      const response = await login();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


const initialState: UserState = {
    isLoggedIn: false,
    name: 'Jeeva',
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

    },
    
    extraReducers: (builder) => {
    builder
      
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn =false;
      });
  },
});
export const isUserLoggedin = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;