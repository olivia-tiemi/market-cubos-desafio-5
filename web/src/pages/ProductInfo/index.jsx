import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from '../../api/axios';
import Header from '../../components/Header';
import ProductDescription from '../../components/ProductDetails/ProductDescription';
import RandomProducts from '../../components/ProductDetails/RandomCards';
import { useProductsListStore, useProductStore } from '../../hooks/useStore';
import getRandomProducts from '../../utils/getRandom';
import './style.css';
import ProductDetails from '../../components/ProductDetails';

const ProductInfo = () => {
  const storedProduct = useProductStore((state) => state.product);
  const updateProductsList = useProductsListStore(
    (state) => state.updateProductsList
  );

  useEffect(() => {
    (async function fetchData() {
      const { data } = await axios.get('/product/all/all');
      updateProductsList(getRandomProducts(data, 4, storedProduct.id));
    })();
  }, [storedProduct]);

  const { isLoading, data, error } = useSWR(
    `/product/${storedProduct.id}`,
    axios.get
  );

  if (isLoading) return <CircularProgress color="inherit" />;
  else if (error) {
    window.location.href = '/manage';
  } else {
    const result = data.data;
    return (
      <div className="product-container">
        <Header />
        <div className="page-container">
          <div className="breadcrumb-container">
            <Link to="/">Página Inicial</Link>
            <a href="#">
              &nbsp;{'>'}&nbsp;{result.title}
            </a>
          </div>
          <ProductDetails />
          <ProductDescription />
          <RandomProducts />
        </div>
      </div>
    );
  }
};

export default ProductInfo;
