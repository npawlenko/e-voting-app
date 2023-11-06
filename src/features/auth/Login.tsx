import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { login } from "services/auth";
import { Container, Paper, Typography, TextField, Button } from '@mui/material';


const Login = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={0} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Logowanie
        </Typography>
        <form>
          <TextField
            label="Adres email"
            variant="outlined"
            fullWidth
            margin="normal"
            //value={email}
            //onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Hasło"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Zaloguj się
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login