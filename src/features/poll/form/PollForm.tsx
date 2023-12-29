import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, IconButton, Grid, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type PollInput = {
    question: string;
    closesAt: Date;
    nonSystemUsersEmails: string[];
    systemUsers: string[];
    isPublic: boolean;
};

type PollFormProps = {
    defaultValues?: PollInput;
    onSubmit: (data: PollInput) => void;
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const allSystemUsers = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"]; // Replace with your actual user data source

const PollForm: React.FC<PollFormProps> = ({ defaultValues, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<PollInput>({
        defaultValues,
    });
    const [emailList, setEmailList] = useState<string[]>(defaultValues?.nonSystemUsersEmails || []);
    const [email, setEmail] = useState('');
    const [systemUserSearch, setSystemUserSearch] = useState('');
    const [selectedSystemUsers, setSelectedSystemUsers] = useState<string[]>(defaultValues?.systemUsers || []);

    const handleAddEmail = () => {
        if (email && emailRegex.test(email) && !emailList.includes(email)) {
            setEmailList(prev => [...prev, email]);
            setEmail('');
        }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmailList(emailList.filter(email => email !== emailToRemove));
    };

    const handleSystemUserSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSystemUserSearch(event.target.value);
    };

    const handleAddSystemUser = (userName: string) => {
        if (!selectedSystemUsers.includes(userName)) {
            setSelectedSystemUsers(prevUsers => [...prevUsers, userName]);
        }
    };

    const handleRemoveSystemUser = (userName: string) => {
        setSelectedSystemUsers(selectedSystemUsers.filter(user => user !== userName));
    };

    const filteredSystemUsers = systemUserSearch ? allSystemUsers.filter(user => 
        user.toLowerCase().includes(systemUserSearch.toLowerCase())) : [];

    const onSubmitForm = (data: PollInput) => {
        data.nonSystemUsersEmails = emailList;
        data.systemUsers = selectedSystemUsers;
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Pytanie Ankiety"
                        {...register("question", { required: true })}
                        error={!!errors.question}
                        helperText={errors.question ? "To pole jest wymagane" : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="Data Zamknięcia"
                        InputLabelProps={{ shrink: true }}
                        {...register("closesAt", { required: true })}
                        error={!!errors.closesAt}
                        helperText={errors.closesAt ? "To pole jest wymagane" : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Dodaj e-mail"
                        error={!!email && !emailRegex.test(email)}
                        helperText={!!email && !emailRegex.test(email) ? "Niepoprawny format email" : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={handleAddEmail} disabled={!emailRegex.test(email)}>
                        Dodaj E-mail
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <List dense>
                        {emailList.map((email, index) => (
                            <ListItem key={index} style={{ background: '#252525', borderRadius: '4px',  margin: '5px 0' }}>
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

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Search System Users"
                        value={systemUserSearch}
                        onChange={handleSystemUserSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        {filteredSystemUsers.map((user, index) => (
                            <ListItem button key={index} onClick={() => handleAddSystemUser(user)}>
                                <ListItemText primary={user} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12}>
                    <List dense>
                        {selectedSystemUsers.map((user, index) => (
                            <ListItem key={index} style={{ background: '#252525', borderRadius: '4px', margin: '5px 0' }}>
                                <ListItemText primary={user} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleRemoveSystemUser(user)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox {...register("isPublic")} />}
                        label="Publiczna?"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                        Zapisz
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PollForm;
