import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/user/authSlice";
import orderSlice from "../Features/order/orderSlice";
import categorySlice from "../Features/category/categorySlice";
import productSlice from "../Features/product/productSlice";
import commentSlice from "../Features/comment/commentSlice";
import cartSlice from "../Features/cart/cartSlice";
import skinTypeSlice from "../Features/skinType/skinTypeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    comment: commentSlice.reducer,
    order: orderSlice.reducer,
    category: categorySlice.reducer,
    cart: cartSlice.reducer,
    skinType: skinTypeSlice.reducer,
  },
});
