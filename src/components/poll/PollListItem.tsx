import React from 'react';
import { Typography, Card, CardContent, CardHeader, Divider, Avatar, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

export type Poll = {
  id: number;
  question: string;
  createdAt: string;
  closesAt: string;
  isPublic: boolean;
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
};

interface PollListItemProps {
  poll: Poll;
}

function is12HourFormat(locale = 'en-US') {
  const timeString = new Date().toLocaleTimeString(locale, { hour: 'numeric' });
  return timeString.includes('AM') || timeString.includes('PM');
}

function formatDate(date: string, locale='en-US') {
  return new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: undefined,
    hour12: is12HourFormat(locale)
  });
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