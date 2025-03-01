import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORY, CATEGORY_API_URL } from "../../Constants/categoryConstant";

// Async thunks
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await axios.get(`${CATEGORY_API_URL}/Category`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: CATEGORY,
  initialState: {
    categoties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoties = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice;
