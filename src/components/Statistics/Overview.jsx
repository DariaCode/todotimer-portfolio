/* ----------------------------------------------------
React.js / Statistics overview component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

// Material-UI components (https://mui.com/)
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function Overview(props) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ sm: 6, md: 6, lg: 6 }} sx={{ padding: (theme) => theme.spacing(0.5, 0) }}>
          <Typography
            component='h2'
            variant='h4'
            color='primary'
            align='center'
            gutterBottom>
            {props.complete}
          </Typography>
          <Typography
            component='h2'
            variant='h6'
            color='text.disabled'
            align='center'
            gutterBottom>
          Complete
          </Typography>
          <Divider variant='middle'/>
        </Grid>
        <Grid size={{ sm: 6, md: 6, lg: 6 }} sx={{ padding: (theme) => theme.spacing(0.5, 0) }}>
          <Typography
            component='h2'
            variant='h4'
            color='secondary'
            align='center'
            gutterBottom>
            {props.incomplete}
          </Typography>
          <Typography
            component='h2'
            variant='h6'
            color='text.disabled'
            align='center'
            gutterBottom>
          Incomplete
          </Typography>
          <Divider variant='middle'/>
        </Grid>
        <Grid size={{ sm: 6, md: 6, lg: 6 }} sx={{ padding: (theme) => theme.spacing(0.5, 0) }}>
          <Typography
            component='h2'
            variant='h4'
            color='secondary'
            align='center'
            gutterBottom>
            {props.overdue}
          </Typography>
          <Typography
            component='h2'
            variant='h6'
            color='text.disabled'
            align='center'
            gutterBottom>
          Overdue
          </Typography>
        </Grid>
        <Grid size={{ sm: 6, md: 6, lg: 6 }} sx={{ padding: (theme) => theme.spacing(0.5, 0) }}>
          <Typography
            component='h2'
            variant='h4'
            color='primary'
            align='center'
            gutterBottom>
            {props.total}
          </Typography>
          <Typography
            component='h2'
            variant='h6'
            color='text.disabled'
            align='center'
            gutterBottom>
          Total
          </Typography>
        </Grid>
      </Grid>
    </Box>);
}
