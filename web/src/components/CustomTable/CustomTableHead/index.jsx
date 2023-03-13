import { TableCell, TableHead, TableRow } from '@mui/material';
import { columns } from '../columns';

const CustomTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="center"
            style={{
              maxWidth: column.maxWidth,
              fontSize: '2rem',
              fontWeight: '500',
              color: '#858585',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
