import React, { useContext } from 'react';
import AuthContext from '@/context/auth-context';
import Sidebar from '@/components/Sidebar/Sidebar';

// Material-UI components (https://mui.com/)
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

const drawerWidth = 260;
const miniDrawerWidth = 72;

interface MainNavigationProps {
  window?: () => Window;
}

const MainNavigation: React.FC<MainNavigationProps> = () => {
  const context = useContext(AuthContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Todo app
          </Typography>
          {!context.token && (
            <Button color='inherit' sx={{ textTransform: 'none' }}>
              Login
            </Button>
          )}
          {context.token && (
            <Button color='inherit' sx={{ textTransform: 'none' }} onClick={context.logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {context.token && (
        <Box
          component='nav'
          sx={{
            width: { xs: miniDrawerWidth, md: drawerWidth },
            flexShrink: 0,
          }}
          aria-label='tasks folders'
        >
          <Drawer
            variant='permanent'
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: { xs: miniDrawerWidth, md: drawerWidth },
                overflowX: 'hidden',
              },
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
    </React.Fragment>
  );
};

export default MainNavigation;
