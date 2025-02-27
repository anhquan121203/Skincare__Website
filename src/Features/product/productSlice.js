// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCT_API_URL, PRODUCT } from '../../Constants/productConstant';

// Async thunks
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get(PRODUCT_API_URL/listProduct);
  return response.data;
});

export const createProduct = createAsyncThunk('product/createProduct', async (product) => {
  const response = await axios.post(PRODUCT_API_URL, product);
  return response.data;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, product }) => {
  const response = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
  return response.data;
});

export const removeProduct = createAsyncThunk('product/removeProduct', async (id) => {
  await axios.delete(`${PRODUCT_API_URL}/${id}`);
  return id;
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
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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

export default productSlice.reducer;