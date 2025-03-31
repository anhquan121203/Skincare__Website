import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  STEP_ROUTINE,
  STEP_ROUTINE_API_URL,
} from "../../Constants/stepRoutineConstant";

export const fetchStepRoutineId = createAsyncThunk(
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

export const listStepRoutines = createAsyncThunk(
  "stepRoutine/fetchStepRoutine",
  async (stepRoutine, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${STEP_ROUTINE_API_URL}/listStepRoutines`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStepRoutine = createAsyncThunk(
  "stepRoutine/createStepRoutine",
  async (stepRoutine, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${STEP_ROUTINE_API_URL}/createStepRoutine`, stepRoutine
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const stepRoutineSlice = createSlice({
  name: STEP_ROUTINE,
  initialState: {
    stepRoutines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStepRoutineId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStepRoutineId.fulfilled, (state, action) => {
        state.loading = false;
        state.stepRoutines = action.payload;
      })
      .addCase(fetchStepRoutineId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // List step routine
      .addCase(listStepRoutines.pending, (state) => {
        state.loading = true;
      })
      .addCase(listStepRoutines.fulfilled, (state, action) => {
        state.loading = false;
        state.stepRoutines = action.payload;
      })
      .addCase(listStepRoutines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create step routine
      .addCase(createStepRoutine.fulfilled, (state, action) => {
        state.stepRoutines.push(action.payload)
      })
  },
});

export default stepRoutineSlice;
