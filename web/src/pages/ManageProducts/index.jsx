import { Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProductsList } from '../../api';
import SearchIcon from '../../assets/magnifying-glass.svg';
import pencil from '../../assets/pencil.svg';
import trashCan from '../../assets/trash-can.svg';
import { CustomButton } from '../../components/CustomButton';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import useDebounce from '../../hooks/useDebounce';
import { useUserStore, useLoggedProductsListStore } from '../../hooks/useStore';
import './style.css';

function ManageProducts() {
  const [filter, setFilter] = useState('');
  const productsList = useLoggedProductsListStore(
    (state) => state.loggedProductsList
  );
  const updateProductsList = useLoggedProductsListStore(
    (state) => state.updateLoggedProductsList
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const updateUserName = useUserStore((state) => state.updateUser);
  const debouncedFilter = useDebounce(filter, 500);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFilter(e.target.value);
  };

  const handleAddProduct = () => {
    navigate('/addproduct');
  };

  const getProducts = async () => {
    try {
      const { data } = await allProductsList(debouncedFilter);
      setIsLoading(false);
      setError(null);
      if (data.storeName) updateUserName(data.storeName);
      else {
        updateUserName(data[0].user.storeName);
        updateProductsList(data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      navigate('/signin');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, [debouncedFilter]);

  let content;
  if (isLoading) content = <CircularProgress color="inherit" />;
  else if (error) content = <p>{error.message}</p>;
  else {
    productsList.forEach((product) => {
      product.edit = pencil;
      product.exclude = trashCan;
    });
    return (
      <div className="manage-container">
        <Header />
        <div className="page-container">
          <div className="content-container">
            <div className="options-container">
              <Typography variant="h5">Meus produtos</Typography>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  onChange={handleInput}
                  value={filter}
                  className="search-input"
                />
                <img src={SearchIcon} alt="Ícone de lupa" />
              </div>
              <CustomButton text="+ Criar anúncio" handler={handleAddProduct} />
            </div>
            <CustomTable />
          </div>
        </div>
      </div>
    );
  }

  return <div className="center-content">{content}</div>;
}

export default ManageProducts;
