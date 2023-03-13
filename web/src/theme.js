import { createTheme } from '@mui/material';

const theme = createTheme({
  overrides: {
    MuiGrid: {
      item: {
        xs: 16,
      },
    },
  },
  palette: {
    market: {
      color: {
        primary: '#32323B',
        button: '#B7005C',
        background: '#F4F4F4',
        lightBackground: '#FCFCFC',
        ok: '#105136',
        alert: '#AF1717',
        attention: '#EBBC2E',
      },
      textColor: {
        dark: '#191919',
        darkGrey: '#383842',
        mediumGrey: '#9B9B9B',
        lightGrey: '#C6C6C6',
        pink: '#D10070',
        light: '#F3F3F3',
      },
    },
  },
  typography: {
    fontFamily: 'Public Sans',
    h1: { fontWeight: 500, fontSize: '5.6rem' },
    h2: { fontWeight: 500, fontSize: '4.8rem' },
    h3: { fontWeight: 700, fontSize: '4rem' },
    h4Bold: { fontWeight: 500, fontSize: '3.2rem' },
    h4SemiBold: { fontWeight: 600, fontSize: '3.2rem' },
    h5: { fontWeight: 600, fontSize: '2.4rem' },
    h6: { fontWeight: 500, fontSize: '2rem' },
    subtitle: { fontWeight: 500, fontSize: '1.6rem' },
    bodyRegular: { fontWeight: 400, fontSize: '1.6rem' },
    bodyMedium: { fontWeight: 500, fontSize: '1.6rem' },
    bodySemiBold: { fontWeight: 600, fontSize: '1.6rem' },
    button: { fontWeight: 600, fontSize: '1.6rem' },
    caption: { fontWeight: 400, fontSize: '1.4rem' },
    logo: { fontFamily: 'Montserrat', fontWeight: 700, fontSize: '2.2rem' },
    form: { fontWeight: 600, fontSize: '2rem' },
  },
});

export default theme;
