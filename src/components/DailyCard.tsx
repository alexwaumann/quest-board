import {
  Card,
  CardContent,
  Checkbox,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Objective, TODAY } from '../hooks/useDataStore';

interface DailyCardProps {
  objectives: Objective[]
};

const DailyCard = ({objectives}: DailyCardProps) => {

  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={2}>
          {objectives.map((objective) => {
            const completedToday = objective.dailies.find((daily) => daily.date === TODAY()) !== undefined;
            return (
              <Stack key={objective.uid} direction="row" alignItems="center" spacing={2}>
                <Checkbox checked={completedToday} />
                <Typography
                  variant="body1"
                  flexGrow={1}
                >
                  {objective.title}
                </Typography>
                <TextField
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
