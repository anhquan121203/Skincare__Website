import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SKINCARE_ROUTINE,
  SKINCARE_ROUTINE_API_URL,
} from "../../Constants/skincareRoutineContant";

export const fetchSkincareRoutines = createAsyncThunk(
  "skincareRoutine/fetchSkincareRoutines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SKINCARE_ROUTINE_API_URL}/listSkinCareRoutines`
      );
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSkincareRoutine = createAsyncThunk(
  "skincareRoutine/createSkincareRoutine",
  async (skincareRoutine, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${SKINCARE_ROUTINE_API_URL}/createSkinCareRoutine`,
        skincareRoutine
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSkincareRoutine = createAsyncThunk(
  "skincareRoutine/updateSkincareRoutine",
  async (skincareRoutine, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${SKINCARE_ROUTINE_API_URL}/updateSkinCareRoutine`,
        skincareRoutine
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSkincareRoutine = createAsyncThunk(
  "skincareRoutine/deleteSkincareRoutine",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${SKINCARE_ROUTINE_API_URL}/deleteSkinCareRoutine/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const skincareRoutineSlice = createSlice({
  name: SKINCARE_ROUTINE,
  initialState: {
    skincareRoutine: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkincareRoutines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkincareRoutines.fulfilled, (state, action) => {
        state.loading = false;
        state.skincareRoutine = action.payload;
      })
      .addCase(fetchSkincareRoutines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkincareRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.skincareRoutine.push(action.payload);
      })
      .addCase(updateSkincareRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.skincareRoutine = state.skincareRoutine.map((skincareRoutine) =>
          skincareRoutine.id === action.payload.id
            ? action.payload
            : skincareRoutine
        );
      })
      .addCase(deleteSkincareRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.skincareRoutine = state.skincareRoutine.filter(
          (skincareRoutine) => skincareRoutine.id !== action.payload
        );
      });
  },
});

export default skincareRoutineSlice;
