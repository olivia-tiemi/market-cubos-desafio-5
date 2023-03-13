import {
  useLoggedProductsListStore,
  usePageStore,
  useRowsPerPageStore,
} from '../../../hooks/useStore';
import { columns } from '../columns';
import CustomTableCellBody from '../CustomTableCellBody';
import { TableBody, TableRow } from '@mui/material';

const CustomTableBody = () => {
  const productsList = useLoggedProductsListStore(
    (state) => state.loggedProductsList
  );
  const page = usePageStore((state) => state.page);
  const rowsPerPage = useRowsPerPageStore((state) => state.rowsPerPage);
  return (
    <TableBody>
      {productsList.length > 0 &&
        productsList
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  return (
                    <CustomTableCellBody
                      key={column.id}
                      column={column}
                      value={row[column.id]}
                      row={row}
                    ></CustomTableCellBody>
                  );
                })}
              </TableRow>
            );
          })}
    </TableBody>
  );
};

export default CustomTableBody;
