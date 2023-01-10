import {
  AppBar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { Stadium } from '@mui/icons-material';
import { useLocation } from 'wouter';

import { useDataStore } from '../hooks/useDataStore';

const TopBar = () => {
  const displayName = useDataStore((state) => state.displayName);
  const [route, navigate] = useLocation();

  const handleNavButtonClicked = (event: React.MouseEvent<HTMLElement, MouseEvent>, newRoute: any) => {
    if(!newRoute) return;
    navigate(newRoute);
  };

  return (
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stadium color="info" />
            <Typography variant="h6">Colosseum</Typography>
          </Stack>
          <ToggleButtonGroup
            value={route}
            exclusive
            size="small"
            onChange={handleNavButtonClicked}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <ToggleButton value="/" sx={{ p: 1, pl: 2, pr: 2 }}>Arena</ToggleButton>
            <ToggleButton value="/challenges" sx={{ p: 1, pl: 2, pr: 2 }}>Challenges</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2">{displayName}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
