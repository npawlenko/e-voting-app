import { AppBar, Typography, Button, Container, Toolbar, Link, styled, ButtonProps } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logout } from 'services/auth'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { showAlertAndLog, showAlert } from 'utils/errorUtils'
import { ErrorSeverity } from 'features/error/ApplicationError'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { apolloClient } from 'services/apollo'
import { Role } from 'features/auth/authSlice'

const WhiteButton = styled(Button)<ButtonProps>(() => ({
  color: 'white',
}));

const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.accessToken !== null);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.role === Role.ADMIN);

  const handleLogout = async () => {
    logout().then(() => {
      apolloClient.cache.reset();
      showAlert("auth.loggedOut", ErrorSeverity.SUCCESS);
      navigate("/");
    }).catch(showAlertAndLog);
  };

  return (
    <AppBar position='static'>
      <Container fixed>
      <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('pageTitle')}
          </Typography>
          <Link component={RouterLink} to={`/`}>
            <WhiteButton variant="text">
              {t('navigation.home')}
            </WhiteButton>
          </Link>
         
          {
          isLoggedIn ?
            <>
              <Button onClick={handleLogout} color="inherit">
                {t('navigation.logout')}
              </Button>
              {!isAdmin &&
                <Link component={RouterLink} to={`/poll/create`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <WhiteButton sx={{ml: 4}} variant="contained">
                        {t('poll.add')}
                    </WhiteButton>
                </Link>
              }
            </>
            :
            <>
              <Link component={RouterLink} to={`/auth/register`}>
                <WhiteButton variant="text">
                  {t('navigation.register')}
                </WhiteButton>
              </Link>
              <Link component={RouterLink} to={`/auth/login`}>
                <WhiteButton variant="text">
                  {t('navigation.login')}
                </WhiteButton>
              </Link>
            </>
          }
          
          
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation