import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { PaginationList, Product } from '../../models';

export interface ProductsState {
  error: string | null;
  paginationList: PaginationList<Product> | null;
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  error: null,
  paginationList: null,
  selectedProduct: null,
  status: 'idle',
};

const name = 'products';

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async ({ id }: { id: number }) => {
    try {
      const { data } = await axios.get(
        `https://reqres.in/api/products?id=${id}`
      );

      return data;
    } catch (error) {
      throw Error('Failed to fetch product');
    }
  }
);

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
  reducers: {
    removeSelectedProduct(state) {
      state.selectedProduct = null;
    },
    setSelectedProduct(state, { payload }: PayloadAction<Product | null>) {
      state.selectedProduct = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.paginationList = null;
      })
      .addCase(fetchProduct.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.paginationList = {
          ...payload,
          data: [payload.data],
        };
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.paginationList = null;
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

export const { removeSelectedProduct, setSelectedProduct } =
  productsSlice.actions;

export const productsReducer = productsSlice.reducer;
