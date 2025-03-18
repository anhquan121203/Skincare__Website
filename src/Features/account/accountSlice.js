import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACCOUNT, ACCOUNT_API_URL } from "../../Constants/accountConstant";

// Async thunks
export const getAllUsers = createAsyncThunk(
  "account/getAllUsers",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`${ACCOUNT_API_URL}/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStaffAccount = createAsyncThunk("account/createStaffAccount",
  async (account, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await axios.post(`${ACCOUNT_API_URL}/CreateStaffAccount`, account, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

const accountSlice = createSlice({
  name: ACCOUNT,
  initialState: {
    account: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createStaffAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account.push(action.payload);
      })
  },
});

export default accountSlice;
