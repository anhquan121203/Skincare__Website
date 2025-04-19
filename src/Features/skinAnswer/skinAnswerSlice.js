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
  "skinAnswer/createSkinAnswer",
  async (skinAnswer, { rejectWithValue }) => {
    try {
      const token = localStorage("accessToken");
      const response = await axios.post(
        `${SKIN_ANSWER_API_URL}/createSkinAnswer`,
        skinAnswer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Skin Answer", skinAnswer);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSkinAnswer = createAsyncThunk(
  "skinAnswer/updateSkinAnswer",
  async (skinAnswer, { rejectWithValue }) => {
    try {
      const token = localStorage("accessToken");
      const response = await axios.put(
        `${SKIN_ANSWER_API_URL}/updateSkinAnswer`,
        skinAnswer,
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

export const deleteSkinAnswer = createAsyncThunk(
  "skinAnswer/deleteSkinAnswer",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage("accessToken");
      await axios.delete(`${SKIN_ANSWER_API_URL}/deleteSkinAnswer/${id}`, {
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
      })
      // update skin question
      .addCase(updateSkinAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.skinAnswer = state.skinAnswer.map((skinAnswers) =>
          skinAnswers.id === action.payload.id ? action.payload : skinAnswers
        );
      })
      // Remove skin question
      .addCase(deleteSkinAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.skinAnswer = state.skinAnswer.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default skinAnswerSlice;
