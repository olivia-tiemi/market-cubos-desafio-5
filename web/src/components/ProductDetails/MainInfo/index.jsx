import { Typography } from '@mui/material';
import { useProductStore } from '../../../hooks/useStore';
import theme from '../../../theme';

const MainInfo = () => {
  const storedProduct = useProductStore((state) => state.product);
  return (
    <>
      <Typography variant="h5" marginBottom="8px">
        {storedProduct.title}
      </Typography>
      <Typography variant="caption">
        Vendido e entregue por | <strong>{storedProduct.user.storeName}</strong>
      </Typography>
      <Typography
        variant="h3"
        sx={{ color: theme.palette.market.textColor.pink }}
        marginTop="22px"
        marginBottom="24px"
      >
        {`${storedProduct.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`}
      </Typography>
    </>
  );
};

export default MainInfo;
