import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { isLoggedIn, register, RegisterPayload } from "services/auth";
import { useForm, Controller } from "react-hook-form";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";


const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterPayload>();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(data);

      navigate("/");
    } catch (error) {
      console.error("Błąd rejestracji: ", error);
    }
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('register')}
        </Typography>
        <form onSubmit={onSubmit}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={t('firstName')}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={t('lastName')}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={t('emailAddress')}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={t('password')}
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t('register')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;