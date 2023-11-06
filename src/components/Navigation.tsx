import { AppBar, Typography, Button, Container, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'services/auth'
import React from 'react'

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Błąd wylogowywania: ", error);
    }
  };

  return (
    <AppBar position='static'>
      <Container fixed>
      <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Moja Aplikacja
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Strona Główna
          </Button>
          <Button component={Link} to="/auth/register" color="inherit">
            Rejestracja
          </Button>
          <Button component={Link} to="/auth/login" color="inherit">
            Logowanie
          </Button>
          <Button onClick={handleLogout} color="inherit">
            Wyloguj
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation