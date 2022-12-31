import {
  Grid,
  Stack,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

import { CreateChallengeDialog, ChallangeCard } from '../components/components';
import { useDataStore } from '../hooks/useDataStore';

const ChallengePage = () => {
  const challenges = useDataStore((state) => state.challenges);
  const objectives = useDataStore((state) => state.objectives);

  const [openCreateChallengeDialog, setOpenCreateChallengeDialog] = useState<boolean>(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Active Challenges</Typography>
          <ToggleButton
            value="addChallenge"
            selected={openCreateChallengeDialog}
            onClick={() => setOpenCreateChallengeDialog(true)}
          >
            <Add sx={{ width: 28, height: 28 }} />
          </ToggleButton>
        </Stack>
      </Grid>

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

      <CreateChallengeDialog open={openCreateChallengeDialog} closeFn={() => setOpenCreateChallengeDialog(false)} />
    </Grid>
  );
};

export default ChallengePage;
