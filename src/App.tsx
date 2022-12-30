import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Switch } from 'wouter';

import { TopBar } from './components/components';
import { HomePage } from './pages/pages';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TopBar />
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
