import { Typography } from '@mui/material';
import { useProductStore } from '../../../hooks/useStore';

const ProductDescription = () => {
  const storedProduct = useProductStore((state) => state.product);

  return (
    <div className="description-container">
      <Typography variant="h5" marginBottom="16px">
        Descrição do produto
      </Typography>
      <Typography variant="bodyRegular">{storedProduct.description}</Typography>
    </div>
  );
};

export default ProductDescription;
