/* ----------------------------------------------------
React.js / Main App.js

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth';
import TasksPage from './pages/Tasks';
import StatisticsPage from './pages/Statistics';
import SettingsPage from './pages/Settings';
import ConfirmPage from './pages/Confirm';
import ResetPasswordEmailPage from './pages/ResetPasswordEmail';
import ResetPasswordPage from './pages/ResetPassword';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import ListsContext from './context/lists-context';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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
        console.log("App initialized: using local session");
    }, []);

    const login = (token, userId, _, email) => {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("email", JSON.stringify(email));
        setToken(token);
        setUserId(userId);
        setEmail(email);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        setToken(null);
        setUserId(null);
        setEmail(null);
    };

    return (
        <BrowserRouter>
            <React.Fragment>
                <AuthContext.Provider
                    value={{
                        token: token,
                        userId: userId,
                        email: email,
                        login: login,
                        logout: logout
                    }}
                >
                    <ListsContext.Provider
                        value={{
                            listsOption: listsOption,
                            setListsOption: setListsOption,
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MainNavigation />
                                <main className="main-content">
                                    <Routes>
                                        <Route path="/auth" element={<AuthPage />} />
                                        <Route path="/tasks" element={<TasksPage />} />
                                        <Route path="/statistics" element={<StatisticsPage />} />
                                        <Route path="/settings" element={<SettingsPage />} />
                                        <Route path="/confirm/:emailToken" element={<ConfirmPage />} />
                                        <Route path="/reset" element={<ResetPasswordEmailPage />} />
                                        <Route path="/resetPassword/:emailToken" element={<ResetPasswordPage />} />
                                        <Route path="/" element={<Navigate to="/tasks" replace />} />
                                        {/* In v6, multiple routes matching the same path are not allowed in the same Switch-like way, 
                                            but Navigate handles the redirect. */}
                                    </Routes>
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
