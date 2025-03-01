import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDER, ORDER_API_URL } from "../../Constants/orderContant";

// Async thunks
export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const response = await axios.get(`${ORDER_API_URL}/Order`);
  return response.data;
});

const orderSlice = createSlice({
  name: ORDER,
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice;
