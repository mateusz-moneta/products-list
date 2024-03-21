import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '../../hooks';

export default function DetailsModal({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) {
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: selectedProduct?.color || 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="Details of product"
        aria-describedby="In this modal you can find all data about the selected row of table"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {selectedProduct?.id}. {selectedProduct?.name}
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Value of pantone: {selectedProduct?.pantone_value}
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Year: {selectedProduct?.year}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
