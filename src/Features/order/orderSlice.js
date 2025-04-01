import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDER, ORDER_API_URL } from "../../Constants/orderContant";

// Fetch all orders
export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const response = await axios.get(`${ORDER_API_URL}/ListOrders`);
  return response.data;
});

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId) => {
    const response = await axios.get(
      `${ORDER_API_URL}/getOrderById/${orderId}`
    );
    return response.data;
  }
);

// Update order status
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (orderData) => {
    const response = await axios.put(
      `${ORDER_API_URL}/updateOrder`,
      orderData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId) => {
    await axios.delete(`${ORDER_API_URL}/deleteOrder/${orderId}`);
    return orderId;
  }
);

const orderSlice = createSlice({
  name: ORDER,
  initialState: {
    orders: [],
    order: null,
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
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice;
