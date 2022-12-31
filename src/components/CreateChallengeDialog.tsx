import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { v4 as UUID } from 'uuid';

import { Challenge, useDataStore, TODAY } from '../hooks/useDataStore';

interface CreateChallengeCardProps {
  open: boolean
  closeFn: (challenge: Challenge | null) => void;
};

const CreateChallengeDialog = ({open, closeFn}: CreateChallengeCardProps) => {
  const addChallenge = useDataStore((state) => state.addChallenge);
  const [titleInput, setTitleInput] = useState<string>('');

  const handleTitleInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value ? event.target.value : '';
    setTitleInput(newValue);
  };

  const cleanup = (): void => {
    setTitleInput('');
  };

  const handleCancel = (): void => {
    closeFn(null);
    cleanup();
  };

  const handleConfirm = (): void => {
    if(titleInput === '') return;

    const challenge = {
      uid: UUID(),
      title: titleInput,
      startDate: TODAY(),
      milestones: [],
    };

    addChallenge(challenge);

    closeFn(challenge);
    cleanup();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Create Challenge</DialogTitle>
      <DialogContent>
        <Box sx={{ m: 1 }} />
        <TextField
          autoFocus
          label="Challenge Title"
          value={titleInput}
          onChange={handleTitleInputChanged}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => handleCancel()}>Cancel</Button>
        <Button variant="contained" color="info" onClick={() => handleConfirm()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChallengeDialog;
