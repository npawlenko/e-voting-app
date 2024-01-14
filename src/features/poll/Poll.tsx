import { useMutation } from "@apollo/client";
import { Avatar, Box, Button, CardHeader, Container, Divider, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography, } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmActionDialog from "components/ConfirmActionDialog";
import { useTranslation } from "react-i18next";
import { INSERT_VOTE, INSERT_VOTE_BY_TOKEN } from "services/apollo/gql/voteMutations";
import { showAlert, showAlertAndLog } from "utils/errorUtils";
import { ErrorSeverity } from "features/error/ApplicationError";
import { cutTimeZone, formatDate } from "utils/dateFormatter";
import { usePoll } from "hooks/usePoll";
import PollLoader from "components/PollLoader";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { POLL } from "services/apollo/gql/pollQueries";
import { PollAnswerData } from "utils/types";
import PollChart from "./form/components/PollChart";
import { parseISO, isPast } from 'date-fns';
import ManagePoll from "./form/components/ManagePoll";
import { useConfirmActionDialog } from "hooks/useConfirmActionDialog";

const Poll: React.FC = () => {
  const { id, token } = useParams<{ id: string, token: string }>();
  const navigate = useNavigate();
  const userId: string|undefined = useSelector<RootState, string|undefined>(state => state.auth.user?.id);
  const { loading, poll, deletePoll, closePoll } = usePoll({ pollId: id, token});
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const { open, showDialog, handleConfirm, handleClose } = useConfirmActionDialog();
  
  const { t, i18n } = useTranslation();

  const addVoteMutation = token === undefined ?  INSERT_VOTE : INSERT_VOTE_BY_TOKEN;
  const [addVote] = useMutation(addVoteMutation, {
    refetchQueries: [POLL]
  });

  const handleSubmit = () => {
    if (!hasVoted) {
      showDialog(() => {
        if(selectedAnswer >= 0 && poll?.answers[selectedAnswer]) {
          addVote({
            variables: { pollAnswerId: poll.answers[selectedAnswer].id, token }
          }).then(() => {
            showAlert('vote.castedSuccessfully', ErrorSeverity.SUCCESS);
            navigate(0);
          }).catch(error => {
            showAlertAndLog(error);
          });
        }
      });
    }
  }

  if(loading || poll == null) return <PollLoader/>;
  

  const hasVoted = poll?.votePlaced;
  const createdAt = formatDate(cutTimeZone(poll.createdAt), i18n.language);
  const closesAt = formatDate(cutTimeZone(poll.closesAt), i18n.language);
  const pollClosed = isPast(parseISO(poll.closesAt.slice(0,16)));
  const isCreator = userId !== undefined && Number(poll.creator?.id) === Number(userId);

  const handleDelete = () => {
    deletePoll();
    showAlert(t('pollDeleted'), ErrorSeverity.SUCCESS);
    navigate('/');
  }

  const handleEndPoll = () => {
    closePoll();
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardHeader
            avatar={<Avatar>{`${poll.creator.firstName.charAt(0).toUpperCase()}${poll.creator.lastName.charAt(0).toUpperCase()}`}</Avatar>}
            title={poll.creator.firstName + " " + poll.creator.lastName}
            subheader={<>{t('poll.createdAt')}: {createdAt} <br/> {t('poll.closesAt')}: {closesAt}</>}
          />
        </Grid>
        {!pollClosed && isCreator && (
          <Grid item xs={12} md={6}>
            <ManagePoll id={id} handleDelete={handleDelete} handleEndPoll={handleEndPoll}/>
          </Grid>
        )}
      </Grid>

      <Divider/>

      {pollClosed ?
        <PollChart data={{
          labels: poll.answers.map(a => a.answer),
          values: poll.answers.map(a => poll.votes.filter(v => v.answer.id === a.id).length)
        }}/>
        :
        <>
          {hasVoted && (
            <Typography variant="body1" color="secondary" sx={{ my: 2 }}>
              {t('vote.alreadyVoted')}
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
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={hasVoted || selectedAnswer === -1} sx={{my: 3}}>
              {t('vote.submit')}
            </Button>
          </Box>
          
          <ConfirmActionDialog 
            open={open}
            onClose={handleClose}
            onConfirm={handleConfirm}
            message={t('vote.confirm.message', { answer: poll.answers[selectedAnswer]?.answer})}
            title={t('vote.confirm.title')}
          />
        </>
      }
    </Container>
  );
};

export default Poll;
