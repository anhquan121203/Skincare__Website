import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FETCH_STAFF_PROFILE_API_URL,
  STAFF,
} from "../../Constants/staffContant";

export const updateStaffProfile = createAsyncThunk(
  "staff/UpdateUserProfile",
  async ({ staff }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue("No token found, authentication failed.");
      }

      const response = await axios.put(
        `${FETCH_STAFF_PROFILE_API_URL}/UpdateUserProfile`,
        staff, // Ensure `staff` is properly formatted JSON
        {
          headers: {
            "Content-Type": "application/json", // Adjust if needed
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating staff profile:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const staffSlice = createSlice({
  name: STAFF,
  initialState: {
    staffs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStaffProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStaffProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = state.staffs.map((staff) =>
          staff.id === action.payload.id ? action.payload : staff
        );
      })
      .addCase(updateStaffProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default staffSlice;
