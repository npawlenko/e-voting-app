import { Container, Typography } from '@mui/material';
import PollsList from 'features/poll/PollsList';
import UsersList from 'features/user/UsersList';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ALL_POLLS } from 'services/apollo/gql/pollQueries';

const AdminHome = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Typography variant='h3'>{t('admin.managePolls')}</Typography>
            <PollsList query={ALL_POLLS} />

            <Typography variant='h3' sx={{mt: 5}}>{t('admin.manageUsers')}</Typography>
            <UsersList />
        </Container>
    );
};

export default AdminHome;
