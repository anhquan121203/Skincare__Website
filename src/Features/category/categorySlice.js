import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORY, CATEGORY_API_URL } from "../../Constants/categoryConstant";

// Async thunks
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CATEGORY_API_URL}/getCategories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ category }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.post(
        `${CATEGORY_API_URL}/createCategory`,
        category, {
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

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ category }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.put(
        `${CATEGORY_API_URL}/updateCategory`,
        category, {
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

export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.delete(`${CATEGORY_API_URL}/deleteCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: CATEGORY,
  initialState: {
    categories: [],
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
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default categorySlice;
