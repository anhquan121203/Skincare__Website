import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/user/authSlice";
import orderSlice from "../Features/order/orderSlice";
import categorySlice from "../Features/category/categorySlice";
import productSlice from "../Features/product/productSlice";
import commentSlice from "../Features/comment/commentSlice";
import cartSlice from "../Features/cart/cartSlice";
import skinTypeSlice from "../Features/skinType/skinTypeSlice";
import orderDetailSlice from "../Features/OrderDetails/orderDetailSlice";
import walletSlice from "../Features/wallet/walletSlice";
import staffSlice from "../Features/staff/staffSlice";
import stepRoutineSlide from "../Features/stepRoutine/stepRoutineSlide";
import accountSlice from "../Features/account/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    comment: commentSlice.reducer,
    order: orderSlice.reducer,
    category: categorySlice.reducer,
    cart: cartSlice.reducer,
    skinType: skinTypeSlice.reducer,
    orderDetails: orderDetailSlice.reducer,
    wallet: walletSlice.reducer,
    staff: staffSlice.reducer,
    stepRoutine: stepRoutineSlide.reducer,
    account: accountSlice.reducer,
  },
});
