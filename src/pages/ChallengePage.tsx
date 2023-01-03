import {
  Container,
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
    <Container maxWidth="sm">
      <Stack direction="column" spacing={2}>
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

        <Stack direction="column" spacing={2}>
          {challenges.map((challenge, index) => {
            return (
              <ChallangeCard
                key={challenge.uid}
                challenge={challenge}
                objectives={objectives.filter((objective) => objective.challengeUid === challenge.uid)}
              />
            );
          })}
        </Stack>
      </Stack>

      <CreateChallengeDialog open={openCreateChallengeDialog} closeFn={() => setOpenCreateChallengeDialog(false)} />
    </Container>
  );
};

export default ChallengePage;
