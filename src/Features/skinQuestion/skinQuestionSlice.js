import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SKIN_QUESTION,
  SKIN_QUESTION_API_URL,
} from "../../Constants/questionConstant";

export const fetchSkinQuestion = createAsyncThunk(
  "skinQuestion/fetchSkinQuestion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${SKIN_QUESTION_API_URL}/ListSkinQuestions`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSkinQuestion = createAsyncThunk(
  "skinQuestion/createSkinQuestion",
  async (skinQuestion, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${SKIN_QUESTION_API_URL}/createSkinQuestion`,
        skinQuestion
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSkinQuestion = createAsyncThunk(
  "skinQuestion/updateSkinQuestion",
  async (skinQuestion, { rejectWithValue }) => {
    try {
      const respone = await axios.put(
        `${SKIN_QUESTION_API_URL}/updateSkinQuestion`,
        skinQuestion
      );
      return respone.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSkinQuestion = createAsyncThunk(
  "skinQuestion/deleteSkinQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${SKIN_QUESTION_API_URL}/deleteSkinQuestion/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const skinQuestionSlice = createSlice({
  name: SKIN_QUESTION,
  initialState: {
    skinQuestion: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkinQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkinQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.skinQuestion = action.payload;
      })
      .addCase(fetchSkinQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // create skin question
      .addCase(createSkinQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.skinQuestion.push(action.payload);
      })
      // update skin question
      .addCase(updateSkinQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.skinQuestion = state.skinQuestion.map((skinQuestions) =>
          skinQuestions.id === action.payload.id
            ? action.payload
            : skinQuestions
        );
      })
      // Remove skin question
      .addCase(deleteSkinQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.skinQuestion = state.skinQuestion.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default skinQuestionSlice;
