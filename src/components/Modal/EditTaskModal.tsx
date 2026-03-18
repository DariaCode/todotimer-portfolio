import React from 'react';

// Material-UI components (https://mui.com/)
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UI_GUTTER_LARGE, UI_SPACING_DEFAULT } from '@/utils/constants';

interface EditTaskModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  children?: React.ReactNode;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ onConfirm, onCancel, children }) => {
  return (
    <Dialog
      open
      fullWidth
      aria-labelledby='form-dialog-title'
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
        },
        '& .MuiPaper-root': {
          marginTop: (theme) => theme.spacing(4),
        },
      }}
    >
      <DialogTitle id='form-dialog-title'>Edit Task</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'flex-start',
          padding: (theme) =>
            theme.spacing(UI_SPACING_DEFAULT, UI_GUTTER_LARGE, UI_GUTTER_LARGE, UI_GUTTER_LARGE),
        }}
      >
        <Button onClick={onConfirm} variant='contained' color='primary'>
          Confirm
        </Button>
        <Button onClick={onCancel} variant='outlined' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
