import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h2" align="center" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        {t('systemDescription')}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button component={Link} to="/auth/register" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          {t('registerButton')}
        </Button>
        <Button component={Link} to="/auth/login" variant="contained" color="primary">
          {t('loginButton')}
        </Button>
      </div>
    </Container>
  );
};

export default Home;