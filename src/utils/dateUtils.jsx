import { format, addDays, subDays } from 'date-fns';

/**
 * Gets the ordinal suffix for a day of the month.
 * @param {number} day Day of the month (1-31)
 * @returns {string} The ordinal suffix (st, nd, rd, or th)
 */
const getOrdinal = (day) => {
  const lastDigit = day % 10;
  const lastTwoDigits = day % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) return 'st';
  if (lastDigit === 2 && lastTwoDigits !== 12) return 'nd';
  if (lastDigit === 3 && lastTwoDigits !== 13) return 'rd';
  return 'th';
};

/**
 * Formats a date with its day-of-month ordinal.
 * @param {Date|string} date The date to format
 * @returns {string} Formatted date like "17th"
 */
const formatWithOrdinal = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  return `${day}${getOrdinal(day)}`;
};

// Use a consistent starting point for "today"
const now = new Date();
const today = now.toISOString();

// "2020-05-08"
const todayDate = format(now, 'yyyy-MM-dd');

// "5/8/2020"
const todayLocalDate = format(now, 'M/d/yyyy');

const tomorrowDateObj = addDays(now, 1);
const tomorrow = tomorrowDateObj.toISOString();
const tomorrowDate = format(tomorrowDateObj, 'yyyy-MM-dd');
const tomorrowLocalDate = format(tomorrowDateObj, 'M/d/yyyy');

const weekDateObj = addDays(now, 7);
const week = weekDateObj.toISOString();
const weekDate = format(weekDateObj, 'yyyy-MM-dd');
const weekLocalDate = format(weekDateObj, 'M/d/yyyy');

// Last 7 days including today
const localDateArr = [];
for (let i = 0; i < 7; i++) {
  const day = subDays(now, i);
  localDateArr.push(format(day, 'M/d/yyyy'));
}

const localDates = localDateArr.reverse();

export {
  today, todayDate, todayLocalDate, 
  tomorrow, tomorrowDate, tomorrowLocalDate, 
  week, weekDate, weekLocalDate,
  localDates,
  getOrdinal,
  formatWithOrdinal
};
