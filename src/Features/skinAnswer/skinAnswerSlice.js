import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SKIN_ANSWER,
  SKIN_ANSWER_API_URL,
} from "../../Constants/answerConstant";

export const fetchSkinAnswer = createAsyncThunk(
  "skinAnswer/fetchSkinAnswer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SKIN_ANSWER_API_URL}/ListSkinAnswer`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSkinAnswer = createAsyncThunk(
  "skinQskinAnsweruestion/createSkinAnswer",
  async (skinAnswer, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${SKIN_ANSWER_API_URL}/createSkinAnswer`,
        skinAnswer
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const skinAnswerSlice = createSlice({
  name: SKIN_ANSWER,
  initialState: {
    skinAnswer: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkinAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkinAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.skinAnswer = action.payload;
      })
      .addCase(fetchSkinAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkinAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.skinAnswer.push(action.payload);
      });
  },
});

export default skinAnswerSlice;
