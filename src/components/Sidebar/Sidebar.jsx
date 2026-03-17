/* ----------------------------------------------------
React.js / Sidebar component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ListsContext from '../../context/lists-context';

// Material-UI components (https://mui.com/)
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

// Icons
import InboxIcon from '@mui/icons-material/Inbox';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
  const context = useContext(ListsContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (_event, index) => {
    setSelectedIndex(index);
  };

  const navItems = [
    { text: 'All Tasks', icon: <InboxIcon color='primary' />, index: 0, to: '/tasks' },
    { text: 'Today', icon: <CalendarTodayIcon color='primary' />, index: 1, to: '/tasks' },
    { text: 'Next 7 Days', icon: <DateRangeIcon color='primary' />, index: 2, to: '/tasks' },
    { text: 'Statistics', icon: <AssessmentIcon color='primary' />, index: 3, to: '/statistics' },
    { text: 'Completed', icon: <AssignmentTurnedInIcon />, index: 4, to: '/tasks' },
    { text: 'Settings', icon: <SettingsIcon />, index: 5, to: '/settings' },
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <CssBaseline />
      <List component='nav'>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.to}
              selected={selectedIndex === item.index}
              onClick={(event) => {
                if (item.index !== 3 && item.index !== 5) {
                  context.setListsOption(item.index);
                }
                handleListItemClick(event, item.index);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
