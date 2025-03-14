import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WALLET, WALLET_API_URL } from "../../Constants/walletConstant";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`${WALLET_API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetch api comment by product id FAILEDDDD!!!", error);
    }
  }
);

const walletSlice = createSlice({
  name: WALLET,
  initialState: {
    wallet: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch comment by product id
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice;
