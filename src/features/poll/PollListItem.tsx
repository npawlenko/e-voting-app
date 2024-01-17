import React from 'react';
import { Typography, Card, CardContent, CardHeader, Divider, Avatar, Link, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { cutTimeZone, formatDate } from 'utils/dateFormatter';
import { PollData } from 'utils/types';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Role } from 'features/auth/authSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { ALL_POLLS } from 'services/apollo/gql/pollQueries';
import { useMutation } from '@apollo/client';
import { DELETE_POLL } from 'services/apollo/gql/pollMutations';
import ConfirmActionDialog from 'components/ConfirmActionDialog';
import { useConfirmActionDialog } from 'hooks/useConfirmActionDialog';
import { showAlert } from 'utils/errorUtils';
import { ErrorSeverity } from 'features/error/ApplicationError';



interface PollListItemProps {
  poll: PollData;
}

const PollListItem = ({ poll }: PollListItemProps) => {
  const { t, i18n } = useTranslation();
  const createdAt = formatDate(cutTimeZone(poll.createdAt), i18n.language);
  const closesAt = formatDate(cutTimeZone(poll.closesAt), i18n.language);
  const isAdmin: boolean = useSelector<RootState, boolean>(state => state.auth.user?.role === Role.ADMIN);
  const { open, showDialog, handleConfirm, handleClose } = useConfirmActionDialog();
  const [deletePoll] = useMutation(DELETE_POLL, {
    refetchQueries: [ALL_POLLS]
  });

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    showDialog(() => {
      deletePoll({variables: {
        pollId: poll.id
      }});
      showAlert('poll.deleteDialog.success', ErrorSeverity.SUCCESS);
    });
  }

  return (
    <>
      <Link component={RouterLink} to={`/poll/${poll.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card elevation={3} sx={{ marginBottom: 2, height: '100%', display: 'block' }}>
          <CardHeader
            avatar={<Avatar>{`${poll.creator.firstName.charAt(0).toUpperCase()}${poll.creator.lastName.charAt(0).toUpperCase()}`}</Avatar>}
            title={poll.creator.firstName + " " + poll.creator.lastName}
            subheader={<>{t('poll.createdAt')}: {createdAt} <br/> {t('poll.closesAt')}: {closesAt}</>}
            action={
              isAdmin &&
              <>
                  <IconButton aria-label="delete" onClick={handleDelete}>
                      <DeleteIcon />
                  </IconButton>
              </>
            }
          />
          <Divider />
          <CardContent>
            <Typography variant="h6">
              {poll.question}
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <ConfirmActionDialog 
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={t('poll.deleteDialog.confirm.message', { poll: poll.question})}
        title={t('poll.deleteDialog.confirm.title')}
      />
    </>
    
  );
};

export default PollListItem;