import React from 'react';
import { useMutation, gql } from '@apollo/client';
import PollForm, { PollInput } from './PollForm';
import { UPDATE_POLL } from 'services/apollo/gql/pollMutations';
import { useParams } from 'react-router-dom';

const EditPoll = () => {
  const { id } = useParams<{ id: string }>();
  const [updatePoll] = useMutation(UPDATE_POLL);

  const handleEditPoll = (pollData: PollInput) => {
      updatePoll({ variables: { id, object: pollData } });
  };

  return <PollForm onSubmit={handleEditPoll} />;
  //defaultValues={initialData}
};

export default EditPoll;