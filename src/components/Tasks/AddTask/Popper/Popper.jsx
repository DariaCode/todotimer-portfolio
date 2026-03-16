/* ----------------------------------------------------
React.js / Priority Picker component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React, { useState } from 'react';

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

// eslint-disable-next-line react/display-name
const PriorityPopper = React.forwardRef((props, ref) => {
  const [priority, setPriority] = useState(1);
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
    case 2:
      currentIcon = <LowIcon/>;
      break;
    case 3:
      currentIcon = <MediumIcon/>;
      break;
    case 4:
      currentIcon = <HighIcon/>;
      break;
    default:
      currentIcon = <NormalIcon/>;
  }

  return (
    <Box className="form-control">
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
            <MenuItem value={1} onClick={handleChange} sx={{ gap: 1 }}>
              <NormalIcon/> Normal
            </MenuItem>
            <MenuItem value={2} onClick={handleChange} sx={{ gap: 1 }}>
              <LowIcon/> Low
            </MenuItem>
            <MenuItem value={3} onClick={handleChange} sx={{ gap: 1 }}>
              <MediumIcon/> Medium
            </MenuItem>
            <MenuItem value={4} onClick={handleChange} sx={{ gap: 1 }}>
              <HighIcon/> High
            </MenuItem>
          </Box>
        </Paper>
      </Popper>
    </Box>
  );
});

export default PriorityPopper;
