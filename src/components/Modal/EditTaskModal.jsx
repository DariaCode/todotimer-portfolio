// Material-UI components (https://mui.com/)
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UI_GUTTER_LARGE, UI_SPACING_DEFAULT } from '@/utils/constants';

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
          padding: (theme) => theme.spacing(
            UI_SPACING_DEFAULT,
            UI_GUTTER_LARGE,
            UI_GUTTER_LARGE,
            UI_GUTTER_LARGE,
          ),
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
}
