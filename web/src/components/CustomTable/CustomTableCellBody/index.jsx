import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import { useProductStore, useRemoveModalStore } from '../../../hooks/useStore';

const CustomTableCellBody = ({ column, value, row }) => {
  const navigate = useNavigate();
  const updateProduct = useProductStore((state) => state.updateProduct);
  const updateOpenRemoveModal = useRemoveModalStore(
    (state) => state.updateOpenRemoveModal
  );
  return (
    <TableCell
      key={column.id}
      align="center"
      style={{
        maxWidth: column.maxWidth,
        fontSize: '1.6rem',
        fontWeight: '400',
      }}
      onClick={(e) => {
        column.handleClick &&
          column.handleClick(
            e,
            row,
            navigate,
            updateProduct,
            updateOpenRemoveModal
          );
      }}
    >
      {column.type === 'image' ? (
        <img src={value} style={{ maxWidth: column.maxWidth }} />
      ) : column.type === 'currency' ? (
        column.format(value)
      ) : (
        value
      )}
    </TableCell>
  );
};

export default CustomTableCellBody;
