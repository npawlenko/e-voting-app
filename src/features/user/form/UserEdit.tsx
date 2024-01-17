import { useMutation, useQuery } from '@apollo/client';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { ErrorSeverity } from 'features/error/ApplicationError';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router'
import { UPDATE_USER } from 'services/apollo/gql/userMutations';
import { USER, USERS } from 'services/apollo/gql/userQueries';
import { isEmail } from 'utils/commonUtils';
import { showAlert } from 'utils/errorUtils';
import { UserData } from 'utils/types';

const UserEdit = () => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(USER, {variables: {
        id
    }});
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [USERS, USER]
    });
    const {handleSubmit, register, setValue, formState: { errors }} = useForm();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (data?.user) {
            setEmail(user.email);
            setValue("email", user.email);
        }
    }, [id, setValue, setEmail]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user: UserData = data.user;

    const onSubmit = async (data: {}) => {
        console.log(data);

        await updateUser({
            variables: {
                data: data,
                id
            },
        });
        showAlert('user.update.success', ErrorSeverity.SUCCESS);
        navigate('/');
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
            <Typography textAlign='center' variant='h3' mb={5}>{t('user.edit')}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="First Name"
                        {...register('firstName', { required: true })}
                        error={!!errors.firstName}
                        defaultValue={user.firstName}
                        helperText={errors.firstName ? t('fieldRequired') : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        {...register('lastName', { required: true })}
                        error={!!errors.lastName}
                        defaultValue={user.lastName}
                        helperText={errors.lastName ? t('fieldRequired') : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        {...register('email', { required: true })}
                        error={!!email && !isEmail(email)}
                        helperText={!!email && !isEmail(email) ? t('invalidEmail') : ""}
                        defaultValue={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained">
                        {t('submit')}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </form>
    );
}

export default UserEdit