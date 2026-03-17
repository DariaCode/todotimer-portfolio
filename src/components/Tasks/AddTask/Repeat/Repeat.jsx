import React, { useState } from 'react';
import { RADIX_DEFAULT } from '../../../utils/constants';

// Material-UI components (https://mui.com/)
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Icons
import LoopIcon from '@mui/icons-material/Loop';

const RepeatTask = React.forwardRef((props, ref) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date().toISOString());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date().toISOString());
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateArray, setDateArray] = useState();
  const [frequencyK, setFrequencyK] = useState(1);
  const [frequencyN, setFrequencyN] = useState('day');
  const [custom, setCustom] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'repeat-popper' : undefined;

  const handleStartDateChange = (date) => {
    if (date) {
      setSelectedStartDate(new Date(date).toISOString());
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      setSelectedEndDate(new Date(date).toISOString());
    }
  };

  const handleQuickRepeat = (unit) => {
    const dateArr = [selectedStartDate, selectedEndDate, 1, unit];
    setDateArray(dateArr);
    setAnchorEl(null);
  };

  const handleCustom = () => {
    setCustom(!custom);
  };

  const handleFrequencyK = (event) => {
    setDateArray([]);
    setFrequencyK(parseInt(event.target.value, RADIX_DEFAULT));
  };

  const handleFrequencyN = (event) => {
    setDateArray([]);
    setFrequencyN(event.target.value);
  };

  const handleClear = () => {
    setSelectedStartDate(new Date().toISOString());
    setSelectedEndDate(new Date().toISOString());
    setDateArray(undefined);
    setFrequencyK(1);
    setFrequencyN('day');
    setCustom(false);
    setAnchorEl(null);
  };

  const handleOk = () => {
    const dateArr = [selectedStartDate, selectedEndDate, frequencyK, frequencyN];
    setDateArray(dateArr);
    setCustom(false);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'inline-block' }}>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        ref={ref}
        value={dateArray}
      >
        <LoopIcon color={dateArray ? 'primary' : 'inherit'} />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 2 }}
      >
        <Paper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, gap: 1 }}>
              <DatePicker
                label='Start'
                value={new Date(selectedStartDate)}
                onChange={handleStartDateChange}
                slotProps={{ textField: { variant: 'outlined', fullWidth: true } }}
              />
              <DatePicker
                label='End by'
                value={new Date(selectedEndDate)}
                onChange={handleEndDateChange}
                slotProps={{ textField: { variant: 'outlined', fullWidth: true } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 1 }}>
                <Button variant='outlined' onClick={() => handleQuickRepeat('day')} color='primary' sx={{ minWidth: 121 }}>
                  Daily
                </Button>
                <Button variant='outlined' onClick={() => handleQuickRepeat('week')} color='primary' sx={{ minWidth: 121 }}>
                  Weekly
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 1 }}>
                <Button variant='outlined' onClick={() => handleQuickRepeat('month')} color='primary' sx={{ minWidth: 121 }}>
                  Monthly
                </Button>
                <Button variant='outlined' onClick={() => handleQuickRepeat('year')} color='primary' sx={{ minWidth: 121 }}>
                  Yearly
                </Button>
              </Box>
              <Button variant='outlined' onClick={handleCustom} color='primary' sx={{ minWidth: 121 }}>
                  Set Custom
              </Button>
              {custom && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      label='Every'
                      type='number'
                      value={frequencyK}
                      onChange={handleFrequencyK}
                      variant='outlined'
                      sx={{ maxWidth: 121 }}
                    />
                    <FormControl variant='outlined' sx={{ minWidth: 121 }}>
                      <InputLabel>Set Repeat</InputLabel>
                      <Select
                        value={frequencyN}
                        onChange={handleFrequencyN}
                        label='Set Repeat'
                      >
                        <MenuItem value={'day'}>Day</MenuItem>
                        <MenuItem value={'week'}>Week</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                        <MenuItem value={'year'}>Year</MenuItem>
                      </Select>
                    </FormControl>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 1 }}>
                <Button onClick={handleOk} variant='contained' color='primary' sx={{ minWidth: 121 }}>
                  Ok
                </Button>
                <Button onClick={handleClear} variant='outlined' color='secondary' sx={{ minWidth: 121 }}>
                  Clear
                </Button>
              </Box>
            </Box>
        </Paper>
      </Popper>
    </Box>
  );
});

export default RepeatTask;
