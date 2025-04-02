import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  STEP_ROUTINE,
  STEP_ROUTINE_API_URL,
} from "../../Constants/stepRoutineConstant";

export const fetchStepRoutineById = createAsyncThunk(
  "commnet/fetchStepRoutineById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${STEP_ROUTINE_API_URL}/getStepRoutineByRoutineId/${id}`,
      
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
        `${STEP_ROUTINE_API_URL}/listStepRoutines`,
        
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
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${STEP_ROUTINE_API_URL}/createStepRoutine`,
        stepRoutine,
        {
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

export const updateStepRoutine = createAsyncThunk(
  "stepRoutine/updateStepRoutine",
  async (stepRoutine, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${STEP_ROUTINE_API_URL}/updateStepRoutine`,
        stepRoutine,
        {
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

export const deleteStepRoutine = createAsyncThunk(
  "stepRoutine/deleteStepRoutine",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${STEP_ROUTINE_API_URL}/deleteStepRoutine/${id}`, {
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
        state.stepRoutines.push(action.payload);
      })

      // update stepRoutine
      .addCase(updateStepRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.stepRoutines = state.stepRoutines.map((stepRoutine) =>
          stepRoutine.id === action.payload.id ? action.payload : stepRoutine
        );
      })
      // Remove skin question
      .addCase(deleteStepRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.stepRoutines = state.stepRoutines.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default stepRoutineSlice;
