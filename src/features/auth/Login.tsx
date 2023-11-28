import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { login, isLoggedIn } from "services/auth";
import { useForm, Controller } from "react-hook-form";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { showAlertAndLog } from "utils/errorUtils";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = handleSubmit(async (data) => {
    login(data).then(() => {
      navigate("/");
    }).catch(showAlertAndLog);
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('login')}
        </Typography>
        <form onSubmit={onSubmit}>
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
            {t('loginButton')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;