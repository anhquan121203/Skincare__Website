import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CART, CART_API_URL } from "../../Constants/cartConstant";
import axios from "axios";

export const addToCart = createAsyncThunk("cart/addToCart", async () => {
  const response = await axios.post(`${CART_API_URL}/AddProductIntoCart`);
  return response.data;
});

const cartSlice = createSlice({
  name: CART,
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
    })
  },
});

export default cartSlice;