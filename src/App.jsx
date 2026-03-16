/* ----------------------------------------------------
React.js / Main App.js

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import TasksPage from './pages/Tasks';
import StatisticsPage from './pages/Statistics';
import SettingsPage from './pages/Settings';
import ConfirmPage from './pages/Confirm';
import ResetPasswordEmailPage from './pages/ResetPasswordEmail';
import ResetPasswordPage from './pages/ResetPassword';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import ListsContext from './context/lists-context';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
    const [listsOption, setListsOption] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        // Local state is already set to 'local' for skipping auth
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

    console.log('App component rendering...');

    return (
        <BrowserRouter>
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <AuthContext.Provider
                        value={{
                            token: token,
                            userId: userId,
                            email: email,
                            login: login,
                            logout: logout
                        }}>
                        <ListsContext.Provider value={{
                            listsOption: listsOption,
                            setListsOption: setListsOption,
                        }}>
                            <MainNavigation />
                            <main className="main-content">
                                <Switch>
                                    <Redirect from="/" to="/tasks" exact />
                                    <Redirect from="/auth" to="/tasks" exact />
                                    <Route path="/tasks" component={TasksPage} />
                                    <Route path="/statistics" component={StatisticsPage} />
                                    <Route path="/settings" component={SettingsPage} />
                                    <Route path="/confirm/:emailToken" component={ConfirmPage} />
                                    <Route path="/resetPassword" component={ResetPasswordEmailPage} exact />
                                    <Route path="/resetPassword/:emailToken" component={ResetPasswordPage} />
                                    <Redirect to="/tasks" />
                                </Switch>
                            </main>
                        </ListsContext.Provider>
                    </AuthContext.Provider>
                </ThemeProvider>
            </React.Fragment>
        </BrowserRouter>
    );
};

export default App;
