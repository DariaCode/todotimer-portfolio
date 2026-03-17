/* ----------------------------------------------------
React.js / Divider component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

// Material-UI components (https://mui.com/)
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MyDivider() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Divider
        sx={{ height: '1px', width: '150px' }}
        variant='middle'
        component='div'/>
      <Typography
        color='primary'
        align= 'center'
        sx={{ mx: 1 }}
      >OR</Typography>
      <Divider
        sx={{ height: '1px', width: '150px' }}
        variant='middle'
        component='div'/>
    </Box>
  );
};
