import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SKINTYPE_API_URL, SKINTYPE } from "../../Constants/skinTypeConstant";
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

export const createNewSkinType = createAsyncThunk(
  "skinType/addNewSkinType",
  async (skinType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${SKINTYPE_API_URL}/createSkinType`,
        skinType
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSkinType = createAsyncThunk(
  "skinType/updateSkinType",
  async (skinType, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${SKINTYPE_API_URL}/updateSkinType`,
        skinType
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeSkinType = createAsyncThunk(
  "skinType/removeSkinType",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${SKINTYPE_API_URL}/deleteSkinType/${id}`);
      return id;
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
      // Fetch skin types
      .addCase(fetchSkinType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkinType.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTypes = action.payload;
      })
      .addCase(fetchSkinType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create new skin type
      .addCase(createNewSkinType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSkinType.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTypes.push(action.payload);
      })
      .addCase(createNewSkinType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update skin type
      .addCase(updateSkinType.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTypes = state.skinTypes.map((skinType) =>
          skinType.id === action.payload.id ? action.payload : skinType
        );
      })
      // Remove skin type
      .addCase(removeSkinType.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTypes = state.skinTypes.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default skinTypeSlice;
