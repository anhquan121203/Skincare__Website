import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COMMENT_API_URL, COMMENT } from "../../Constants/commentConstant";

export const fetchComments = createAsyncThunk(
  "comment/fetchCommnet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(COMMENT_API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (comment, { rejectWithValue }) => {
    try {
      const response = await axios.post(COMMENT_API_URL, comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${COMMENT_API_URL}/${id}`, comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comment/removeComment",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${COMMENT_API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const commentSlice = createSlice({
  name: COMMENT,
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((p) => p.id !== action.payload);
      });
  },
});

export default commentSlice;
