import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledForm = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  backgroundColor: theme.palette.market.color.lightBackground,
  borderRadius: '6px',
  padding: '32px 32px',
}));

export default StyledForm;
