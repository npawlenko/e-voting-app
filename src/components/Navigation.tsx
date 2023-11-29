import { AppBar, Typography, Button, Container, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'services/auth'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { showAlertAndLog, showAlert } from 'utils/errorUtils'
import { ErrorSeverity } from 'features/error/ApplicationError'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.accessToken !== null);

  const handleLogout = async () => {
    logout().then(() => {
      showAlert("auth.loggedOut", ErrorSeverity.SUCCESS);
      navigate("/");
    }).catch(showAlertAndLog);
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
          {
          isLoggedIn ?
            <Button onClick={handleLogout} color="inherit">
              {t('logout')}
            </Button>
            :
            <>
              <Button component={Link} to="/auth/register" color="inherit">
                {t('registerButton')}
              </Button>
              <Button component={Link} to="/auth/login" color="inherit">
                {t('loginButton')}
              </Button>
            </>
          }
          
          
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation