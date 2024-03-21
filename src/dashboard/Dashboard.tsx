import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@mui/material/Input';

import { fetchProduct, fetchProducts } from '../state/products';
import { Product } from '../models';
import { useAppDispatch, useAppSelector } from '../hooks';
import ProductsTable from './components/ProductsTable';

import './Dashboard.scss';

const debounceValue = 500;
const defaultPerPage = 5;
const minValue = 1;

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const handleChangeId = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;

    if (value === '') {
      searchParams.delete('id');
      setSearchParams(searchParams);

      return;
    }

    const id = Number(value);

    if (id < minValue) {
      return;
    }

    setSearchParams({ id: value, page: '1' });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setSearchParams({ page: (page + 1).toString() });
  };

  const productsPaginationList = useAppSelector(
    (state) => state.products.paginationList
  );
  const productsError = useAppSelector((state) => state.products.error);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      const id = Number(searchParams.get('id'));
      const page = Number(searchParams.get('page'));

      if (id) {
        dispatch(fetchProduct({ id }));
        return;
      }

      dispatch(fetchProducts({ page, perPage: defaultPerPage }));
    }, debounceValue);

    return () => clearTimeout(delayInputTimeoutId);
  }, [searchParams, dispatch]);

  return (
    <div className="dashboard">
      {productsStatus === 'loading' && (
        <div className="dashboard__loading-spinner">
          <CircularProgress />
        </div>
      )}

      {(productsError || productsPaginationList) && (
        <div className="dashboard__input">
          <Input
            defaultValue={searchParams.get('id') || ''}
            inputProps={{ min: minValue }}
            onChange={handleChangeId}
            type={'number'}
          />
        </div>
      )}

      {productsError && (
        <div className="dashboard__error-message">Error: {productsError}</div>
      )}

      {productsPaginationList && (
        <div className="dashboard__products-table">
          <ProductsTable
            handleChangePage={handleChangePage}
            page={productsPaginationList.page - 1}
            perPage={productsPaginationList.per_page}
            products={productsPaginationList.data as Product[]}
            total={productsPaginationList.total}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
