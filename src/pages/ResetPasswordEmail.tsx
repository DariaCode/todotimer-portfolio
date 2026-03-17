import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SHORT_FEEDBACK_DURATION, UI_SPACING_DEFAULT } from '../utils/constants';

// Material-UI components (https://mui.com/)
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ResetPasswordEmailPage: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [showError, _setShowError] = useState('');
  const emailEl = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValue = emailEl.current?.value || '';

    if (emailValue.trim().length === 0) {
      return;
    }

    console.log(`Reset password request submitted for: ${emailValue}`);

    setTimeout(() => {
      setIsSent(true);
      setEmail(emailValue);
      console.log('Reset email sent (local mock)');
    }, SHORT_FEEDBACK_DURATION);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '92vh',
      }}
    >
      <CssBaseline />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {!isSent ? (
            <Box component='form' sx={{ width: '100%', marginTop: 1 }} onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                type='email'
                inputRef={emailEl}
              />
              {showError && (
                <Alert severity='error' sx={{ mt: 1 }}>
                  {showError}
                </Alert>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{ margin: (theme) => theme.spacing(UI_SPACING_DEFAULT, 0, 2) }}
              >
                Reset Password
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                component={Link}
                to='/'
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                Go to Homepage
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography
                component='h2'
                variant='h5'
                color='primary'
                sx={{ paddingTop: 5.5, paddingBottom: 5.5 }}
                gutterBottom
              >
                An email with further instructions has been sent to {email}. Please check.
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                component={Link}
                to='/'
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  margin: (theme) => theme.spacing(UI_SPACING_DEFAULT, 0, 2),
                }}
              >
                Go to Homepage
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPasswordEmailPage;
