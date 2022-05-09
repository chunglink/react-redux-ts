import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterSlice";
import authReducer from "@/features/auth/authSlice";
import partnerReducer from "@/features/partner/partnerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    partner: partnerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
