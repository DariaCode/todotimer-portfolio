/* ----------------------------------------------------
React.js / Auth component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import MyDivider from '../components/Social_auth/Divider';

// Material-UI components (https://mui.com/)
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

function Copyright() {
  return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://dariacode.dev/'>
                DariaCode
            </Link>{' '} {new Date().getFullYear()}
            {'.'}
        </Typography>
  );
}

const AuthPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showError, setShowError] = useState('');
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
    context.login('local', 'local', 3600, email);
  };

  return (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '92vh',
        }}>
            <CssBaseline />
            <Container component='main' maxWidth='xs'>
                <Box sx={{
                  marginTop: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                    <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        {isLogin ? 'Login' : 'Signup'}
                    </Typography>
                    <Box component='form' sx={{ width: '100%', marginTop: 1 }} onSubmit={submitHandler}>
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
                            inputRef={emailEl} />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            inputRef={passwordEl} />

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
                            sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}>
                            {isLogin ? 'Login' : 'Signup'}
                        </Button>

                        <MyDivider />

                        <Typography align='center' variant='body2' color='text.secondary' sx={{ margin: '16px 0' }}>
                           Social login is currently disabled in local mode.
                        </Typography>

                        <Grid container justifyContent='center'>
                            <Grid size='grow'>
                                <Link
                                    onClick={() => navigate('/reset')}
                                    variant='body2'
                                    sx={{ cursor: 'pointer' }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid>
                                <Link
                                    sx={{ cursor: 'pointer' }}
                                    onClick={switchModeHandler}
                                    variant='body2'>
                                    {isLogin
                                      ? "Don't have an account? Signup"
                                      : 'Already have an account? Login'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Box component='footer' sx={{ padding: (theme) => theme.spacing(3, 2), marginTop: 'auto' }}>
                <Container maxWidth='sm'>
                    <Copyright />
                </Container>
            </Box>
        </Box>
  );
};

export default AuthPage;
