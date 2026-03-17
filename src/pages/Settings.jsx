import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../context/auth-context';
import DeleteModal from '../components/Modal/DeleteUserModal';
import { HOUR_IN_MS } from '../utils/constants';

// Material-UI components (https://mui.com/).
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';

const SettingsPage = () => {
  const context = useContext(AuthContext);

  const [isLoading, _setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showSuccessMsgs, setShowSuccessMsgs] = useState(false);
  const [successMsgs, setSuccessMsgs] = useState('');

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
      setErrorEmail('This email address is already registered.');
    } else if (curPassword.length < 1) {
      setErrorEmail('Please enter your current password.');
    } else {
      setErrorEmail('');
      setSuccessMsgs('Email successfully changed (Saved Locally)!');
      setShowSuccessMsgs(true);
      setChangeEmail(false);
      context.login('local', 'local', HOUR_IN_MS, newEmail);
    }
  };

  const confirmNewPassword = () => {
    const curPassword = curPasswordEl.current.value;
    const newPassword = newPasswordEl.current.value;

    if (curPassword.length < 1 || newPassword.length < 1) {
      setErrorPassword('Please fill in both password fields.');
    } else {
      setErrorPassword('');
      setSuccessMsgs('Password successfully changed (Saved Locally)!');
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
    setErrorEmail('');
    setErrorPassword('');
  };

  const handleCloseSnackbar = () => {
    setSuccessMsgs('');
    setShowSuccessMsgs(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      paddingTop: { xs: '1px', md: '84px' },
      paddingLeft: { xs: '1px', md: '220px' },
      flexDirection: 'column',
    }}>
      <CssBaseline />
      <Container maxWidth='md'>
        <Typography component='h1' variant='h4' color='primary' gutterBottom>
          Settings
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
            <CircularProgress color='secondary' />
          </Box>
        ) : (
          <Paper sx={{ padding: 2.5 }}>
            <Typography component='h2' variant='h6' color='primary' gutterBottom>
              Profile
            </Typography>
            <Box sx={{ padding: 3 }}>
              <Grid container direction='row' justifyContent='flex-start' spacing={1}>
                <Grid size={{ xs: 12, lg: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>Email</Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 10 }}>
                  {changeEmail ? (
                    <Box sx={{ maxWidth: '350px' }}>
                      {errorEmail && (
                        <Alert severity='error' sx={{ mb: 1 }}>
                          {errorEmail}
                        </Alert>
                      )}
                      <TextField
                        variant='outlined'
                        margin='dense'
                        required
                        fullWidth
                        label='New Email'
                        type='email'
                        size='small'
                        inputRef={newEmailEl}
                      />
                      <TextField
                        variant='outlined'
                        margin='dense'
                        required
                        fullWidth
                        label='Confirm Email'
                        type='email'
                        size='small'
                        inputRef={confEmailEl}
                      />
                      <TextField
                        variant='outlined'
                        margin='dense'
                        required
                        fullWidth
                        label='Current Password'
                        type='password'
                        size='small'
                        inputRef={curPasswordEl}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={confirmNewEmail}
                          sx={{ minWidth: '128px', m: 1 }}
                        >
                          Ok
                        </Button>
                        <Button
                          variant='outlined'
                          color='secondary'
                          onClick={handleCancelForm}
                          sx={{ minWidth: '128px', m: 1 }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                      <Typography>{context.email || 'local@user.com'}</Typography>
                      <Button
                        color='primary'
                        onClick={handleChangeEmail}
                        sx={{ minWidth: '128px', ml: 1 }}
                      >
                        Change
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='flex-start' spacing={1} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, lg: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>Password</Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 10 }}>
                  {changePassword ? (
                    <Box sx={{ maxWidth: '350px' }}>
                      {errorPassword && (
                        <Alert severity='error' sx={{ mb: 1 }}>
                          {errorPassword}
                        </Alert>
                      )}
                      <TextField
                        variant='outlined'
                        margin='dense'
                        required
                        fullWidth
                        label='Current Password'
                        type='password'
                        size='small'
                        inputRef={curPasswordEl}
                      />
                      <TextField
                        variant='outlined'
                        margin='dense'
                        required
                        fullWidth
                        label='New Password'
                        type='password'
                        size='small'
                        inputRef={newPasswordEl}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={confirmNewPassword}
                          sx={{ minWidth: '128px', m: 1 }}
                        >
                          Ok
                        </Button>
                        <Button
                          variant='outlined'
                          color='secondary'
                          onClick={handleCancelForm}
                          sx={{ minWidth: '128px', m: 1 }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                      <Typography>●●●●●●</Typography>
                      <Button
                        color='primary'
                        onClick={handleChangePassword}
                        sx={{ minWidth: '128px', ml: 1 }}
                      >
                        Change
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={handleDeleteUser}
                  sx={{ minWidth: '128px' }}
                >
                  Delete Account
                </Button>
              </Box>
            </Box>
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
          variant='outlined'
          severity='success'
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          {successMsgs}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
