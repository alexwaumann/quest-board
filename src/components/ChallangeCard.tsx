import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

import { Challenge, Objective } from '../hooks/useDataStore';

interface ChallengeCardProps {
  challenge: Challenge
  objectives: Objective[]
};

const ChallengeCard = ({challenge, objectives}: ChallengeCardProps) => {

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">{challenge.title}</Typography>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </Stack>
        <Box sx={{ m: 2 }} />

        {challenge.milestones.length > 0 &&
          <>
            <Typography variant="h6">Milestones</Typography>
            <Box sx={{ m: 2 }} />
          </>
        }

        {objectives.length > 0 &&
          <>
            <Typography variant="subtitle1">Dailies</Typography>
            <Box sx={{ m: 2 }} />
          </>
        }

        <Stack direction="row" spacing={2}>
          <Button color="info" fullWidth>Add Milestone</Button>
          <Button color="info" fullWidth>Add Daily</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
