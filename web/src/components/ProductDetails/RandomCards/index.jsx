import { useProductsListStore } from '../../../hooks/useStore';
import { Typography, Grid } from '@mui/material';
import CustomCard from '../../CustomCard';

const RandomProducts = () => {
  const productsList = useProductsListStore((state) => state.productsList);
  return (
    <>
      <Typography variant="h5" marginBottom="32px">
        Outros produtos
      </Typography>
      <div className="card-container">
        <Grid container width="xl" spacing={4}>
          {productsList &&
            productsList.map((randomProduct) => {
              return (
                <Grid item xl={3} lg={4} md={6} xs={12} key={randomProduct.id}>
                  <CustomCard result={randomProduct} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
};

export default RandomProducts;
