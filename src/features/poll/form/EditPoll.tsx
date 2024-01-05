import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POLL } from 'services/apollo/gql/pollMutations';
import { useParams } from 'react-router-dom';
import PollForm from './PollForm';
import { PollInput } from 'utils/types';

const EditPoll = () => {
  const { id } = useParams<{ id: string }>();
  const [updatePoll] = useMutation(UPDATE_POLL, {
    variables: {
       
    }
  });

  const handleEditPoll = (pollData: PollInput) => {
      updatePoll({ variables: { id, object: pollData } });
  };

  return <PollForm onSubmit={handleEditPoll} />;
  //defaultValues={initialData}
};

export default EditPoll; 