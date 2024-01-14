import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { login, isLoggedIn } from "services/auth";
import { useForm, Controller } from "react-hook-form";
import { Container, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { showAlert } from "utils/errorUtils";

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
    }).catch(() => showAlert('auth.invalidCredentials'));
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('auth.login')}
        </Typography>
        <form onSubmit={onSubmit}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('auth.fields.email')}
                error={!!errors.email}
                helperText={errors.email ? t('fieldRequired') : ""}
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
            rules={{required: true}}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('auth.fields.password')}
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? t('fieldRequired') : ""}
                margin="normal"
              />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t('auth.login')}
          </Button>

          <Typography variant="body2" style={{ marginTop: "10px" }}>
            <Link component={RouterLink} to="/auth/reset" color="primary">
              {t('auth.forgotPassword')}
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;