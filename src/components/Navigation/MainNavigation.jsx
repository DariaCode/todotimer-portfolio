/* ----------------------------------------------------
React.js / Navigation component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth-context';
import Sidebar from '../Sidebar/Sidebar';

// Material-UI components (https://mui.com/)
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

const drawerWidth = 260;

export default function MainNavigation(props) {
  const { window } = props;
  const theme = useTheme();
  const context = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position='static'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: { md: 'fixed' },
        }}
      >
        <Toolbar>
          {context.token && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: 'none' },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Todo app
          </Typography>
          {!context.token && (
            <Button
              color='inherit'
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          )}
          {context.token && (
            <Button
              color='inherit'
              sx={{ textTransform: 'none' }}
              onClick={context.logout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {context.token && (
        <Box
          component='nav'
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          aria-label='tasks folders'
        >
          {/* Mobile Drawer */}
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Sidebar />
          </Drawer>
          {/* Desktop Drawer */}
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <Box>
              <Toolbar />
              <Sidebar />
            </Box>
          </Drawer>
        </Box>
      )}
    </Box>
  );
}
