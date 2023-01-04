import {
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { ConsistencyCard, DailyCard } from '../components/components';
import { useDataStore } from '../hooks/useDataStore';

const HomePage = () => {
  const objectives = useDataStore((state) => state.objectives);

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6">Daily Challenges</Typography>
        </Grid>

        <Grid item xs={12}>
          <DailyCard objectives={objectives} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Consistency</Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="column" spacing={2}>
            {objectives.map((objective) => {
              return (
                <ConsistencyCard key={objective.uid} objective={objective} />
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
