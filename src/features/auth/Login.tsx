import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { login, isLoggedIn } from "services/auth";
import { useForm, Controller } from "react-hook-form";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
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
    try {
      await login(data);

      navigate("/");
    } catch (error) {
      console.error("Błąd logowania: ", error);
    }
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Logowanie
        </Typography>
        <form onSubmit={onSubmit}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Adres email"
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
                label="Hasło"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Zaloguj się
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;