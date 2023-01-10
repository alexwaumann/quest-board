import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { useLocation } from 'wouter';

const BottomBar = () => {
  const [route, navigate] = useLocation();

  const handleNavButtonClicked = (event: React.SyntheticEvent<Element, Event>, newRoute: any) => {
    if(!newRoute) return;
    navigate(newRoute);
  };

  return (
    <Paper
      sx={{ display: { sm: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={route}
        onChange={handleNavButtonClicked}
      >
        <BottomNavigationAction label="Arena" value="/" />
        <BottomNavigationAction label="Challenges" value="/challenges" />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomBar;
