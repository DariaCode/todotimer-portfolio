/* ----------------------------------------------------
React.js / Reset Password page component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// Material-UI components (https://mui.com/)
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ResetPasswordPage = () => {
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

        console.log(`Resetting password with token: ${emailToken}`);
        
        setTimeout(() => {
            setIsReset(true);
            setEmail('local@user.com'); // Mocked email response
            console.log("Password reset (local mock)");
        }, 1000);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '92vh' 
        }}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box sx={{ 
                    marginTop: 14, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                }}>
                    <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    {!isReset ? (
                        <Box component="form" sx={{ width: '100%', marginTop: 1 }} onSubmit={handleSubmit}>
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
                                sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}>
                                Reset Password
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Typography
                                component="h2"
                                variant="h5"
                                color="primary"
                                sx={{ paddingTop: 5.5, paddingBottom: 5.5 }}
                                gutterBottom>
                                Password for {email} has been successfully reset.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                component={Link}
                                to="/"
                                sx={{ textDecoration: 'none', color: 'inherit', margin: (theme) => theme.spacing(3, 0, 2) }}
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

export default ResetPasswordPage;
