import React from 'react'
import { Typography } from '@mui/material'

export type Poll = {
  id: number;
  question: string;
  createdAt: string;
  closesAt: string;
  public: boolean;
  creator: {
      id: string;
      firstName: string;
      lastName: string;
  };
  answers: {
      id: string;
      answer: string;
  }[];
  votes: {
      id: string;
      castedAt: string;
  }[];
}

interface PollListItemProps {
  poll: Poll
}

const PollListItem = ({ poll }: PollListItemProps) => {
  console.log('poll', poll);
    return (
        <div>
          <Typography variant="h6">{poll.question}</Typography>
          <Typography>Created At: {poll.createdAt}</Typography>
          <Typography>Closes At: {poll.closesAt}</Typography>
          <Typography>Public: {poll.public ? 'Yes' : 'No'}</Typography>
        </div>
      );
}

export default PollListItem