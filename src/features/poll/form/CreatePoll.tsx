import React from 'react';
import { useMutation } from '@apollo/client';
import { INSERT_POLL } from 'services/apollo/gql/pollMutations';
import { Container, Typography } from '@mui/material';
import { PollInput } from 'utils/types';
import PollForm from './PollForm';
import { useTranslation } from 'react-i18next';

const CreatePoll: React.FC = () => {
    const { t } = useTranslation();
    const [insertPoll] = useMutation(INSERT_POLL);

    const handleAddPoll = (poll: PollInput) => {
        console.log(poll);
        insertPoll({ variables: { poll }});
    };

    return <Container sx={{my: 4}}>
        <Typography variant='h3' sx={{ mb: 4 }}>{t('addPoll')}</Typography>
        <PollForm onSubmit={handleAddPoll} />
    </Container>;
};

export default CreatePoll;