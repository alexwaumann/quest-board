import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState } from 'react';

import { Objective, TODAY, useDataStore } from '../hooks/useDataStore';

interface DailyCardProps {
  objectives: Objective[]
};

const DailyCard = ({objectives}: DailyCardProps) => {
  const completeDaily = useDataStore((state) => state.completeDaily);
  const [timestamp, setTimestamp] = useState<number>(TODAY());

  const handlePreviousDate = () => {
    setTimestamp((oldTimestamp) => oldTimestamp - 86400000);
  };

  const handleNextDate = () => {
    setTimestamp((oldTimestamp) => oldTimestamp + 86400000);
  };

  const handleInputChanged = (objective: Objective, value: number) => {
    const daily = {
      date: timestamp,
      units: value,
    };

    completeDaily(objective.uid, daily);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{(new Date(timestamp)).toDateString()}</Typography>
            <div>
              <IconButton onClick={() => handlePreviousDate()}>
                <ChevronLeft />
              </IconButton>
              <IconButton disabled={timestamp >= TODAY()} onClick={() => handleNextDate()}>
                <ChevronRight />
              </IconButton>
            </div>
          </Stack>
          {objectives.filter((objective) => objective.startDate <= timestamp).map((objective) => {
            const today = objective.dailies.find((daily) => daily.date === timestamp);
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
