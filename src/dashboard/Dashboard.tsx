import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '@mui/material/Input';

import { fetchProducts } from '../state/products';
import { Product } from '../models';
import { useAppDispatch, useAppSelector } from '../hooks';
import ProductsTable from './components/ProductsTable';

import './Dashboard.scss';

const defaultPerPage = 5;

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const handleChangeId = (event: React.ChangeEvent) => {
    const { value: id } = event.target as HTMLInputElement;

    setSearchParams({ id, page: '1' });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    searchParams.set('page', (page + 1).toString());
    setSearchParams(searchParams);

    dispatch(fetchProducts({ page: page + 1, perPage: defaultPerPage }));
  };

  const productsPaginationList = useAppSelector(
    (state) => state.products.paginationList
  );
  const productsError = useAppSelector((state) => state.products.error);
  const productsStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(
        fetchProducts({
          page: Number(searchParams.get('page')) || 1,
          perPage: defaultPerPage,
        })
      );
    }
  }, [productsStatus, dispatch]);

  return (
    <div className="dashboard">
      {productsPaginationList && (
        <>
          <div className="dashboard__input">
            <Input
              defaultValue={searchParams.get('id') || ''}
              onChange={handleChangeId}
              type={'number'}
            />
          </div>

          <div className="dashboard__products-table">
            <ProductsTable
              handleChangePage={handleChangePage}
              page={productsPaginationList.page - 1}
              perPage={productsPaginationList.per_page}
              products={productsPaginationList.data as Product[]}
              total={productsPaginationList.total}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
