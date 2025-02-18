import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/user/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})