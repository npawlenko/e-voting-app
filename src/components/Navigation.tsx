import { AppBar, Typography, Button, Container, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'services/auth'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            VoteCampus
          </Typography>
          <Button component={Link} to="/" color="inherit">
            {t('homePage')}
          </Button>
          <Button component={Link} to="/auth/register" color="inherit">
            {t('registerButton')}
          </Button>
          <Button component={Link} to="/auth/login" color="inherit">
            {t('loginButton')}
          </Button>
          <Button onClick={handleLogout} color="inherit">
            {t('logout')}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation