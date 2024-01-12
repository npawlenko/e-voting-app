import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import PollsList from 'features/poll/PollsList';
import { POLLS, USER_POLLS } from 'services/apollo/gql/pollQueries';
import { useTranslation } from 'react-i18next';

const HomeLoggedIn = () => {
    const { t } = useTranslation();

    return ( 
        <Container sx={{my: 4}}>
            <Box sx={{ my: 4 }}>
                <Typography variant='h3' sx={{ mb: 1 }}>{t('home.myPolls')}</Typography>
                <PollsList query={USER_POLLS} />
            </Box>

            <Typography variant='h3' sx={{ mb: 2 }}>{t('home.availablePolls')}</Typography>
            <PollsList query={POLLS} />
        </Container>
    );
}

export default HomeLoggedIn;
