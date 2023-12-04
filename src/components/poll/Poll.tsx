import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  CardHeader,
} from '@mui/material';
import { useParams } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface PollData {
  title: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  question: Question;
}

const Poll: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const poll = {
    creator: {
        firstName: "John",
        lastName: "Doe"
    },
  }

  // Przykładowe dane ankiety
  const pollData: PollData = {
    title: 'Ankieta o programowaniu',
    author: { name: 'John Doe', avatarUrl: 'https://placekitten.com/40/40' }, // Avatar dla przykładu
    question: { id: 1, text: 'Ulubiony język programowania?', options: ['JavaScript', 'Python', 'Java', 'C#'] },
  };

  // Stan do przechowywania wybranej odpowiedzi
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Obsługa wysyłania ankiety
  const handleSubmit = () => {
    // Implementuj logikę wysyłania ankiety
    console.log('Ankieta została wysłana!', selectedAnswer);
  };

  return (
    <Container>
      <CardHeader
        avatar={<Avatar>{`${poll.creator.firstName.charAt(0).toUpperCase()}${poll.creator.lastName.charAt(0).toUpperCase()}`}</Avatar>}
        title={
          <Typography variant="h4">
            {pollData.title}
          </Typography>
        }
        subheader={<Typography variant="subtitle1">{pollData.author.name}</Typography>}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {pollData.question.text}
            </Typography>
            <RadioGroup
              aria-label={pollData.question.text}
              name={`question-${pollData.question.id}`}
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            >
              {pollData.question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio sx={{ width: '40px', height: '40px' }} />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Wyślij
      </Button>
    </Container>
  );
};

export default Poll;