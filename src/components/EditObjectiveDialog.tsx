import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';

import { Objective, useDataStore } from '../hooks/useDataStore';

interface EditObjectiveDialogProps {
  open: boolean
  closeFn: (objective: Objective | null) => void
  objective: Objective
};

// TODO: this is very inefficient and slow. there should be local state that updates quickly and persists
//       only if the user confirms the changes
// TODO: update title or remove the field altogether
const EditObjectiveDialog = ({open, closeFn, objective}: EditObjectiveDialogProps) => {
  const editObjective = useDataStore((state) => state.editObjective);

  const handleEditAction = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newAction = event.target.value ? event.target.value : '';

    objective.action = newAction;
    objective.title = `${objective.action} ${objective.targetUnits.toString()} ${objective.unit.toLowerCase()}${objective.targetUnits > 1 ? 's' : ''}`;
    editObjective(objective.uid, {...objective});
  };

  const handleEditTargetUnits = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newTargetUnits = event.target.value ? event.target.value : '';
    if(newTargetUnits.includes('-')) return; // show an error for this

    objective.targetUnits = Number(newTargetUnits);
    objective.title = `${objective.action} ${objective.targetUnits.toString()} ${objective.unit.toLowerCase()}${objective.targetUnits > 1 ? 's' : ''}`;
    editObjective(objective.uid, {...objective});
  };

  const handleEditUnit = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newUnit = event.target.value ? event.target.value : '';
    if(newUnit === '') return;

    objective.unit = newUnit;
    objective.title = `${objective.action} ${objective.targetUnits.toString()} ${objective.unit.toLowerCase()}${objective.targetUnits > 1 ? 's' : ''}`;
    editObjective(objective.uid, {...objective});
  };

  const handleClose = (): void => {
    closeFn(null);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Edit Objective: {objective.title}
      </DialogTitle>
      <DialogContent>
        <Box m={2} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              value={objective.title}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              value={objective.startDate}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              label="Action"
              value={objective.action}
              onChange={handleEditAction}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              type="number"
              label="Target"
              value={objective.targetUnits}
              onChange={handleEditTargetUnits}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Unit"
              value={objective.unit}
              onChange={handleEditUnit}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="info" onClick={() => handleClose()}>Done</Button>
      </DialogActions>
    </Dialog>
  )
};

export default EditObjectiveDialog;
