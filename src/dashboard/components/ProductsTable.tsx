import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TablePagination from '@mui/material/TablePagination';

import { Product } from '../../models';
import {
  removeSelectedProduct,
  setSelectedProduct,
} from '../../state/products';
import { useAppDispatch } from '../../hooks';
import DetailsModal from './DetailsModal';

const ProductsTable = ({
  handleChangePage,
  page,
  perPage,
  products,
  total,
}: {
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  page: number;
  perPage: number;
  products: Product[];
  total: number;
}) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(removeSelectedProduct());
  };

  const handleOpen = (product: Product) => {
    dispatch(setSelectedProduct(product));
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Year</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(products || []).map((product: Product) => (
              <TableRow
                onClick={() => handleOpen(product)}
                key={product.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  td: { backgroundColor: product.color },
                }}
              >
                <TableCell align="center">{product.id}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {total && (
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={perPage}
          rowsPerPageOptions={[]}
        />
      )}

      <DetailsModal handleClose={handleClose} open={open} />
    </>
  );
};

export default React.memo(ProductsTable);
