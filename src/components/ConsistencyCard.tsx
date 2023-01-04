import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { Check, Clear } from '@mui/icons-material'

import { Daily, Objective, TODAY, useDataStore } from '../hooks/useDataStore';

interface ConsistencyCardProps {
  objective: Objective
};

const ConsistencyCard = ({objective}: ConsistencyCardProps) => {
  const challenge = useDataStore((state) => state.challenges).find((challenge) => objective.challengeUid === challenge.uid);

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

    return 0;
  }, 0);

  return (
    <Card>
      <CardContent>
        <Stack direction="column">
          <Typography variant="h6">{objective.title}</Typography>
        </Stack>

        <Box sx={{ m: 4 }} />

        {dailies().map((daily) => {
          return daily.units >= objective.targetUnits ? <Check key={daily.date} color="success" /> : <Clear key={daily.date} color="error" />;
        })}

        <Box sx={{ m: 4 }} />

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
