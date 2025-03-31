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
import accountSlice from "../Features/account/accountSlice";
import skinQuestionSlice from "../Features/skinQuestion/skinQuestionSlice";
import skinAnswerSlice from "../Features/skinAnswer/skinAnswerSlice";
import skincareRoutineSlice from "../Features/skincareRoutine/skincareRoutineSlice";
import stepRoutineSlice from "../Features/stepRoutine/stepRoutineSlice";

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
    stepRoutine: stepRoutineSlice.reducer,
    account: accountSlice.reducer,
    skinQuestion: skinQuestionSlice.reducer,
    skinAnswer: skinAnswerSlice.reducer,
    skincareRoutine: skincareRoutineSlice.reducer,
  },
});
