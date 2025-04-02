import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SKINTEST, SKINTEST_API_URL } from "../../Constants/skinTestConstant";

export const createSkinTest = createAsyncThunk(
  "skinTest/createSkinTest",
  async (skinTest, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${SKINTEST_API_URL}/createSkinTest`,
        skinTest,
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

const skinTestSlice = createSlice({
  name: SKINTEST,
  initialState: {
    skinTest: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createSkinTest.fulfilled, (state, action) => {
        state.loading = false;
        state.skinTest.push(action.payload);
      });
  },
});

export default skinTestSlice;
