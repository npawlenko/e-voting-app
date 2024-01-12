import { Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { getFullName } from "utils/commonUtils";
import { User } from "utils/types";
import DeleteIcon from '@mui/icons-material/Delete';

export type SelectedSystemUserListProps = {
    selectedSystemUsers: User[]
    handleRemoveSystemUser: (user: User) => void
}

const SelectedSystemUserList = ({ selectedSystemUsers, handleRemoveSystemUser }: SelectedSystemUserListProps) => (
    <Grid item xs={12}>
        <List dense>
            {selectedSystemUsers.map((user, index) => (
                <ListItem key={index} style={{ background: '#252525', borderRadius: '4px', margin: '5px 0' }}>
                    <ListItemText primary={getFullName(user)} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemoveSystemUser(user)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </Grid>
);

export default SelectedSystemUserList