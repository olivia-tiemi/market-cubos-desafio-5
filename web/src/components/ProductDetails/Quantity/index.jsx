import { useProductStore } from '../../../hooks/useStore';
import { useState } from 'react';
import { Typography } from '@mui/material';

const Quantity = () => {
  const storedProduct = useProductStore((state) => state.product);
  const [count, setCount] = useState(1);
  const addQuantity = (e, stock) => {
    setCount((prev) => (prev === stock ? prev : prev + 1));
  };
  const lowerQuantity = () => {
    setCount((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <>
      <Typography variant="bodySemiBold" marginTop="24px">
        Quantidade
      </Typography>
      <div className="quantity-container">
        <div className="quantity">
          <button onClick={lowerQuantity}>-</button>
          <Typography variant="bodyRegular">{count}</Typography>
          <button onClick={(e) => addQuantity(e, storedProduct.stock)}>
            +
          </button>
        </div>
        <Typography variant="caption">
          {storedProduct.stock} disponíveis
        </Typography>
      </div>
    </>
  );
};

export default Quantity;
