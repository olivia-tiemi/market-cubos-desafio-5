import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPinkButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: '12px 16px',
  backgroundColor: theme.palette.market.color.button,
  color: theme.palette.market.textColor.light,
  borderRadius: '30px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#C10063',
  },
}));

export const StyledWhiteButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: '12px 16px',
  border: '1px solid #B7005C',
  color: theme.palette.market.textColor.pink,
  borderRadius: '30px',
  textTransform: 'none',
}));

export default StyledPinkButton;
