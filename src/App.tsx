import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorAlert from 'features/error/ErrorAlert';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorAlert />

      <Navigation />

      <main>
        <Outlet />
      </main>
      
      <Footer />
    </ThemeProvider>
  );
}

export default App;
