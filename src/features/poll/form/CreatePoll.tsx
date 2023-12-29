import React from 'react';
import { useMutation, gql } from '@apollo/client';
import PollForm, { PollInput } from './PollForm'; // Załóżmy, że PollForm jest w tym samym folderze
import { INSERT_POLL } from 'services/apollo/gql/pollMutations';
import { Container } from '@mui/material';

const CreatePoll: React.FC = () => {
    const [insertPoll] = useMutation(INSERT_POLL);

    const handleAddPoll = (poll: PollInput) => {
        insertPoll({ variables: { poll } });
    };

    return <Container sx={{my: 4}}>
        <PollForm onSubmit={handleAddPoll} />
    </Container>;
};

export default CreatePoll;