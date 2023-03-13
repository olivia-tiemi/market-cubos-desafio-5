import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
