import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CART, CART_API_URL } from "../../Constants/cartConstant";
import axios from "axios";


export const fetchCartProduct = createAsyncThunk(
  "cartProduct/GetCart",
  async (cartProduct, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CART_API_URL}/GetCart`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProductIntoCart = createAsyncThunk(
  "cartProduct/AddProductIntoCart",
  async (cartProduct, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken"); 
      console.log(cartProduct)
      const response = await axios.post(
        `${CART_API_URL}/AddProductIntoCart`,
        cartProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const cartSlice = createSlice({
  name: CART,
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCartProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCartProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    })
    .addCase(fetchCartProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createProductIntoCart.fulfilled, (state, action) => {
        state.carts.push(action.payload);
    })
  },
});

export default cartSlice;