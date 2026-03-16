/* ----------------------------------------------------
React.js / Auth component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../context/auth-context';
import MyDivider from '../components/Social_auth/Divider';

// Material-UI components (https://material-ui.com/)
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://dariacode.dev/">
                DariaCode
            </Link>{' '} {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Style for Material-UI components
const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '92vh'
    },
    paper: {
        marginTop: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    switch: {
        alignItems: 'center',
        cursor: 'pointer'
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto'
    }
});

const AuthPage = (props) => {
    const { classes } = props;
    const context = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [showError, setShowError] = useState("");
    const emailEl = useRef();
    const passwordEl = useRef();

    const switchModeHandler = () => {
        setIsLogin(prev => !prev);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailEl.current.value;
        const password = passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        // Mocking login for standalone local mode
        console.log(`${isLogin ? 'Login' : 'Signup'} requested for: ${email}`);
        
        // Always succeed with a local token in this mode
        context.login('local', 'local', 3600, email);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isLogin ? "Login" : "Signup"}
                    </Typography>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            inputRef={emailEl} />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordEl} />

                        {showError && (
                            <Alert severity="error">
                                {showError}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            {isLogin ? "Login" : "Signup"}
                        </Button>
                        
                        <MyDivider />
                        
                        <Typography align="center" variant="body2" color="textSecondary" style={{ margin: '16px 0' }}>
                           Social login is currently disabled in local mode.
                        </Typography>

                        <Grid container justify="center">
                            <Grid item xs>
                                <Link onClick={() => window.location.href='/resetPassword'} variant="body2" style={{ cursor: 'pointer' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    className={classes.switch}
                                    onClick={switchModeHandler}
                                    variant="body2">
                                    {isLogin
                                        ? "Don't have an account? Signup"
                                        : "Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
};

AuthPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthPage);