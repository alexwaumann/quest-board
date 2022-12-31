import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { v4 as UUID } from 'uuid';

import { Challenge, Objective, useDataStore, TODAY } from '../hooks/useDataStore';

interface CreateChallengeCardProps {
  open: boolean
  closeFn: (objective: Objective | null) => void;
  challenge: Challenge
};

const CreateDailyDialog = ({open, closeFn, challenge}: CreateChallengeCardProps) => {
  const addObjective = useDataStore((state) => state.addObjective);

  const [actionInput, setActionInput] = useState<string>('');
  const [unitsInput, setUnitsInput] = useState<string>('');
  const [targetUnitsInput, setTargetUnitsInput] = useState<string>('');

  const handleTargetUnitsInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value ? event.target.value : '';
    setActionInput(newValue);
  };

  const cleanup = (): void => {
    setActionInput('');
  };

  const handleCancel = (): void => {
    closeFn(null);
    cleanup();
  };

  const handleConfirm = (): void => {
    // validation
    if(actionInput === '' || unitsInput === '' || targetUnitsInput === '') return; // show an error for this
    if(targetUnitsInput.includes('-')) return; // show an error for this

    const targetUnits = Number(targetUnitsInput);
    const title = `${actionInput} ${targetUnits.toString()} ${unitsInput.toLowerCase()}${targetUnits > 1 ? 's' : ''}`;

    // create objective
    const objective = {
      uid: UUID(),
      title: title,
      action: actionInput,
      unit: unitsInput,
      targetUnits: targetUnits,
      active: true,
      startDate: TODAY(),
      dailies: [],
      challengeUid: challenge.uid,
    };

    // update state
    addObjective(objective)

    // cleanup
    closeFn(objective);
    cleanup();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add Daily: {challenge.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Set an action, a unit of measure, and a target number of units to complete daily.
        </DialogContentText>
        <Box sx={{ m: 3 }} />
        <Stack direction="column" spacing={2}>
          <TextField
            autoFocus
            label="Action"
            placeholder="Read"
            value={actionInput}
            onChange={(event) => setActionInput(event.target.value ? event.target.value : '')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Unit"
            value={unitsInput}
            placeholder="Page"
            onChange={(event) => setUnitsInput(event.target.value ? event.target.value : '')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            type="number"
            label="Target Units"
            value={targetUnitsInput}
            placeholder="20"
            onChange={(event) => setTargetUnitsInput(event.target.value ? event.target.value : '')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Stack>
        <Box sx={{ m: 2 }} />
        <DialogContentText>
          {actionInput ? actionInput : 'Read'} {targetUnitsInput ? targetUnitsInput : '20'} {unitsInput ? `${unitsInput.toLowerCase()}${Number(targetUnitsInput) > 1 ? 's' : ''}` : 'pages'} every day.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => handleCancel()}>Cancel</Button>
        <Button variant="contained" color="info" onClick={() => handleConfirm()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDailyDialog;
