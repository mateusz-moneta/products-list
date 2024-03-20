import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchProducts, selectAllProducts } from './state/products';
import { Product } from './models';
import { useAppDispatch, useAppSelector } from './hooks';
import ProductsTable from './components/ProductsTable';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.products);
  const productsError = useAppSelector((state) => state.products.error);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts({ page: 1, perPage: 5 }));
    }
  }, [productsStatus, dispatch]);

  return (
    <div className="App">
      {products && <ProductsTable products={products.data as Product[]} />}
    </div>
  );
}

export default App;
