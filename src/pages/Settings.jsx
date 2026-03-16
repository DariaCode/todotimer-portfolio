/* ----------------------------------------------------
React.js / Settings page component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/auth-context";
import DeleteModal from "../components/Modal/DeleteUserModal";

// Material-UI components (https://material-ui.com/).
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

// Style for Material-UI components
const styles = theme => ({
  root: {
    display: "flex",
    paddingTop: "84px",
    paddingLeft: "220px",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      paddingTop: "1px",
      paddingLeft: "1px"
    }
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(2.5)
  },
  gridWrapper: {
    padding: theme.spacing(3)
  },
  typography: {
    display: "flex",
    alignItems: "center"
  },
  form: {
    maxWidth: "350px"
  },
  button: {
    minWidth: "128px",
    margin: theme.spacing(1)
  },
  formButtons: {
    display: "flex",
    justifyContent: "center"
  }
});

const SettingsPage = (props) => {
  const { classes } = props;
  const context = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showSuccessMsgs, setShowSuccessMsgs] = useState(false);
  const [successMsgs, setSuccessMsgs] = useState("");

  const newEmailEl = useRef();
  const confEmailEl = useRef();
  const curPasswordEl = useRef();
  const newPasswordEl = useRef();

  const handleDeleteUser = () => {
    setDeleting(true);
  };

  const closeModal = () => {
    setDeleting(false);
  };

  const handleChangeEmail = () => {
    setChangeEmail(true);
    setChangePassword(false);
  };

  const confirmNewEmail = () => {
    const newEmail = newEmailEl.current.value;
    const confEmail = confEmailEl.current.value;
    const curPassword = curPasswordEl.current.value;

    if (newEmail !== confEmail) {
      setErrorEmail("Your confirmation email doesn't match your new email. Please try again.");
    } else if (newEmail === context.email) {
      setErrorEmail("This email address is already registered.");
    } else if (curPassword.length < 1) {
      setErrorEmail("Please enter your current password.");
    } else {
      setErrorEmail("");
      // Mocking behavioral feedback for standalone local mode
      setSuccessMsgs("Email successfully changed (Saved Locally)!");
      setShowSuccessMsgs(true);
      setChangeEmail(false);
      
      // Update local context
      context.login('local', 'local', 3600, newEmail);
    }
  };

  const confirmNewPassword = () => {
    const curPassword = curPasswordEl.current.value;
    const newPassword = newPasswordEl.current.value;

    if (curPassword.length < 1 || newPassword.length < 1) {
      setErrorPassword("Please fill in both password fields.");
    } else {
      setErrorPassword("");
      setSuccessMsgs("Password successfully changed (Saved Locally)!");
      setShowSuccessMsgs(true);
      setChangePassword(false);
    }
  };

  const handleChangePassword = () => {
    setChangeEmail(false);
    setChangePassword(true);
  };

  const handleCancelForm = () => {
    setChangeEmail(false);
    setChangePassword(false);
    setErrorEmail("");
    setErrorPassword("");
  };

  const handleCloseSnackbar = () => {
    setSuccessMsgs("");
    setShowSuccessMsgs(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" color="primary" gutterBottom>
          Settings
        </Typography>
        {isLoading ? (
          <div className={classes.spinner}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Profile
            </Typography>
            <div className={classes.gridWrapper}>
              <Grid container direction="row" justify="flex-start">
                <Grid item xs={12} lg={2} className={classes.typography}>
                  <Typography>Email</Typography>
                </Grid>
                <Grid item>
                  {changeEmail ? (
                    <Grid className={classes.form}>
                      {errorEmail && (
                        <Alert severity="error">
                          {errorEmail}
                        </Alert>
                      )}
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="new_email"
                        label="New Email"
                        name="new email"
                        autoComplete="New email"
                        type="email"
                        size="small"
                        inputRef={newEmailEl}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="confirm_email"
                        label="Confirm Email"
                        name="comfirm email"
                        autoComplete="Confirm email"
                        type="email"
                        size="small"
                        inputRef={confEmailEl}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="Current Password"
                        type="password"
                        id="current_password"
                        autoComplete="current-password"
                        size="small"
                        inputRef={curPasswordEl}
                      />
                      <Grid className={classes.formButtons}>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="primary"
                          onClick={confirmNewEmail}
                        >
                          Ok
                        </Button>
                        <Button
                          className={classes.button}
                          variant="outlined"
                          color="secondary"
                          onClick={handleCancelForm}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Typography>{context.email || 'local@user.com'}</Typography>
                      <Button
                        color="primary"
                        className={classes.button}
                        onClick={handleChangeEmail}
                      >
                        Change
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid container direction="row" justify="flex-start">
                <Grid item xs={12} lg={2} className={classes.typography}>
                  <Typography>Password</Typography>
                </Grid>
                <Grid item>
                  {changePassword ? (
                    <Grid className={classes.form}>
                      {errorPassword && (
                        <Alert severity="error">
                          {errorPassword}
                        </Alert>
                      )}
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="Current Password"
                        type="password"
                        id="current-password"
                        autoComplete="current-password"
                        size="small"
                        inputRef={curPasswordEl}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="new_password"
                        autoComplete="new-password"
                        size="small"
                        inputRef={newPasswordEl}
                      />
                      <Grid className={classes.formButtons}>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="primary"
                          onClick={confirmNewPassword}
                        >
                          Ok
                        </Button>
                        <Button
                          className={classes.button}
                          variant="outlined"
                          color="secondary"
                          onClick={handleCancelForm}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Typography>●●●●●●</Typography>
                      <Button
                        color="primary"
                        className={classes.button}
                        onClick={handleChangePassword}
                      >
                        Change
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </Button>
              </Grid>
            </div>
          </Paper>
        )}
      </Container>
      {deleting && <DeleteModal onCancel={closeModal} />}
      <Snackbar
        open={showSuccessMsgs}
        autoHideDuration={8000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant="outlined"
          severity="success"
          onClose={handleCloseSnackbar}
        >
          {successMsgs}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withStyles(styles)(SettingsPage);
