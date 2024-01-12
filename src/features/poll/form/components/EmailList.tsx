import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type EmailListProps = {
    emailList: string[]
    handleRemoveEmail: (email: string) => void
}

const EmailList = ({ emailList, handleRemoveEmail }: EmailListProps) => (
  <Grid item xs={12}>
    <List dense>
      {emailList.map((email, index) => (
          <ListItem key={index} style={{ background: '#252525', borderRadius: '4px', margin: '5px 0' }}>
              <ListItemText primary={email} />
              <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemoveEmail(email)}>
                      <DeleteIcon />
                  </IconButton>
              </ListItemSecondaryAction>
          </ListItem>
      ))}
    </List>
  </Grid>
);

export default EmailList;