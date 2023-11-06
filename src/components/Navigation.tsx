import { AppBar, Typography, Button, Container, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

const Navigation = () => {
  return (
    <AppBar position='static'>
      <Container fixed>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Moja Aplikacja
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Strona Główna
          </Button>
          <Button component={Link} to="/o-nas" color="inherit">
            O Nas
          </Button>
          <Button component={Link} to="/kontakt" color="inherit">
            Kontakt
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation