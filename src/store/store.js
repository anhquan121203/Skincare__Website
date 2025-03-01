import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/user/authSlice";
import orderSlice from "../Features/order/orderSlice";
import categorySlice from "../Features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    order: orderSlice.reducer,
    category: categorySlice.reducer,
  },
});
