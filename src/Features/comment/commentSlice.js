import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { COMMENT_API_URL, COMMENT } from '../../Constants/commentConstant';


export const fetchComments = createAsyncThunk('commnet/fetchCommnet', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(COMMENT_API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createProduct = createAsyncThunk('product/createProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post(PRODUCT_API_URL, product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, product }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const removeProduct = createAsyncThunk('product/removeProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${PRODUCT_API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const commentSlice = createSlice({
  name: COMMENT,
  initialState: {
    products: [],
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
        state.products = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export default commentSlice;
