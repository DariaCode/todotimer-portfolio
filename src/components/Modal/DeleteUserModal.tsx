import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../context/auth-context';

// Material-UI components (https://mui.com/)
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { UI_GUTTER_LARGE, UI_SPACING_DEFAULT } from '@/utils/constants';

interface DeleteModalProps {
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel }) => {
  const context = useContext(AuthContext);

  const [showError, setShowError] = useState('');
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);

  const emailEl = useRef<HTMLInputElement>(null);

  const handleCheckBoxOne = () => {
    setCheckOne((prev) => !prev);
  };

  const handleCheckBoxTwo = () => {
    setCheckTwo((prev) => !prev);
  };

  const handleConfirm = () => {
    const emailInput = emailEl.current?.value || '';
    if (emailInput !== context.email) {
      setShowError('Email is incorrect');
    } else {
      setShowError('');
      // Mocking behavioral feedback for standalone local mode
      console.log('Account deletion mocked. Clearing local session...');
      context.logout();
    }
  };

  return (
    <Dialog open fullWidth aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Delete account</DialogTitle>
      <DialogContent>
        <Typography color='secondary' sx={{ mb: 2 }}>
          Warning: Deleting account will remove all your data!
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Please confirm the current email.'
          type='email'
          inputRef={emailEl}
        />
        {showError && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {showError}
          </Alert>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Checkbox color='primary' checked={checkOne} onChange={handleCheckBoxOne} />
          <Typography variant='body2'>
            I am aware that deleting account will remove all my data.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox color='primary' checked={checkTwo} onChange={handleCheckBoxTwo} />
          <Typography variant='body2'>I am sure I want to delete my account.</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'flex-start',
          padding: (theme) =>
            theme.spacing(UI_SPACING_DEFAULT, UI_GUTTER_LARGE, UI_GUTTER_LARGE, UI_GUTTER_LARGE),
        }}
      >
        <Button
          onClick={handleConfirm}
          variant='contained'
          color='primary'
          disabled={!(checkOne && checkTwo)}
        >
          Confirm
        </Button>
        <Button onClick={onCancel} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
