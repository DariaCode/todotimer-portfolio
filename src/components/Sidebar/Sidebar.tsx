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
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';

import { LIST_INDEX_SETTINGS, LIST_INDEX_STATISTICS } from '../../utils/constants';

interface NavItem {
  text: string;
  icon: React.ReactNode;
  index: number;
  to: string;
}

const Sidebar: React.FC = () => {
  const context = useContext(ListsContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (_event: React.SyntheticEvent, index: number) => {
    setSelectedIndex(index);
  };

  const navItems: NavItem[] = [
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
                if (item.index !== LIST_INDEX_STATISTICS && item.index !== LIST_INDEX_SETTINGS) {
                  context.setListsOption(item.index);
                }
                handleListItemClick(event, item.index);
              }}
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 0, md: 3 },
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ display: { xs: 'none', md: 'block' } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
