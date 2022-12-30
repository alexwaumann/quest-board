import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Route, Switch } from 'wouter';

import { TopBar } from './components/components';
import { HomePage, ChallengePage } from './pages/pages';

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
        <Container maxWidth="md">
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>

            <Route path="/challenges">
              <ChallengePage />
            </Route>
          </Switch>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
