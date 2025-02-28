import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/user/authSlice";
import productSlice from "../Features/product/productSlice";
import commentSlice from "../Features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    comment: commentSlice.reducer,
  },
});
