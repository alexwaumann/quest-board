import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { MoreHoriz, Star, StarOutline } from '@mui/icons-material'
// import Chart from '@qognicafinance/react-lightweight-charts';

import { Daily, Objective, TODAY, useDataStore } from '../hooks/useDataStore';
import {useState} from 'react';

interface ConsistencyCardProps {
  objective: Objective
};

const ConsistencyCard = ({objective}: ConsistencyCardProps) => {
  const challenge = useDataStore((state) => state.challenges).find((challenge) => objective.challengeUid === challenge.uid);

  const [showChart, setShowChart] = useState(false);
  const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(menuAnchorElement);

  const dailies = () : Daily[] => {
    const allDays = [];
    let date = objective.startDate;

    while(date <= TODAY()) {
      let daily = objective.dailies.find((daily) => daily.date === date);

      if(daily === undefined) {
        daily = {
          date: date,
          units: 0,
        };
      }

      allDays.push(daily);
      date += 86400000;
    }

    return allDays;
  };

  const maxStreak = dailies().reduce((prev, curr) => {
    if(curr.units >= objective.targetUnits) return prev + 1;

    return prev;
  }, 0);

  const chartData = (): any[] => {
    const data: any[] = [];
    const rawData = dailies();
    let runningSum = 0;

    rawData.forEach((daily, index) => {
      const date = new Date(daily.date);
      runningSum += daily.units;
      data.push({
        time: date.toDateString(),
        value: runningSum,
      });
    });

    return [{data: data}];
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{objective.title}</Typography>
          <IconButton onClick={handleMenuClick}>
            <MoreHoriz />
          </IconButton>
          <Menu
            open={menuOpen}
            anchorEl={menuAnchorElement}
            onClose={handleMenuClose}
          >
            <MenuItem>Edit</MenuItem>
            <MenuItem disabled>Delete</MenuItem>
            <MenuItem disabled>Show Chart</MenuItem>
          </Menu>
        </Stack>
        <Box sx={{ m: 4 }} />

        <Grid container spacing={0.25}>
        {dailies().map((daily) => {
          let icon;
          if(daily.units <= 0) {
            icon = <StarOutline key={daily.date} color="error" />;
          } else if(objective.targetUnits - daily.units <= 0) {
            icon = <Star key={daily.date} color="success" />;
          } else {
            icon = <StarOutline key={daily.date} color="success" />;
          }
          return (
            <Grid key={daily.date} item>
              {icon}
            </Grid>
          );
        })}
        </Grid>
        <Box sx={{ m: 4 }} />

        {/*<Card variant="outlined" elevation={0} sx={{ display: showChart ? 'block' : 'none' }}>
          <Chart
            options={options}
            lineSeries={chartData()}
            darkTheme={true}
            height={300}
            autoWidth
          />
        </Card>
        <Box sx={{ m: 4 }} />*/}

        <Stack direction="row" spacing={1}>
          <Chip label={challenge?.title} />
          <Chip label={new Date(objective.startDate).toDateString()} />
          <Chip label={`MAX STREAK: ${maxStreak}`} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConsistencyCard;

const options = {
  alignLabels: true,
  timeScale: {
    rightOffset: 1,
    barSpacing: 50,
    fixLeftEdge: true,
    lockVisibleTimeRangeOnResize: true,
    rightBarStaysOnScroll: true,
    borderVisible: false,
    visible: true,
    timeVisible: true,
    secondsVisible: false
  },
  priceScale: {
    position: 'left',
    mode: 0,
    borderVisible: false,
  },
  crosshair: {
    mode: 0,
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      color: 'rgba(255, 255, 255, 0.1)',
      visible: true,
    },
  },
  layout: {
    backgroundColor: '#121212',
    textColor: 'white',
    fontSize: 14,
  },
  handleScale: {
    axisPressedMouseMove: {
      time: true,
      price: false
    }
  },
};
