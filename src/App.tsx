import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Quest Board</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 4 }}>
        <Container maxWidth="lg">
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
