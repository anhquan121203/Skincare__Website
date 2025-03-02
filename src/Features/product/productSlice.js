import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCT_API_URL, PRODUCT } from '../../Constants/productConstant';


export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCT_API_URL}/listProduct`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createProduct = createAsyncThunk('product/createProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${PRODUCT_API_URL}/createProduct`, product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, product }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${PRODUCT_API_URL}/updateProduct`, product);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const removeProduct = createAsyncThunk('product/removeProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${PRODUCT_API_URL}/deleteProduct/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const productSlice = createSlice({
  name: PRODUCT,
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
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

export default productSlice;
