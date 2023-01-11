import {
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Masonry } from '@mui/lab';

import { ConsistencyCard, DailyCard } from '../components/components';
import { useDataStore } from '../hooks/useDataStore';

const HomePage = () => {
  const objectives = useDataStore((state) => state.objectives);

  return (
    <Container maxWidth="md">
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ display: { xs: 'none', md: 'inherit' } }}>Daily Challenges</Typography>
          <Typography variant="h6" sx={{ display: { md: 'none' } }}>Daily Challenges</Typography>
        </Grid>

        <Grid item xs={12}>
          <DailyCard objectives={objectives} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ display: { xs: 'none', md: 'inherit' } }}>Consistency</Typography>
          <Typography variant="h6" sx={{ display: { md: 'none' } }}>Consistency</Typography>
        </Grid>

        <Grid item xs={12}>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={2}>
            {objectives.map((objective) => {
              return (
                <ConsistencyCard key={objective.uid} objective={objective} />
              );
            })}
          </Masonry>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
