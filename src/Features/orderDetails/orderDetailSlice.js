import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ORDER_DETAILS,
  ORDER_DETAILS_API_URL,
} from "../../Constants/orderDetailsConstant";

// Async thunks
export const fetchOrderDetails = createAsyncThunk(
  "orderDetails/fetchOrderDetails",
  async () => {
    const token = localStorage.getItem("accessToken")
    const response = await axios.get(
      `${ORDER_DETAILS_API_URL}/ListOrderDetails`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const orderDetailSlice = createSlice({
  name: ORDER_DETAILS,
  initialState: {
    orderDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderDetailSlice;
