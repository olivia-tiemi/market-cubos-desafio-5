import { CircularProgress, Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { paginatedProducts } from '../../api';
import SearchIcon from '../../assets/magnifying-glass.svg';
import CustomCard from '../../components/CustomCard';
import HeaderHome from '../../components/HeaderHome';
import useDebounce from '../../hooks/useDebounce';
import theme from '../../theme';
import './style.css';

function Home() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedFilter = useDebounce(filter, 500);
  const perPage = 12;

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleInput = (e) => {
    setFilter(e.target.value);
  };

  const getProducts = async () => {
    try {
      const { data } = await paginatedProducts(page, perPage, debouncedFilter);
      setTotalProducts(data[0]);
      setProducts(data[1]);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts();
    setPage(1);
  }, [debouncedFilter]);

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, [page]);

  let content;
  if (isLoading) content = <CircularProgress color="inherit" />;
  else if (error) content = <p>{error.message}</p>;
  else {
    content = products.map((result) => {
      return (
        <Grid item xl={3} lg={4} md={6} xs={12} key={result.id}>
          <CustomCard result={result} />
        </Grid>
      );
    });
  }

  return (
    <Grid container direction="column" width="xl">
      <Grid item xs={12}>
        <HeaderHome />
      </Grid>
      <Grid
        container
        padding="32px 7.5%"
        sx={{
          background: theme.palette.market.color.background,
        }}
      >
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <input
              type="text"
              placeholder="O que você está procurando?"
              onChange={handleInput}
              value={filter}
              className="search-input"
            />
            <img src={SearchIcon} alt="Ícone de lupa" />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={4}
            marginTop={2}
            justifyContent="center"
            alignItems="center"
          >
            {content}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} alignSelf="center" marginTop={2}>
        <Pagination
          count={Math.ceil(totalProducts / perPage)}
          page={page}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
