import {
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { PostAdd } from '@mui/icons-material';

import { useDataStore } from '../hooks/useDataStore';

const ChallengePage = () => {
  const challenges = useDataStore((state) => state.challenges);
  const objectives = useDataStore((state) => state.objectives);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Challenges</Typography>
          <IconButton>
            <PostAdd sx={{ width: 28, height: 28 }} />
          </IconButton>
        </Stack>
      </Grid>

      {challenges.map((challenge) => {
        console.log(challenge);
        return (
          <Grid item xs={6}>
            challenge
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChallengePage;
