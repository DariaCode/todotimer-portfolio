/* ----------------------------------------------------
React.js / Email confirmation page

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Material-UI components (https://material-ui.com/)
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

// Material-UI components (https://material-ui.com/)
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

// Style for Material-UI components
const styles = (theme) => ({
    root: {
        display: 'flex',
        paddingTop: '124px',
        flexDirection: 'column',
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(5.5)
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(10)
    },
    icon: {
        color: green[500],
        fontSize: 50
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

const ConfirmPage = (props) => {
    const { classes } = props;
    const { emailToken } = useParams();
    const [confirming, setConfirming] = useState(true);

    useEffect(() => {
        // Mocking the email confirmation process for standalone local mode
        console.log(`Confirming email with token: ${emailToken}`);
        
        const timer = setTimeout(() => {
            setConfirming(false);
            console.log("Email confirmed (local mock)");
        }, 1500);

        return () => clearTimeout(timer);
    }, [emailToken]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth="md">
                {confirming ? (
                    <div className={classes.spinner}>
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <Paper className={classes.paper}>
                        <CheckCircleOutlineIcon className={classes.icon} />
                        <Typography
                            component="h2"
                            variant="h5"
                            color="primary"
                            className={classes.text}
                            gutterBottom>
                            Your email has been confirmed!
                        </Typography>
                        <Button variant="outlined" color="primary">
                            <Link className={classes.link} to='/'>Go to Homepage</Link>
                        </Button>
                    </Paper>
                )}
            </Container>
        </div>
    );
};

export default withStyles(styles)(ConfirmPage);
