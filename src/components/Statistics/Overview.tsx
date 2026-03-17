import React from 'react';

// Material-UI components (https://mui.com/)
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { UI_SPACING_UNIT } from '../../utils/constants';

interface OverviewProps {
  complete: number;
  incomplete: number;
  overdue: number;
  total: number;
}

/**
 * Overview component for task counts.
 */
const Overview: React.FC<OverviewProps> = ({ complete, incomplete, overdue, total }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          size={{ sm: 6, md: 6, lg: 6 }}
          sx={{ padding: (theme) => theme.spacing(UI_SPACING_UNIT, 0) }}
        >
          <Typography component='h2' variant='h4' color='primary' align='center' gutterBottom>
            {complete}
          </Typography>
          <Typography component='h2' variant='h6' color='text.disabled' align='center' gutterBottom>
            Complete
          </Typography>
          <Divider variant='middle' />
        </Grid>
        <Grid
          size={{ sm: 6, md: 6, lg: 6 }}
          sx={{ padding: (theme) => theme.spacing(UI_SPACING_UNIT, 0) }}
        >
          <Typography component='h2' variant='h4' color='secondary' align='center' gutterBottom>
            {incomplete}
          </Typography>
          <Typography component='h2' variant='h6' color='text.disabled' align='center' gutterBottom>
            Incomplete
          </Typography>
          <Divider variant='middle' />
        </Grid>
        <Grid
          size={{ sm: 6, md: 6, lg: 6 }}
          sx={{ padding: (theme) => theme.spacing(UI_SPACING_UNIT, 0) }}
        >
          <Typography component='h2' variant='h4' color='secondary' align='center' gutterBottom>
            {overdue}
          </Typography>
          <Typography component='h2' variant='h6' color='text.disabled' align='center' gutterBottom>
            Overdue
          </Typography>
        </Grid>
        <Grid
          size={{ sm: 6, md: 6, lg: 6 }}
          sx={{ padding: (theme) => theme.spacing(UI_SPACING_UNIT, 0) }}
        >
          <Typography component='h2' variant='h4' color='primary' align='center' gutterBottom>
            {total}
          </Typography>
          <Typography component='h2' variant='h6' color='text.disabled' align='center' gutterBottom>
            Total
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
