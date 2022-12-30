import {
  AppBar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation } from 'wouter';

import { useDataStore } from '../hooks/useDataStore';

const TopBar = () => {
  const displayName = useDataStore((state) => state.displayName);
  const [route, navigate] = useLocation();

  const handleNavButtonClicked = (event: React.MouseEvent<HTMLElement, MouseEvent>, newRoute: any) => {
    navigate(newRoute);
  };

  return (
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1}>
          <Typography variant="h6">Quest Board</Typography>
          <ToggleButtonGroup
            value={route}
            exclusive
            size="small"
            onChange={handleNavButtonClicked}
          >
            <ToggleButton value="/" sx={{ p: 1, pl: 2, pr: 2 }}>Arena</ToggleButton>
            <ToggleButton value="/quests" sx={{ p: 1, pl: 2, pr: 2 }}>Quests</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2">{displayName}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
