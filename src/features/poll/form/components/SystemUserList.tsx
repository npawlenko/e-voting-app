import React from 'react';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { User } from 'utils/types';

export type SystemUserListProps = {
    users: User[]
    handleAddSystemUser: (user: User) => void
}

const SystemUserList = ({ users, handleAddSystemUser }: SystemUserListProps) => (
    <List dense>
    {users.map((user, index) => (
        <ListItem key={index} onClick={() => handleAddSystemUser(user)}>
        <ListItemText primary={`${user.firstName} ${user.lastName}`} />
        </ListItem>
    ))}
    </List>
);

export default SystemUserList;
