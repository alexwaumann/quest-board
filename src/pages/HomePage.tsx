import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  Check,
  Clear,
} from '@mui/icons-material'

const HomePage = () => {

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6">Dailies</Typography>
      </Grid>

      <Grid item xs={12}>
        <Container maxWidth="xs">
          <Card>
            <CardContent>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography variant="h6">Objective title</Typography>
                    <Typography variant="body2">Objective description</Typography>
                  </Stack>
                  <Checkbox />
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography variant="h6">Objective title</Typography>
                    <Typography variant="body2">Objective description</Typography>
                  </Stack>
                  <Checkbox />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Consistency</Typography>
      </Grid>

      <Grid item xs={12}>
        <Container maxWidth="md">
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
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Milestones</Typography>
      </Grid>

      <Grid item xs={12}>
        <Container maxWidth="md">
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="column">
                  <Typography variant="h6">Goal title</Typography>
                  <Typography variant="body2">Goal description</Typography>
                </Stack>
                <CircularProgress variant="determinate" value={66} size={32} />
              </Stack>

              <Box sx={{ m: 4 }} />

              <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography variant="h6">Milestone 1</Typography>
                  </Stack>
                  <Checkbox checked={true} />
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography variant="h6">Milestone 2</Typography>
                  </Stack>
                  <Checkbox checked={true} />
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography variant="h6">Milestone 2</Typography>
                  </Stack>
                  <Checkbox />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};

export default HomePage;
