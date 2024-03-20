import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchProducts } from '../state/products';
import { Product } from '../models';
import { useAppDispatch, useAppSelector } from '../hooks';
import ProductsTable from './components/ProductsTable';

const defaultPerPage = 5;

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setSearchParams({ page: (page + 1).toString() });
    dispatch(fetchProducts({ page: page + 1, perPage: defaultPerPage }));
  };

  const productsPaginationList = useAppSelector(
    (state) => state.products.paginationList
  );
  const productsError = useAppSelector((state) => state.products.error);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts({ page: 1, perPage: defaultPerPage }));
    }
  }, [productsStatus, dispatch]);

  return (
    <div className="App">
      {productsPaginationList && (
        <ProductsTable
          handleChangePage={handleChangePage}
          page={productsPaginationList.page - 1}
          perPage={productsPaginationList.per_page}
          products={productsPaginationList.data as Product[]}
          total={productsPaginationList.total}
        />
      )}
    </div>
  );
}

export default Dashboard;
