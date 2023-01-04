import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  Check,
  Clear,
} from '@mui/icons-material'

import { DailyCard } from '../components/components';
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
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column">
                  <Typography variant="h6">Objective title</Typography>
                  <Typography variant="body2">Objective description</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Stack direction="column">
                    <Typography variant="body2">Max Streak:</Typography>
                    <Typography variant="body2">Current Streak:</Typography>
                  </Stack>
                  <Stack direction="column">
                    <Typography variant="body2">4</Typography>
                    <Typography variant="body2">1</Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Box sx={{ m: 4 }} />

              <Check color="success" />
              <Check color="success" />
              <Check color="success" />
              <Check color="success" />
              <Clear color="error" />
              <Check color="success" />

              <Box sx={{ m: 4 }} />

              <Chip label="GOAL: Goal title" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
