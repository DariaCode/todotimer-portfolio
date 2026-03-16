/* ----------------------------------------------------
React.js / Add task component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

// Material-UI components (https://mui.com/)
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function AddTask(props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onConfirm}
          startIcon={<AddCircleOutlineIcon />}
          sx={{ minWidth: '128px', margin: 1 }}
        >
        Add Task
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={props.onCancel}
          startIcon={<HighlightOffIcon />}
          sx={{ minWidth: '128px', margin: 1 }}
        >
        Cancel
        </Button>
      </Box>
      <Box>
        {props.children}
      </Box>
    </Box>
  );
};
