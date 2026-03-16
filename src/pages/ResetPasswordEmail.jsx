/* eslint-disable require-jsdoc */
/* ----------------------------------------------------
React.js / Reset Password Email page component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Material-UI components (https://material-ui.com/)
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Style for Material-UI components
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '92vh',
  },
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

const ResetPasswordEmailPage = (props) => {
  const { classes } = props;
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState('');
  const emailEl = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValue = emailEl.current.value;

    if (emailValue.trim().length === 0) {
      return;
    }

    // Mocking behavioral feedback for standalone local mode
    console.log(`Reset password request submitted for: ${emailValue}`);
    
    // Simulate a short loading delay
    setTimeout(() => {
        setIsSent(true);
        setEmail(emailValue);
        console.log("Reset email sent (local mock)");
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
          {!isSent ? (
            <form className={classes.form} onSubmit={handleSubmit}>
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
                Reset Password
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth >
                <Link className={classes.link} to='/'>Go to Homepage</Link>
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
                An email with further instructions has been sent to {email}. Please check.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.submit}>
                <Link className={classes.link} to='/'>Go to Homepage</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default withStyles(styles)(ResetPasswordEmailPage);
