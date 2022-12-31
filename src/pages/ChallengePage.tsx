import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { v4 as UUID } from 'uuid';

import { ChallangeCard } from '../components/components';
import { useDataStore, TODAY } from '../hooks/useDataStore';

const ChallengePage = () => {
  const challenges = useDataStore((state) => state.challenges);
  const objectives = useDataStore((state) => state.objectives);

  const addChallenge = useDataStore((state) => state.addChallenge);
  const [isAddingChallenge, setIsAddingChallenge] = useState<boolean>(false);
  const [inputChallengeTitle, setInputChallengeTitle] = useState<string>('');

  const startAddChallenge = () => {
    setInputChallengeTitle('');
    setIsAddingChallenge(true);
  };

  const confirmAddChallenge = () => {
    if(inputChallengeTitle === '') return;

    const challenge = {
      uid: UUID(),
      title: inputChallengeTitle,
      startDate: TODAY(),
      milestones: [],
    };
    addChallenge(challenge);
    setIsAddingChallenge(false);
  };

  const cancelAddChallenge = () => {
    setIsAddingChallenge(false);
    setInputChallengeTitle('');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Active Challenges</Typography>
          <ToggleButton
            value="addChallenge"
            selected={isAddingChallenge}
            onClick={() => startAddChallenge()}
          >
            <Add sx={{ width: 28, height: 28 }} />
          </ToggleButton>
        </Stack>
      </Grid>

      {isAddingChallenge &&
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Create Challenge</Typography>

              <Box sx={{ m: 3 }} />

              <TextField
                label="Challenge Title"
                value={inputChallengeTitle}
                onChange={(event) => setInputChallengeTitle(event.target.value)}
                fullWidth
              />

              <Box sx={{ m: 3 }} />

              <Stack direction="row" spacing={2}>
                <Button color="inherit" onClick={() => cancelAddChallenge()} fullWidth>Abandon</Button>
                <Button variant="contained" color="info" onClick={() => confirmAddChallenge()} fullWidth>Accept</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      }

      <Grid container item spacing={2} xs={12} md={6}>
        {challenges.map((challenge, index) => {
          if(index >= challenges.length / 2) return null;
          return (
            <Grid key={challenge.uid} item xs={12}>
              <ChallangeCard
                challenge={challenge}
                objectives={objectives.filter((objective) => objective.challengeUid === challenge.uid)}
              />
            </Grid>
          );
        })}
      </Grid>

      <Grid container item spacing={2} xs={12} md={6}>
        {challenges.map((challenge, index) => {
          if(index < challenges.length / 2) return null;
          return (
            <Grid key={challenge.uid} item xs={12}>
              <ChallangeCard
                challenge={challenge}
                objectives={objectives.filter((objective) => objective.challengeUid === challenge.uid)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ChallengePage;
