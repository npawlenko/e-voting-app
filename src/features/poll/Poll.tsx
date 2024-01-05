import { useMutation } from "@apollo/client";
import { Avatar, Box, Button, CardHeader, Container, Divider, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmActionDialog from "components/ConfirmActionDialog";
import { useTranslation } from "react-i18next";
import { INSERT_VOTE } from "services/apollo/gql/voteMutations";
import { showAlert, showAlertAndLog } from "utils/errorUtils";
import { ErrorSeverity } from "features/error/ApplicationError";
import { formatDate } from "utils/dateFormatter";
import { usePoll } from "hooks/usePoll";
import PollLoader from "components/PollLoader";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export type PollAnswerData = {
  id: number,
  answer: string
}

const Poll: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId: string|undefined = useSelector<RootState, string|undefined>(state => state.auth.user?.id);
  const { loading, poll } = usePoll({ pollId: id});
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [addVote] = useMutation(INSERT_VOTE);
  const { t, i18n } = useTranslation();

  const onDialogConfirm = () => {
    if(selectedAnswer >= 0 && poll?.answers[selectedAnswer]) {
      addVote({
        variables: { pollAnswerId: poll.answers[selectedAnswer].id }
      }).then(() => {
        showAlert('voteCasted', ErrorSeverity.SUCCESS);
      }).catch(error => {
        showAlertAndLog(error);
      });
      setOpenDialog(false);
    }
  }

  const handleSubmit = () => {
    if (!hasVoted) {
      setOpenDialog(true);
    }
  };

  if(loading || poll == null) return <PollLoader/>;
  

  const hasVoted = poll?.votePlaced;
  const createdAt = formatDate(poll.createdAt, i18n.language);
  const closesAt = formatDate(poll.closesAt, i18n.language);
  const isCreator = poll.creator?.id == userId;

  const handleEdit = () => {
    // Logika edycji ankiety
  };

  const handleDelete = () => {
    // Logika usuwania ankiety
  };

  const handleEndPoll = () => {
    // Logika zakończenia ankiety
  };

  return (
    <Container>
      <CardHeader
          avatar={<Avatar>{`${poll.creator.firstName.charAt(0).toUpperCase()}${poll.creator.lastName.charAt(0).toUpperCase()}`}</Avatar>}
          title={poll.creator.firstName + " " + poll.creator.lastName}
          subheader={<>{t('createdAt')}: {createdAt} <br/> {t('closesAt')}: {closesAt}</>}
      />

      <Divider/>

      {isCreator && (
        <>
        <Box textAlign="center" sx={{ my: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleEdit} sx={{ mx: 1 }}>
            {t('edit')}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ mx: 1 }}>
            {t('delete')}
          </Button>
          <Button variant="contained" color="warning" onClick={handleEndPoll} sx={{ mx: 1 }}>
            {t('endPoll')}
          </Button>
        </Box>
        <Divider/>
        </>
      )}

      {hasVoted && (
        <Typography variant="body1" color="secondary" sx={{ my: 2 }}>
          {t('alreadyVotedMessage')}
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {poll.question}
            </Typography>
            <RadioGroup
              aria-label={poll.question}
              name={`poll-${poll.id}`}
              value={selectedAnswer}
              onChange={(e) => !hasVoted && setSelectedAnswer(Number(e.target.value))}
            >
              {poll.answers.map((answer: PollAnswerData, idx: number) => (
                <FormControlLabel
                  key={answer.id}
                  value={idx}
                  control={<Radio sx={{ width: '40px', height: '40px' }} disabled={hasVoted} />}
                  label={answer.answer}
                />
              ))}
            </RadioGroup>
          </Paper>
        </Grid>
      </Grid>

      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={hasVoted} sx={{my: 3}}>
          {t('submitVote')}
        </Button>
      </Box>
      
      <ConfirmActionDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={onDialogConfirm}
        message={t('confirmVoteMessage', { answer: poll.answers[selectedAnswer]?.answer})}
        title={t('confirmVoteTitle')}
      />
    </Container>
  );
};

export default Poll;
