import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD, RESET_PASSWORD_INIT } from "services/apollo/gql/authMutations";
import { showAlert } from "utils/errorUtils";
import { ErrorSeverity } from "features/error/ApplicationError";

type ResetPasswordFormValues = {
  password: string
  confirmPassword: string
  email: string
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useParams<{ token: string }>(); // Pobranie tokena z parametrów adresu URL
  const [isTokenValid, setIsTokenValid] = useState<boolean>(!!token); // Sprawdzenie, czy token istnieje
  const [resetPasswordInit] = useMutation(RESET_PASSWORD_INIT);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<ResetPasswordFormValues>();

  useEffect(() => {
    if(token !== undefined) {
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    console.log('tokenValid', isTokenValid);
    if(isTokenValid) {
      resetPassword({variables: {
        password: data.password,
        resetToken: token
      }})
        .then(() => {
          showAlert('auth.passwordReset', ErrorSeverity.SUCCESS);
          navigate('/auth/login');
        });
    } else {
      resetPasswordInit({variables: {
        email: data.email
      }})
        .then(() => {
          showAlert('auth.resetPasswordEmailSent', ErrorSeverity.SUCCESS);
          navigate("/auth/login");
        });
    }
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('auth.resetPassword')}
        </Typography>

        {isTokenValid ? (
          // Jeśli token jest ważny, wyświetl formularz z nowym hasłem
          <form onSubmit={onSubmit}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('auth.fields.password')}
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password ? t('fieldRequired') : ""}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => value === watch('password'),
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('auth.fields.confirmPassword')}
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword
                      ? t('auth.passwordMismatch')
                      : ""
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('auth.resetPassword')}
            </Button>
          </form>
        ) : (
          // Jeśli token nie istnieje, wyświetl formularz do wysłania linku resetującego
          <form onSubmit={onSubmit}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
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

            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('auth.sendResetLink')}
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPassword;
