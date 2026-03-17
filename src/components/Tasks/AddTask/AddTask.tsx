import React from 'react';

// Material-UI components (https://mui.com/)
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface AddTaskProps {
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const AddTask: React.FC<AddTaskProps> = ({ onConfirm, onCancel, children }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Button
          variant='contained'
          color='primary'
          onClick={onConfirm}
          startIcon={<AddCircleOutlineIcon />}
          sx={{ minWidth: '128px', margin: 1 }}
        >
          Add Task
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={onCancel}
          startIcon={<HighlightOffIcon />}
          sx={{ minWidth: '128px', margin: 1 }}
        >
          Cancel
        </Button>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default AddTask;
