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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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
            {(products || []).map(({ color, id, name, year }: Product) => (
              <TableRow
                onClick={handleOpen}
                key={name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  td: { backgroundColor: color },
                }}
              >
                <TableCell align="center">{id}</TableCell>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={perPage}
        rowsPerPageOptions={[]}
      />

      <DetailsModal handleClose={handleClose} open={open} />
    </>
  );
};

export default React.memo(ProductsTable);
