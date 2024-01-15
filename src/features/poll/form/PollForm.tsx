import React, { useEffect } from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailList from './components/EmailList';
import SystemUserList from './components/SystemUserList';
import { PollAnswerData, PollData, User } from 'utils/types';
import { getFullName, isEmail } from 'utils/commonUtils';
import { useNavigate } from 'react-router-dom';
import { usePollForm } from 'hooks/usePollForm';
import { Controller, SubmitHandler } from 'react-hook-form';
import SelectedSystemUserList from './components/SelectedSystemUserList';
import { t } from 'i18next';
import { showAlert } from 'utils/errorUtils';

export type PollFormProps = {
    defaultValues?: PollData | undefined;
    onSubmit: (data: PollData) => void;
}

const PollForm: React.FC<PollFormProps> = ({ defaultValues, onSubmit }) => {
    const navigate = useNavigate();
    const {
        control,
        setValue,
        register,
        handleSubmit,
        errors,
        loading,
        error,
        userData,
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

    useEffect(() => {
        if (defaultValues) {
            setValue("question", defaultValues.question);
            setValue("closesAt", defaultValues.closesAt.slice(0, 16));
            setValue("isPublic", defaultValues.isPublic);
            setSelectedSystemUsers(defaultValues.systemUsers);
            setPollAnswers(defaultValues.answers);
        }
    }, [defaultValues, setValue, setPollAnswers, setSelectedSystemUsers]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAddEmail = () => {
        if (email && isEmail(email) && !emailList.includes(email)) {
            setEmailList(prev => [...prev, email]);
            setEmail('');
        }
    };

    const handleAddAnswer = (newAnswer: string) => {
        console.log(newAnswer)
        if (newAnswer && pollAnswers.filter(a => a.answer === newAnswer).length === 0) {
            const toAdd = { id: '', answer: newAnswer }
            setPollAnswers(prevAnswers => [...prevAnswers, toAdd]);
        }
    };

    const handleRemoveAnswer = (answerToRemove: PollAnswerData) => {
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
    ? userData.users.filter(user =>
        getFullName(user).toLowerCase().includes(systemUserSearch.toLowerCase())
      )
    : [];


    const onSubmitForm: SubmitHandler<PollData> = (data) => {
        data.nonSystemUsersEmails = emailList;
        data.systemUsers = selectedSystemUsers;
        data.answers = pollAnswers;

        if(!Array.isArray(data.answers) || data.answers.length < 2) {
            showAlert('poll.addAtLeastTwoAnswers');
            return;
        }

        onSubmit(data);
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={t('poll.question')}
                        InputLabelProps={{ shrink: true }}
                        {...register("question", { required: true })}
                        error={!!errors.question}
                        helperText={errors.question ? t('fieldRequired') : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label={t('poll.closesAt')}
                        InputLabelProps={{ shrink: true }}
                        {...register("closesAt", { required: true })}
                        error={!!errors.closesAt}
                        helperText={errors.closesAt ? t('fieldRequired') : ""}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={t('poll.answer.provide')}
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder={t('poll.answer.provide')}
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
                        {t('poll.answer.add')}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <List dense>
                        {pollAnswers.map((answer, index) => (
                            <ListItem key={index} style={{ background: '#252525', borderRadius: '4px', margin: '5px 0' }}>
                                <ListItemText primary={answer.answer} />
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
                        label={t('poll.nonSystemUsers.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('poll.nonSystemUsers.provideEmail')}
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
                        {t('poll.nonSystemUsers.addEmail')}
                    </Button>
                </Grid>
                <EmailList emailList={emailList} handleRemoveEmail={handleRemoveEmail} />

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={t('poll.systemUsers.search')}
                        value={systemUserSearch}
                        onChange={handleSystemUserSearchChange}
                        placeholder={t('poll.systemUsers.provideName')}
                    />
                </Grid>
                <SystemUserList users={filteredSystemUsers} handleAddSystemUser={handleAddSystemUser} />

                <SelectedSystemUserList selectedSystemUsers={selectedSystemUsers} handleRemoveSystemUser={handleRemoveSystemUser} />

                <Grid item xs={12}>
                <Controller
                    name="isPublic"
                    control={control}
                    defaultValue={defaultValues?.isPublic || false}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...register("isPublic")} checked={field.value} />}
                            label={t('poll.public')}
                        />
                    )}
                />
                    
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Button type="submit" variant="contained">
                        {t('submit')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default PollForm;