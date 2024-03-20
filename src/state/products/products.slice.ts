import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { initialState, ProductsState } from './products.state';

const name = 'products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, perPage }: { page: number; perPage: number }) => {
    try {
      const { data } = await axios.get(
        `https://reqres.in/api/products?page=${page}&per_page=${perPage}`
      );

      return data;
    } catch (error) {
      throw Error(error.response.data.error || 'Failed to fetch products');
    }
  }
);

export const productsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.status = 'failed';
      });
  },
});

export const selectAllProducts = (state: ProductsState) => state.products;

export const productsReducer = productsSlice.reducer;
