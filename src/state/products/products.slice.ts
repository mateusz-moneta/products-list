import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { PaginationList, Product } from '../../models';

export interface ProductsState {
  error: string | null;
  paginationList: PaginationList<Product> | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  error: null,
  paginationList: null,
  status: 'idle',
};

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
      throw Error('Failed to fetch products');
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
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.paginationList = payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const productsReducer = productsSlice.reducer;
