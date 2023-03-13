import * as React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Typography } from '@mui/material';
import { useUserStore, useLoggedProductsListStore } from '../../hooks/useStore';
import './style.css';

export default function Usuario() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useUserStore((state) => state.user);
  const updateLoggedProductsList = useLoggedProductsListStore(
    (state) => state.updateLoggedProductsList
  );
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    updateLoggedProductsList([]);
    await axios.get('/logout');
    navigate('/');
  };

  return (
    <>
      <AccountCircleOutlinedIcon onClick={handleMenu} />
      <Typography
        variant="h6"
        onClick={handleMenu}
        style={{ cursor: 'pointer' }}
      >
        {!user || currentPath === '/productinfo' ? 'Usuário' : user}
      </Typography>
      {currentPath !== '/productinfo' && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}
    </>
  );
}
