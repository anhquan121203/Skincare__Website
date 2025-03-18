import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FETCH_STAFF_PROFILE_API_URL,
  STAFF,
} from "../../Constants/staffContant";

export const updateStaffProfile = createAsyncThunk(
  "staff/UpdateUserProfile",
  async (staff, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${FETCH_STAFF_PROFILE_API_URL}/UpdateUserProfile`,
        staff
      );
      return response;
    } catch (error) {
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

      // Update skin type
      .addCase(updateStaffProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTypes = state.skinTypes.map((staff) =>
          staff.id === action.payload.id ? action.payload : staff
        );
      });
  },
});

export default staffSlice;
