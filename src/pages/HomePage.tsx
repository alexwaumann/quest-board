import {
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Masonry } from '@mui/lab';

import { ConsistencyCard, DailyCard, EditObjectiveDialog } from '../components/components';
import { Objective, useDataStore } from '../hooks/useDataStore';
import {useState} from 'react';

const HomePage = () => {
  const objectives = useDataStore((state) => state.objectives);

  const [openEditObjectiveDialog, setOpenEditObjectiveDialog] = useState<boolean>(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective>({
    uid: '',
    title: '',
    action: '',
    unit: '',
    targetUnits: 0,
    active: false,
    startDate: 0,
    dailies: [],
    challengeUid: '',
  });

  const handleOnEditObjective = (objective: Objective) => {
    setSelectedObjective(objective);
    setOpenEditObjectiveDialog(true);
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ display: { xs: 'none', md: 'inherit' } }}>Daily Challenges</Typography>
          <Typography variant="h6" sx={{ display: { md: 'none' } }}>Daily Challenges</Typography>
        </Grid>

        <Grid item xs={12}>
          <DailyCard objectives={objectives} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ display: { xs: 'none', md: 'inherit' } }}>Consistency</Typography>
          <Typography variant="h6" sx={{ display: { md: 'none' } }}>Consistency</Typography>
        </Grid>

        <Grid item xs={12}>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={2}>
            {objectives.map((objective) => {
              return (
                <ConsistencyCard key={objective.uid} objective={objective} onEditObjective={handleOnEditObjective} />
              );
            })}
          </Masonry>
        </Grid>
      </Grid>

      <EditObjectiveDialog
        open={openEditObjectiveDialog}
        objective={selectedObjective}
        closeFn={() => setOpenEditObjectiveDialog(false)}
      />
    </Container>
  );
};

export default HomePage;
