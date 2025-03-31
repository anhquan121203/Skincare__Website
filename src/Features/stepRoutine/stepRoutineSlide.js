import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  STEP_ROUTINE,
  STEP_ROUTINE_API_URL,
} from "../../Constants/stepRoutineConstant";

export const fetchStepRoutineById = createAsyncThunk(
  "commnet/fetchStepRoutineId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${STEP_ROUTINE_API_URL}/getStepRoutineByRoutineId/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const stepRoutineSlide = createSlice({
  name: STEP_ROUTINE,
  initialState: {
    stepRoutines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStepRoutineById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStepRoutineById.fulfilled, (state, action) => {
        state.loading = false;
        state.stepRoutines = action.payload;
      })
      .addCase(fetchStepRoutineById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stepRoutineSlide;
