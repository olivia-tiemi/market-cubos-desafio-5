import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '382px',
  maxWidth: '100%',
  height: '482px',
  padding: '20px',
  borderRadius: '8px',
}));

export default StyledCard;
