import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import followReducer from "./slices/userDataSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer,
   
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in dev mode
});

export default store