import React from 'react';
import { Container, Box, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PollsList from 'features/poll/PollsList';
import { POLLS, USER_POLLS } from 'services/apollo/gql/pollQueries';
import { useTranslation } from 'react-i18next';

const HomeLoggedIn = () => {
    const { t } = useTranslation();

    return ( 
        <Container sx={{my: 4}}>
            <Box sx={{ my: 4 }}>
                <Typography variant='h3' sx={{ mb: 1 }}>{t('myPolls')}</Typography>
                <Link component={RouterLink} to={`/poll/create`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button variant="contained" sx={{ mb: 2 }}>
                        {t('addPoll')}
                    </Button>
                </Link>
                <PollsList query={USER_POLLS} />
            </Box>

            <Typography variant='h3' sx={{ mb: 2 }}>{t('availablePolls')}</Typography>
            <PollsList query={POLLS} />
        </Container>
    );
}

export default HomeLoggedIn;
