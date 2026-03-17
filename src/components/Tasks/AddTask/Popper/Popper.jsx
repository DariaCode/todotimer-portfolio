import React, { useState } from 'react';
import {
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  PRIORITY_NORMAL,
} from '@/utils/constants';

// Material-UI components (https://mui.com/)
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// Priority Icons
import NormalIcon from './PriorityIcons/normal.svg?react';
import MediumIcon from './PriorityIcons/medium.svg?react';
import LowIcon from './PriorityIcons/low.svg?react';
import HighIcon from './PriorityIcons/high.svg?react';

const PriorityPopper = React.forwardRef((props, ref) => {
  const [priority, setPriority] = useState(PRIORITY_NORMAL);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event) => {
    setPriority(event.currentTarget.getAttribute('value'));
    setAnchorEl(null);
  };

  let currentIcon;
  switch (+priority) {
    case PRIORITY_LOW:
      currentIcon = <LowIcon />;
      break;
    case PRIORITY_MEDIUM:
      currentIcon = <MediumIcon />;
      break;
    case PRIORITY_HIGH:
      currentIcon = <HighIcon />;
      break;
    default:
      currentIcon = <NormalIcon />;
  }

  return (
    <Box className='form-control'>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        ref={ref}
        value={priority}
      >
        {currentIcon}
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 2 }}
      >
        <Paper elevation={3}>
          <Box sx={{ padding: 1 }}>
            <MenuItem value={PRIORITY_NORMAL} onClick={handleChange} sx={{ gap: 1 }}>
              <NormalIcon /> Normal
            </MenuItem>
            <MenuItem value={PRIORITY_LOW} onClick={handleChange} sx={{ gap: 1 }}>
              <LowIcon /> Low
            </MenuItem>
            <MenuItem value={PRIORITY_MEDIUM} onClick={handleChange} sx={{ gap: 1 }}>
              <MediumIcon /> Medium
            </MenuItem>
            <MenuItem value={PRIORITY_HIGH} onClick={handleChange} sx={{ gap: 1 }}>
              <HighIcon /> High
            </MenuItem>
          </Box>
        </Paper>
      </Popper>
    </Box>
  );
});

PriorityPopper.displayName = 'PriorityPopper';

export default PriorityPopper;
