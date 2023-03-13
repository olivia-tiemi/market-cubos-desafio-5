import { Typography } from '@mui/material';
const CustomError = ({ errors, input }) => {
  return errors.map((error) => {
    return (
      error[0] === input && (
        <Typography key={error} variant="caption" sx={{ color: 'red' }}>
          {error[1].message}
        </Typography>
      )
    );
  });
};

export default CustomError;
