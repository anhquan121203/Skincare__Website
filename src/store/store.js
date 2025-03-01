import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/user/authSlice";
import orderSlice from "../Features/order/orderSlice";
import categorySlice from "../Features/category/categorySlice";
import productSlice from "../Features/product/productSlice";
import commentSlice from "../Features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    comment: commentSlice.reducer,
    order: orderSlice.reducer,
    category: categorySlice.reducer,
  },
});
