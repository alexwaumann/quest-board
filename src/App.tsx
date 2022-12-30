import {
  AppBar,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Check,
  Clear,
} from '@mui/icons-material'
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [route, navigate] = useLocation();

  const handleNavButtonClicked = (event: React.MouseEvent<HTMLElement, MouseEvent>, newRoute: any) => {
    navigate(newRoute);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>Quest Board</Typography>
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              value={route}
              exclusive
              size="small"
              onChange={handleNavButtonClicked}
            >
              <ToggleButton value="/" sx={{ p: 1, pl: 2, pr: 2 }}>Arena</ToggleButton>
              <ToggleButton value="/quests" sx={{ p: 1, pl: 2, pr: 2 }}>Quests</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 4 }}>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/">
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
            </Route>

            <Route path="/quests">
              <Typography variant="h6">Quests</Typography>
            </Route>
          </Switch>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
