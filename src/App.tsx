import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchProducts, selectAllProducts } from './state/products';
import { useAppDispatch, useAppSelector } from './hooks';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  const products = useSelector(selectAllProducts);

  const productsError = useAppSelector((state) => state.products.error);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts({ page: 1, perPage: 5 }));
    }
  }, [productsStatus, dispatch]);

  return <div className="App"></div>;
}

export default App;
