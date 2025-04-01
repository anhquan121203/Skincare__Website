import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DASHBOARD,
  DASHBOARD_API_URL,
} from "../../Constants/dashboardConstant";

export const dashboardOrder = createAsyncThunk(
  "dashboard/DashboardOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${DASHBOARD_API_URL}/DashboardOrder`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const totalDashboard = createAsyncThunk(
  "dashboard/TotalDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${DASHBOARD_API_URL}/TotalDashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: DASHBOARD,
  initialState: {
    dashboardOrders: [],
    totalDashboardData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(dashboardOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardOrders = action.payload;
      })
      .addCase(dashboardOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(totalDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(totalDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.totalDashboardData = action.payload;
      })
      .addCase(totalDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice;
