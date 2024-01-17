import { Avatar, Card, CardHeader, IconButton, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import React from 'react'
import { UserData } from 'utils/types'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmActionDialog from 'components/ConfirmActionDialog';
import { useTranslation } from 'react-i18next';
import { useConfirmActionDialog } from 'hooks/useConfirmActionDialog';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from 'services/apollo/gql/userMutations';
import { showAlert } from 'utils/errorUtils';
import { ErrorSeverity } from 'features/error/ApplicationError';
import { USERS, USERS_PAGE } from 'services/apollo/gql/userQueries';
import { ALL_POLLS, POLLS, USER_POLLS } from 'services/apollo/gql/pollQueries';

type UserListItemProps = {
    user: UserData
}

const UserListItem = ({ user }: UserListItemProps) => {
    const { t } = useTranslation();
    const { open, showDialog, handleConfirm, handleClose } = useConfirmActionDialog();
    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [USERS, USERS_PAGE, ALL_POLLS, POLLS, USER_POLLS]
    });

    const handleDelete = (event: React.MouseEvent) => {
        event?.stopPropagation();

        showDialog(() => {
            deleteUser({
                variables: {
                    id: user.id
                }
            });
            showAlert('user.delete.success', ErrorSeverity.SUCCESS);
        })
    };

    return (
        <>
            <Card elevation={3} sx={{ marginBottom: 2, height: '100%', display: 'block' }}>
                <CardHeader
                avatar={<Avatar>{`${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}</Avatar>}
                title={user.firstName + " " + user.lastName}
                subheader={user.email}
                action={
                    <>
                        <Link component={RouterLink} to={`/user/edit/${user.id}`}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
                />
            </Card>

            <ConfirmActionDialog 
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirm}
                message={t('user.delete.confirm.message', { user: user.firstName + " " + user.lastName})}
                title={t('user.delete.confirm.title')}
            />
        </>
        
      );
}

export default UserListItem