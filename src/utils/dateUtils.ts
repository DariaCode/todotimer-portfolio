import { addDays, format, subDays } from 'date-fns';
import {
  DAYS_IN_WEEK,
  ELEVEN,
  ORDINAL_MOD_HUNDRED,
  ORDINAL_MOD_TEN,
  THIRTEEN,
  THREE,
  TWELVE,
} from './constants';

/**
 * Gets the ordinal suffix for a day of the month.
 * @param day Day of the month (1-31)
 * @returns The ordinal suffix (st, nd, rd, or th)
 */
const getOrdinal = (day: number): string => {
  const lastDigit = day % ORDINAL_MOD_TEN;
  const lastTwoDigits = day % ORDINAL_MOD_HUNDRED;

  if (lastDigit === 1 && lastTwoDigits !== ELEVEN) return 'st';
  if (lastDigit === 2 && lastTwoDigits !== TWELVE) return 'nd';
  if (lastDigit === THREE && lastTwoDigits !== THIRTEEN) return 'rd';
  return 'th';
};

/**
 * Formats a date with its day-of-month ordinal.
 * @param date The date to format
 * @returns Formatted date like "17th"
 */
const formatWithOrdinal = (date: Date | string): string => {
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

const weekDateObj = addDays(now, DAYS_IN_WEEK);
const week = weekDateObj.toISOString();
const weekDate = format(weekDateObj, 'yyyy-MM-dd');
const weekLocalDate = format(weekDateObj, 'M/d/yyyy');

// Last 7 days including today
const localDateArr: string[] = [];
for (let i = 0; i < DAYS_IN_WEEK; i++) {
  const day = subDays(now, i);
  localDateArr.push(format(day, 'M/d/yyyy'));
}

const localDates = localDateArr.reverse();

export {
  today,
  todayDate,
  todayLocalDate,
  tomorrow,
  tomorrowDate,
  tomorrowLocalDate,
  week,
  weekDate,
  weekLocalDate,
  localDates,
  getOrdinal,
  formatWithOrdinal,
};
