import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';

import { HomePage } from './pages/pages';

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
              <HomePage />
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
