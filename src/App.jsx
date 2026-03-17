/* ----------------------------------------------------
React.js / Main App.js

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import ListsContext from './context/lists-context';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Lazy load pages for better performance
const AuthPage = lazy(() => import('./pages/Auth'));
const TasksPage = lazy(() => import('./pages/Tasks'));
const StatisticsPage = lazy(() => import('./pages/Statistics'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const ConfirmPage = lazy(() => import('./pages/Confirm'));
const ResetPasswordEmailPage = lazy(() => import('./pages/ResetPasswordEmail'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B8BEB',
    },
    secondary: {
      main: '#FC3C7B',
    },
  },
});

const App = () => {
  const [token, setToken] = useState('local');
  const [userId, setUserId] = useState('local');
  const [listsOption, setListsOption] = useState(0);
  const [email, setEmail] = useState('local@user.com');

  useEffect(() => {
    // Local session is the default for standalone mode
    console.log('App initialized: using local session');
  }, []);

  const login = (token, userId, _, email) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userId', JSON.stringify(userId));
    localStorage.setItem('email', JSON.stringify(email));
    setToken(token);
    setUserId(userId);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    setToken(null);
    setUserId(null);
    setEmail(null);
  };

  const Loading = (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress color='secondary' />
        </Box>
  );

  return (
        <BrowserRouter>
            <React.Fragment>
                <AuthContext.Provider
                    value={{
                      token,
                      userId,
                      email,
                      login,
                      logout,
                    }}
                >
                    <ListsContext.Provider
                        value={{
                          listsOption,
                          setListsOption,
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MainNavigation />
                                <main className='main-content'>
                                    <Suspense fallback={Loading}>
                                        <Routes>
                                            <Route path='/auth' element={<AuthPage />} />
                                            <Route path='/tasks' element={<TasksPage />} />
                                            <Route path='/statistics' element={<StatisticsPage />} />
                                            <Route path='/settings' element={<SettingsPage />} />
                                            <Route path='/confirm/:emailToken' element={<ConfirmPage />} />
                                            <Route path='/reset' element={<ResetPasswordEmailPage />} />
                                            <Route path='/resetPassword/:emailToken' element={<ResetPasswordPage />} />
                                            <Route path='/' element={<Navigate to='/tasks' replace />} />
                                        </Routes>
                                    </Suspense>
                                </main>
                            </LocalizationProvider>
                        </ThemeProvider>
                    </ListsContext.Provider>
                </AuthContext.Provider>
            </React.Fragment>
        </BrowserRouter>
  );
};

export default App;
