import React from 'react';
import { Typography, Card, CardContent, CardHeader, Divider, Avatar, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { cutTimeZone, formatDate } from 'utils/dateFormatter';
import { PollData } from 'utils/types';



interface PollListItemProps {
  poll: PollData;
}

const PollListItem = ({ poll }: PollListItemProps) => {
  const { t, i18n } = useTranslation();
  const createdAt = formatDate(cutTimeZone(poll.createdAt), i18n.language);
  const closesAt = formatDate(cutTimeZone(poll.closesAt), i18n.language);

  return (
    <Link component={RouterLink} to={`/poll/${poll.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card elevation={3} sx={{ marginBottom: 2, height: '100%', display: 'block' }}>
        <CardHeader
          avatar={<Avatar>{`${poll.creator.firstName.charAt(0).toUpperCase()}${poll.creator.lastName.charAt(0).toUpperCase()}`}</Avatar>}
          title={poll.creator.firstName + " " + poll.creator.lastName}
          subheader={<>{t('poll.createdAt')}: {createdAt} <br/> {t('poll.closesAt')}: {closesAt}</>}
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