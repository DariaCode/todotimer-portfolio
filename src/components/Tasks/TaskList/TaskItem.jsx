/* ----------------------------------------------------
React.js / Task Item component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React, { useState } from 'react';

// Material-UI components (https://mui.com/)
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import { green, yellow } from '@mui/material/colors';

export default function TaskItem(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { priority } = props;

  let currentIcon;
  switch (priority) {
    case 2:
      currentIcon = <RadioButtonUncheckedIcon sx={{ color: green[500] }} />;
      break;
    case 3:
      currentIcon = <RadioButtonUncheckedIcon sx={{ color: yellow[500] }} />;
      break;
    case 4:
      currentIcon = <RadioButtonUncheckedIcon color='secondary' />;
      break;
    default:
      currentIcon = <RadioButtonUncheckedIcon color='action' />;
  };

  const options = {
    month: 'short',
    day: 'numeric',
  };
  const formatedDate = new Date(props.date).toLocaleDateString('en', options);

  return (
    <ListItem key={props.taskId} disablePadding sx={{ padding: 0 }}>
      <Card
        variant='outlined'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 0.3,
          mb: 0.3,
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => props.onComplete(props.taskId)}>
            {props.complete ?
              <CheckCircleIcon sx={{ color: green[500] }} /> :
              currentIcon}
          </IconButton>
          <Typography sx={{ display: 'inline' }}>
            {props.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {props.repeat !== null && (
             <IconButton disabled>
               <LoopIcon
                 color='action'
                 fontSize='small'
                 sx={{ padding: 0.1 }}
               />
             </IconButton>
          )}
          {props.date !== null && (
            <Typography sx={{ display: 'inline' }}>
              {formatedDate}
            </Typography>
          )}
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={handleClick}>
            <MoreVertIcon/>
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                maxHeight: 46 * 4.5,
                width: '15ch',
              },
            }}>
            <MenuItem
              key='edit'
              onClick={() => {
                handleClose();
                props.onEdit(props.taskId);
              }}>
              <EditOutlinedIcon
                sx={{ mr: 1.5 }}
                color='action'/>
              Edit
            </MenuItem>
            <MenuItem
              key='delete'
              onClick={() => {
                handleClose();
                props.onDelete(props.taskId);
              }}>
              <DeleteOutlineIcon
                sx={{ mr: 1.5 }}
                color='action'/>
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Card>
    </ListItem>
  );
};
