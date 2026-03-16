/* ----------------------------------------------------
React.js / Main App.js

Updated: 06/19/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

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

class App extends Component {
    state = {
        token: 'local',
        userId: 'local',
        listsOption: null,
        email: null,
    }

    // componentDidMount() executes when the page loads = is invoked immediately
    // after a component is mounted (inserted into the tree).
    componentDidMount() {
        // Local state is already set to 'local' for skipping auth
        console.log("ComponentDidMount: using local session");
    }

    refreshToken = () => {
        return Promise.resolve(true);
    };

    login = (token, userId, _, email) => {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("email", JSON.stringify(email));
        this.setState({token: token, userId: userId, email: email});
    }

    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email")
        this.setState({token: null, userId: null});
    }

    setListsOption = (option) => {
        this.setState({listsOption: option});
    }
    // componentWillUnmount() is invoked immediately before a component is unmounted
    // and destroyed. Perform any necessary cleanup in this method, such as
    // invalidating timers, canceling network requests, or cleaning up any
    // subscriptions that were created in componentDidMount().
    // componentWillUnmount() {

    // }

    render() {
        console.log('App component rendering...');
        return (
            <BrowserRouter>
                <React.Fragment>
                <ThemeProvider theme={theme}>
                    <AuthContext.Provider
                        value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        email: this.state.email,
                        login: this.login,
                        logout: this.logout
                    }}>
                        <ListsContext.Provider value={{
                            listsOption: this.state.listsOption,
                            setListsOption: this.setListsOption ,
                        }}>
                        <MainNavigation/>
                        <main className="main-content">
                            <Switch>
                                <Redirect from="/" to="/tasks" exact/>
                                <Redirect from="/auth" to="/tasks" exact/>
                                <Route path="/tasks" component={TasksPage}/>
                                <Route path="/statistics" component={StatisticsPage}/>
                                <Route path="/settings" component={SettingsPage}/>
                                <Route path="/confirm/:emailToken" component={ConfirmPage}/>
                                <Route path="/resetPassword" component={ResetPasswordEmailPage} exact/>
                                <Route path="/resetPassword/:emailToken" component={ResetPasswordPage}/>
                                <Redirect to="/tasks"/>
                            </Switch>
                        </main>
                        </ListsContext.Provider>
                    </AuthContext.Provider>
                    </ThemeProvider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
