import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import emptyStock from '../../assets/empty-stock.svg';
import {
  usePageStore,
  useLoggedProductsListStore,
  useRemoveModalStore,
  useRowsPerPageStore,
} from '../../hooks/useStore';
import RemoveModal from '../EditRemoveModal';
import CustomTableBody from './CustomTableBody';
import CustomTableHead from './CustomTableHead';
import './style.css';

export default function CustomTable() {
  const openRemoveModal = useRemoveModalStore((state) => state.openRemoveModal);
  const updateOpenRemoveModal = useRemoveModalStore(
    (state) => state.updateOpenRemoveModal
  );
  const productsList = useLoggedProductsListStore(
    (state) => state.loggedProductsList
  );
  const page = usePageStore((state) => state.page);
  const updatePage = usePageStore((state) => state.updatePage);
  const rowsPerPage = useRowsPerPageStore((state) => state.rowsPerPage);
  const updateRowsPerPage = useRowsPerPageStore(
    (state) => state.updateRowsPerPage
  );
  const handleChangePage = (event, newPage) => {
    updatePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    updateRowsPerPage(+event.target.value);
    updatePage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ height: '65vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <CustomTableHead />
          {productsList.length !== 0 && <CustomTableBody />}
        </Table>
        {productsList.length === 0 && (
          <img
            src={emptyStock}
            alt="Empty stock warning"
            className="empty-stock"
          />
        )}
      </TableContainer>

      {productsList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {openRemoveModal && (
        <RemoveModal onClose={() => updateOpenRemoveModal(false)} />
      )}
    </Paper>
  );
}
