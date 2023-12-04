import React from 'react'
import { Container, Box } from '@mui/material';
import UserPollsList from 'components/poll/UserPollsList';
import PollsList from 'components/poll/PollsList';

const HomeLoggedIn = () => {
    return ( 
        <Container sx={{my: 4}}>
            <Box sx={{ my: 4 }}>
                <UserPollsList />
            </Box>
            <PollsList />
        </Container>
    );
}

export default HomeLoggedIn