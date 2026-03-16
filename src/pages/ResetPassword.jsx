/* ----------------------------------------------------
React.js / Reset Password page component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Material-UI components (https://material-ui.com/)
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    text: {
        paddingTop: theme.spacing(5.5),
        paddingBottom: theme.spacing(5.5)
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    }
});

const ResetPasswordPage = (props) => {
    const { classes } = props;
    const { emailToken } = useParams();
    const [isReset, setIsReset] = useState(false);
    const [email, setEmail] = useState('');
    const passwordEl = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const passwordValue = passwordEl.current.value;

        if (passwordValue.trim().length === 0) {
            return;
        }

        // Mocking behavioral feedback for standalone local mode
        console.log(`Resetting password with token: ${emailToken}`);
        
        setTimeout(() => {
            setIsReset(true);
            setEmail('local@user.com'); // Mocked email response
            console.log("Password reset (local mock)");
        }, 1000);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    {!isReset ? (
                        <form className={classes.form} onSubmit={handleSubmit}>
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                Reset Password
                            </Button>
                        </form>
                    ) : (
                        <div>
                            <Typography
                                component="h2"
                                variant="h5"
                                color="primary"
                                className={classes.text}
                                gutterBottom>
                                Password for {email} has been successfully reset.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                className={classes.submit}>
                                <Link className={classes.link} to='/'>
                                    Go to Homepage
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default withStyles(styles)(ResetPasswordPage);
