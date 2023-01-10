import {
  Container,
  Stack,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

import { CreateChallengeDialog, CreateDailyDialog, ChallangeCard } from '../components/components';
import { Challenge, useDataStore } from '../hooks/useDataStore';

const ChallengePage = () => {
  const challenges = useDataStore((state) => state.challenges);
  const objectives = useDataStore((state) => state.objectives);

  const [openCreateChallengeDialog, setOpenCreateChallengeDialog] = useState<boolean>(false);
  const [openCreateDailyDialog, setOpenCreateDailyDialog] = useState<boolean>(false);
  const [openCreateMilestoneDialog, setOpenCreateMilestoneDialog] = useState<boolean>(false);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>({
    uid: '0x0',
    title: 'New Challenge',
    startDate: 0,
    milestones: [],
  });

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" sx={{ display: { xs: 'none', md: 'inherit' } }}>Active Challenges</Typography>
          <Typography variant="h6" sx={{ display: { md: 'none' } }}>Active Challenges</Typography>
          <ToggleButton
            value="addChallenge"
            selected={openCreateChallengeDialog}
            onClick={() => setOpenCreateChallengeDialog(true)}
          >
            <Add sx={{ width: {xs: 16, md: 28}, height: {xs: 16, md: 28} }} />
          </ToggleButton>
        </Stack>

        <Stack direction="column" spacing={2}>
          {challenges.map((challenge, index) => {
            return (
              <ChallangeCard
                key={challenge.uid}
                challenge={challenge}
                objectives={objectives.filter((objective) => objective.challengeUid === challenge.uid)}
                openCreateDailyDialogFn={() => {
                  setSelectedChallenge(challenge);
                  setOpenCreateDailyDialog(true)
                }}
                openCreateMilestoneDialogFn={() => {
                  setSelectedChallenge(challenge);
                  setOpenCreateMilestoneDialog(true);
                }}
              />
            );
          })}
        </Stack>
      </Stack>

      <CreateChallengeDialog open={openCreateChallengeDialog} closeFn={() => setOpenCreateChallengeDialog(false)} />
      <CreateDailyDialog
        open={openCreateDailyDialog}
        closeFn={() => setOpenCreateDailyDialog(false)}
        challenge={selectedChallenge}
      />
    </Container>
  );
};

export default ChallengePage;
