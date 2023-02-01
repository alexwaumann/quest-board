import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Route, Switch } from 'wouter';

import { BottomBar, TopBar } from './components/components';
import { HomePage, ChallengePage } from './pages/pages';

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

darkTheme = responsiveFontSizes(darkTheme);

const App = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TopBar />
      <Box sx={{ p: {sm: 1, md: 2} }}>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>

          <Route path="/challenges">
            <ChallengePage />
          </Route>
        </Switch>
      </Box>
      <BottomBar />
    </ThemeProvider>
  );
};

export default App;
