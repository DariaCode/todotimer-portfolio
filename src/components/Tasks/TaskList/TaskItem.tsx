import React, { useState } from 'react';
import {
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  UI_GUTTER_BASE,
  UI_MENU_ITEM_GUTTER,
} from '@/utils/constants';

// Material-UI components (https://mui.com/)
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { green, yellow } from '@mui/material/colors';

interface TaskItemProps {
  taskId: string;
  title: string;
  priority: number;
  date: string;
  complete: boolean;
  repeat: boolean;
  userId: string;
  creatorId: string;
  onDetail: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { priority, taskId, title, date, complete, repeat, onComplete, onEdit, onDelete } = props;

  let currentIcon: React.ReactNode;
  switch (priority) {
    case PRIORITY_LOW:
      currentIcon = <RadioButtonUncheckedIcon sx={{ color: green[500] }} />;
      break;
    case PRIORITY_MEDIUM:
      currentIcon = <RadioButtonUncheckedIcon sx={{ color: yellow[500] }} />;
      break;
    case PRIORITY_HIGH:
      currentIcon = <RadioButtonUncheckedIcon color='secondary' />;
      break;
    default:
      currentIcon = <RadioButtonUncheckedIcon color='action' />;
  }

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const formattedDate = date ? new Date(date).toLocaleDateString('en', options) : null;

  return (
    <ListItem key={taskId} disablePadding sx={{ padding: 0 }}>
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
          <IconButton onClick={() => onComplete(taskId)}>
            {complete ? <CheckCircleIcon sx={{ color: green[500] }} /> : currentIcon}
          </IconButton>
          <Typography sx={{ display: 'inline' }}>{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {repeat && (
            <IconButton disabled>
              <LoopIcon color='action' fontSize='small' sx={{ padding: 0.1 }} />
            </IconButton>
          )}
          {formattedDate !== null && (
            <Typography sx={{ display: 'inline' }}>{formattedDate}</Typography>
          )}
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                maxHeight: UI_MENU_ITEM_GUTTER * UI_GUTTER_BASE,
                width: '15ch',
              },
            }}
          >
            <MenuItem
              key='edit'
              onClick={() => {
                handleClose();
                onEdit(taskId);
              }}
            >
              <EditOutlinedIcon sx={{ mr: 1.5 }} color='action' />
              Edit
            </MenuItem>
            <MenuItem
              key='delete'
              onClick={() => {
                handleClose();
                onDelete(taskId);
              }}
            >
              <DeleteOutlineIcon sx={{ mr: 1.5 }} color='action' />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Card>
    </ListItem>
  );
};

export default TaskItem;
