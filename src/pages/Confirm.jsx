import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  SHORT_FEEDBACK_DURATION,
  UI_SPACING_DEFAULT,
  UI_SPACING_LARGE,
} from '../utils/constants';

// Material-UI components (https://mui.com/)
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';

const ConfirmPage = () => {
  const { emailToken } = useParams();
  const [confirming, setConfirming] = useState(true);

  useEffect(() => {
    // Mocking the email confirmation process for standalone local mode
    console.log(`Confirming email with token: ${emailToken}`);

    const timer = setTimeout(() => {
      setConfirming(false);
      console.log('Email confirmed (local mock)');
    }, SHORT_FEEDBACK_DURATION);

    return () => clearTimeout(timer);
  }, [emailToken]);

  return (
    <Box sx={{
      display: 'flex',
      paddingTop: '124px',
      flexDirection: 'column',
    }}>
      <CssBaseline />
      <Container maxWidth='md'>
        {confirming ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: UI_SPACING_LARGE,
          }}>
            <CircularProgress color='secondary' />
          </Box>
        ) : (
          <Paper sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: UI_SPACING_LARGE,
          }}>
            <CheckCircleOutlineIcon sx={{ color: green[500], fontSize: 50 }} />
            <Typography
              component='h2'
              variant='h5'
              color='primary'
              sx={{ paddingTop: UI_SPACING_DEFAULT, paddingBottom: UI_SPACING_DEFAULT }}
              gutterBottom>
              Your email has been confirmed!
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              component={Link}
              to='/'
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Go to Homepage
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default ConfirmPage;
