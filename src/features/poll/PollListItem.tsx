import React from 'react';
import { Typography, Card, CardContent, CardHeader, Divider, Avatar, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from 'utils/dateFormatter';
import { PollAnswerData } from './Poll';

export type PollData = {
  id: string;
  question: string;
  createdAt: string;
  closesAt: string;
  isPublic: boolean;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
  };
  answers: PollAnswerData[];
  votes: {
    id: string;
    castedAt: string;
  }[];
  votePlaced: boolean;
};

interface PollListItemProps {
  poll: PollData;
}

const PollListItem = ({ poll }: PollListItemProps) => {
  const { t, i18n } = useTranslation();
  const createdAt = formatDate(poll.createdAt, i18n.language);
  const closesAt = formatDate(poll.closesAt, i18n.language);

  return (
    <Link component={RouterLink} to={`/poll/${poll.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card elevation={3} sx={{ marginBottom: 2, height: '100%', display: 'block' }}>
        <CardHeader
          avatar={<Avatar>{`${poll.creator.firstName.charAt(0).toUpperCase()}${poll.creator.lastName.charAt(0).toUpperCase()}`}</Avatar>}
          title={poll.creator.firstName + " " + poll.creator.lastName}
          subheader={<>{t('createdAt')}: {createdAt} <br/> {t('closesAt')}: {closesAt}</>}
        />
        <Divider />
        <CardContent>
          <Typography variant="h6">
            {poll.question}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PollListItem;