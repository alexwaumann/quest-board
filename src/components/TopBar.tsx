import {
  AppBar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation } from 'wouter';

const TopBar = () => {
  const [route, navigate] = useLocation();

  const handleNavButtonClicked = (event: React.MouseEvent<HTMLElement, MouseEvent>, newRoute: any) => {
    navigate(newRoute);
  };

  return (
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
  );
};

export default TopBar;
