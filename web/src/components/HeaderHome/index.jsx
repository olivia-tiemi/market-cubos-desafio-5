import MenuIcon from '@mui/icons-material/Menu';
import { Grid, AppBar, Box, Button, Container } from '@mui/material';
import { IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { Typography, Icon } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../CustomButton';
import Logo from '../Logo';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './style.css';

const pages = ['Meu Carrinho', 'Meus Anúncios', 'Usuário'];
const icons = [
  LocalGroceryStoreOutlinedIcon,
  StorefrontOutlinedIcon,
  AccountCircleOutlinedIcon,
];

function HeaderHome() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e, page) => {
    if (page === 'Meus Anúncios') navigate('/manage');
    setAnchorElNav(null);
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ flexDirection: { sm: 'row', xs: 'column' } }}
        >
          <Grid container sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Logo variant="horizontal" />
          </Grid>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={(e) => handleCloseNavMenu(e, page)}
                >
                  <Typography variant="caption" textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Logo variant="horizontal" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={(e) => handleCloseNavMenu(e, page)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'flex',
                }}
              >
                <Icon>{React.createElement(icons[index])}</Icon>
                &nbsp;&nbsp;
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <CustomButton text="$ Quero vender" handler={handleLogin} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderHome;
