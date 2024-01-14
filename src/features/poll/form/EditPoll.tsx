import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POLL } from 'services/apollo/gql/pollMutations';
import { useParams } from 'react-router-dom';
import PollForm from './PollForm';
import { PollData, PollInput } from 'utils/types';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { usePoll } from 'hooks/usePoll';
import { POLLS, USER_POLLS } from 'services/apollo/gql/pollQueries';
import { showAlert } from 'utils/errorUtils';
import { ErrorSeverity } from 'features/error/ApplicationError';
import { addLocalTimezoneOffset } from 'utils/dateFormatter';

function addHours(date: Date, hours: number) {
  date.setTime(date.getTime() + (hours*60*60*1000));
  return date;
}

const EditPoll = () => {
  const { id: pollId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { poll } = usePoll({pollId});
  const [updatePoll] = useMutation(UPDATE_POLL, {
    variables: {
      pollId
    },
    refetchQueries: [POLLS, USER_POLLS]
  });

  const handleEditPoll = (poll: PollData) => {
    const pollInput: PollInput = {
      question: poll.question,
      closesAt: addHours(new Date(addLocalTimezoneOffset(poll.closesAt)), 1),
      nonSystemUsersEmails: poll.nonSystemUsersEmails,
      systemUsers: poll.systemUsers.map(u => u.id),
      isPublic: poll.isPublic,
      answers: poll.answers.map(a => ({ answer: a.answer })),
    };
    updatePoll({ variables: { pollId, object: pollInput } });
    showAlert(t('poll.edited'), ErrorSeverity.SUCCESS);
  };

  console.log(poll);
  
  return <Container sx={{my: 4}}>
    <Typography variant='h3' sx={{ mb: 4 }}>{t('poll.edit')}</Typography>
    <PollForm onSubmit={handleEditPoll} defaultValues={poll} />
  </Container>
};

export default EditPoll; 