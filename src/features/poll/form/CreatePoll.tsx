import React from 'react';
import { useMutation } from '@apollo/client';
import { INSERT_POLL } from 'services/apollo/gql/pollMutations';
import { Container, Typography } from '@mui/material';
import { PollData, PollInput } from 'utils/types';
import PollForm from './PollForm';
import { useTranslation } from 'react-i18next';
import { POLLS, USER_POLLS } from 'services/apollo/gql/pollQueries';
import { showAlert } from 'utils/errorUtils';
import { ErrorSeverity } from 'features/error/ApplicationError';
import { addLocalTimezoneOffset } from 'utils/dateFormatter';

function addHours(date: Date, hours: number) {
    date.setTime(date.getTime() + (hours*60*60*1000));
    return date;
}

const CreatePoll: React.FC = () => {
    const { t } = useTranslation();
    const [insertPoll] = useMutation(INSERT_POLL, {
        refetchQueries: [POLLS, USER_POLLS]
    });

    const handleAddPoll = (poll: PollData) => {
        const pollInput: PollInput = {
            question: poll.question,
            closesAt: addHours(new Date(addLocalTimezoneOffset(poll.closesAt)), 1),
            nonSystemUsersEmails: poll.nonSystemUsersEmails,
            systemUsers: poll.systemUsers.map(u => u.id),
            isPublic: poll.isPublic,
            answers: poll.answers.map(a => ({ answer: a.answer })),
        };
        insertPoll({ variables: { poll: pollInput }});
        showAlert(t('poll.created'), ErrorSeverity.SUCCESS);
    };

    return <Container sx={{my: 4}}>
        <Typography variant='h3' sx={{ mb: 4 }}>{t('poll.add')}</Typography>
        <PollForm onSubmit={handleAddPoll} />
    </Container>;
};

export default CreatePoll;