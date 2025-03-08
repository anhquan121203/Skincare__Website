import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SKINTYPE, SKINTYPE_API_URL } from "../../Constants/skinTypeConstant";
import axios from "axios";

export const fetchSkinType = createAsyncThunk(
  "skinType/fetchSkinType",
  async (skinType, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SKINTYPE_API_URL}/listSkinType`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const skinTypeSlice = createSlice({
  name: SKINTYPE,
  initialState: {
    skinTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkinType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkinType.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTypes = action.payload;
      })
      .addCase(fetchSkinType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skinTypeSlice;
