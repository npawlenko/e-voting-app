import { AppBar, Toolbar, Typography, Container, Link, Paper } from '@mui/material';
import React from 'react'

const Footer = () => {
  return (
    <Paper component="footer" sx={{ position: 'relative', marginTop: 'auto' }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              © {new Date().getFullYear()} Moja Aplikacja
            </Typography>
            <Typography variant="body1" color="inherit" sx={{ flexGrow: 1 }}>
              <Link href="/polityka-prywatnosci" color="inherit">
                Polityka Prywatności
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Paper>
  )
}

export default Footer