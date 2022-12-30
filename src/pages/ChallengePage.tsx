import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import { useState } from 'react';
import { v4 as UUID } from 'uuid';

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
    <Grid container spacing={4}>
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

      {challenges.map((challenge) => {
        const filteredObjectives = objectives.filter((objective) => objective.challengeUid === challenge.uid);
        return (
          <Grid key={challenge.uid} item xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5">{challenge.title}</Typography>
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                </Stack>
                <Box sx={{ m: 2 }} />

                {challenge.milestones.length > 0 &&
                  <>
                    <Typography variant="h6">Milestones</Typography>
                    <Box sx={{ m: 2 }} />
                  </>
                }

                {filteredObjectives.length > 0 &&
                  <>
                    <Typography variant="subtitle1">Dailies</Typography>
                    <Box sx={{ m: 2 }} />
                  </>
                }

                <Stack direction="row" spacing={2}>
                  <Button color="info" fullWidth>Add Milestone</Button>
                  <Button color="info" fullWidth>Add Daily</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChallengePage;
