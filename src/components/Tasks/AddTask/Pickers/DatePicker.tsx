import React, { useState } from 'react';
import { addDays, startOfToday } from 'date-fns';

// Material-UI components (https://mui.com/)
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface DatePickerProps {
  initialDate?: string | null;
  [key: string]: any;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>((props, ref) => {
  const { initialDate } = props;
  const [selectedDate, setSelectedDate] = useState<string | undefined>(initialDate || undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleDateChange = (date: any) => {
    if (date) {
      const formatDate = new Date(date).toISOString();
      setSelectedDate(formatDate);
    }
  };

  const handleToday = () => {
    const today = startOfToday();
    setSelectedDate(today.toISOString());
  };

  const handleTomorrow = () => {
    const tomorrow = addDays(startOfToday(), 1);
    setSelectedDate(tomorrow.toISOString());
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    setAnchorEl(null);
  };

  const handleOk = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton aria-describedby={id} onClick={handleClick} ref={ref} value={selectedDate}>
        <DateRangeIcon color={selectedDate ? 'primary' : 'inherit'} />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement='bottom-start'
        sx={{ zIndex: (theme) => theme.zIndex.modal + 2 }}
        modifiers={[
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              boundary: 'viewport',
            },
          },
          {
            name: 'flip',
            enabled: true,
          },
        ]}
      >
        <Paper elevation={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 1 }}>
              <Button
                variant='outlined'
                onClick={handleToday}
                color='primary'
                sx={{ minWidth: '121px' }}
              >
                Today
              </Button>
              <Button
                variant='outlined'
                onClick={handleTomorrow}
                color='primary'
                sx={{ minWidth: '121px' }}
              >
                Tomorrow
              </Button>
            </Box>
            <StaticDatePicker
              disablePast
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={handleDateChange}
              slots={{
                actionBar: () => null, // Hide default action bar as we have custom buttons
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 1 }}>
              <Button
                variant='contained'
                onClick={handleOk}
                color='primary'
                sx={{ minWidth: '121px' }}
              >
                Ok
              </Button>
              <Button
                variant='outlined'
                onClick={handleClear}
                color='secondary'
                sx={{ minWidth: '121px' }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Paper>
      </Popper>
    </Box>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
