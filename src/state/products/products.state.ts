import { PaginationList, Product } from '../../models';

export interface ProductsState {
  error: string | null;
  products: PaginationList<Product> | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const initialState: ProductsState = {
  error: null,
  products: null,
  status: 'idle',
};
