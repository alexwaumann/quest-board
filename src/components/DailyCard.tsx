import {
  Card,
  CardContent,
  Checkbox,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Objective, TODAY, useDataStore } from '../hooks/useDataStore';

interface DailyCardProps {
  objectives: Objective[]
};

const DailyCard = ({objectives}: DailyCardProps) => {
  const completeDaily = useDataStore((state) => state.completeDaily);

  const handleInputChanged = (objective: Objective, value: number) => {
    const daily = {
      date: TODAY(),
      units: value,
    };

    completeDaily(objective.uid, daily);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={2}>
          {objectives.map((objective) => {
            const today = objective.dailies.find((daily) => daily.date === TODAY());
            const completedToday = today !== undefined ? today.units >= objective.targetUnits : false;
            return (
              <Stack key={objective.uid} direction="row" alignItems="center" spacing={2}>
                <Checkbox disabled checked={completedToday} />
                <Typography
                  variant="body1"
                  flexGrow={1}
                >
                  {objective.title}
                </Typography>
                <TextField
                  type="number"
                  value={today ? today.units : ''}
                  onChange={(event) => {
                    let value = 0;
                    if(event.target.value) {
                      value = Math.abs(Number(event.target.value));
                    }
                    handleInputChanged(objective, value);
                  }}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        {`${objective.unit.toLowerCase()}s`}
                      </InputAdornment>
                  }}
                  sx={{ width: 150 }}
                />
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DailyCard;
