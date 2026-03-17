/* ----------------------------------------------------
React.js / Edit task modal component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

// Material-UI components (https://mui.com/)
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditTaskModal(props) {
  return (
    <Dialog
      open
      fullWidth
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Edit Task</DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'flex-start',
          padding: (theme) => theme.spacing(2, 3, 3, 3),
        }}>
        <Button
          onClick={props.onConfirm}
          variant='contained'
          color='primary'>
            Confirm
        </Button>
        <Button
          onClick={props.onCancel}
          variant='outlined'
          color='secondary'>
            Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
