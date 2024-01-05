import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailList from './components/EmailList';
import SystemUserList from './components/SystemUserList';
import { PollInput, User } from 'utils/types';
import { getFullName, isEmail } from 'utils/commonUtils';
import { useNavigate } from 'react-router-dom';
import { usePollForm } from 'hooks/usePollForm';
import { SubmitHandler } from 'react-hook-form';
import SelectedSystemUserList from './components/SelectedSystemUserList';
import { t } from 'i18next';

export type PollFormProps = {
    defaultValues?: PollInput;
    onSubmit: (data: PollInput) => void;
}

const PollForm: React.FC<PollFormProps> = ({ defaultValues, onSubmit }) => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    data,
    emailList,
    setEmailList,
    email,
    setEmail,
    systemUserSearch,
    setSystemUserSearch,
    selectedSystemUsers,
    setSelectedSystemUsers,
    pollAnswers,
    setPollAnswers,
    newAnswer,
    setNewAnswer
  } = usePollForm({ defaultValues });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    const handleAddEmail = () => {
        if (email && isEmail(email) && !emailList.includes(email)) {
            setEmailList(prev => [...prev, email]);
            setEmail('');
        }
    };

    const handleAddAnswer = (newAnswer: string) => {
        if (newAnswer && !pollAnswers.includes(newAnswer)) {
            setPollAnswers(prevAnswers => [...prevAnswers, newAnswer]);
        }
    };

    const handleRemoveAnswer = (answerToRemove: string) => {
        setPollAnswers(pollAnswers.filter(answer => answer !== answerToRemove));
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmailList(emailList.filter(email => email !== emailToRemove));
    };

    const handleSystemUserSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSystemUserSearch(event.target.value);
    };

    const handleAddSystemUser = (user: User) => {
        if (!selectedSystemUsers.includes(user)) {
            setSelectedSystemUsers(prevUsers => [...prevUsers, user]);
        }
    };

    const handleRemoveSystemUser = (user: User) => {
        setSelectedSystemUsers(selectedSystemUsers.filter(user1 => getFullName(user1) !== getFullName(user)));
    };

    const filteredSystemUsers = systemUserSearch
    ? data.users.filter(user =>
        getFullName(user).toLowerCase().includes(systemUserSearch.toLowerCase())
      )
    : [];


    const onSubmitForm: SubmitHandler<PollInput> = (data) => {
        data.closesAt = new Date(data.closesAt);
        data.nonSystemUsersEmails = emailList;
        data.systemUsers = selectedSystemUsers.map(u => u.id);
        data.answers = pollAnswers.map(a => ({answer: a}));
        onSubmit(data);
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={t('question')}
                        {...register("question", { required: true })}
                        error={!!errors.question}
                        helperText={errors.question ? t('fieldRequired') : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label={t('closesAt')}
                        InputLabelProps={{ shrink: true }}
                        {...register("closesAt", { required: true })}
                        error={!!errors.closesAt}
                        helperText={errors.closesAt ? t('fieldRequired') : ""}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={t('provideAnswer')}
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder={t('provideAnswer')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                        variant="contained" 
                        onClick={() => { 
                            handleAddAnswer(newAnswer);
                            setNewAnswer('');
                        }}
                        disabled={!newAnswer} 
                    >
                        {t('addAnswer')}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <List dense>
                        {pollAnswers.map((answer, index) => (
                            <ListItem key={index} style={{ background: '#252525', borderRadius: '4px', margin: '5px 0' }}>
                                <ListItemText primary={answer} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleRemoveAnswer(answer)}>
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
                        label={t('pollEmails')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('provideEmail')}
                        error={!!email && !isEmail(email)}
                        helperText={!!email && !isEmail(email) ? t('invalidEmail') : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                        variant="contained" 
                        onClick={handleAddEmail}
                        disabled={!isEmail(email)}
                    >
                        {t('addEmail')}
                    </Button>
                </Grid>
                <EmailList emailList={emailList} handleRemoveEmail={handleRemoveEmail} />

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={t('searchUsers')}
                        value={systemUserSearch}
                        onChange={handleSystemUserSearchChange}
                        placeholder={t('provideName')}
                    />
                </Grid>
                <SystemUserList users={filteredSystemUsers} handleAddSystemUser={handleAddSystemUser} />

                <SelectedSystemUserList selectedSystemUsers={selectedSystemUsers} handleRemoveSystemUser={handleRemoveSystemUser} />

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox {...register("isPublic")} />}
                        label={t('public')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                        {t('submit')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default PollForm;
