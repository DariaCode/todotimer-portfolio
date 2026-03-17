import { addDays, subDays } from 'date-fns';
import { type Task, generateTaskId } from './taskUtils';
import { today, tomorrow, week } from './dateUtils';

const YESTERDAY_OFFSET = 1;
const TWO_DAYS_AGO_OFFSET = 2;
const IN_THREE_DAYS_OFFSET = 3;

const yesterday = subDays(new Date(), YESTERDAY_OFFSET).toISOString();
const twoDaysAgo = subDays(new Date(), TWO_DAYS_AGO_OFFSET).toISOString();
const inThreeDays = addDays(new Date(), IN_THREE_DAYS_OFFSET).toISOString();

export const EXAMPLE_TASKS: Task[] = [
  {
    _id: generateTaskId(),
    title: 'Feed the cat 🐱',
    priority: 3,
    date: today,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Clean the living room',
    priority: 2,
    date: today,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Grocery shopping 🥦',
    priority: 2,
    date: tomorrow,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Reply to urgent emails 📧',
    priority: 3,
    date: yesterday,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: '30 min morning run',
    priority: 2,
    date: today,
    complete: true,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Read 20 pages of a book 📚',
    priority: 1,
    date: null,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Do the laundry',
    priority: 1,
    date: twoDaysAgo,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Dentist appointment 🦷',
    priority: 3,
    date: inThreeDays,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Water the plants 💧',
    priority: 1,
    date: today,
    complete: true,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Wash the car',
    priority: 1,
    date: week,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Plan Friday dinner 🍕',
    priority: 2,
    date: null,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
  {
    _id: generateTaskId(),
    title: 'Take out the trash',
    priority: 2,
    date: today,
    complete: false,
    start: null,
    end: null,
    intervalK: null,
    intervalN: null,
    creator: { _id: 'local' },
  },
];

const SEED_VERSION = 3;

export const initializeLocalTasks = () => {
  const existingTasks = localStorage.getItem('tasks');
  const currentSeedVersion = parseInt(localStorage.getItem('tasks_seed_version') || '0', 10);

  const needsUpdate =
    !existingTasks || JSON.parse(existingTasks).length === 0 || currentSeedVersion < SEED_VERSION;

  if (needsUpdate) {
    console.log(`Seeding example tasks into local storage (version ${SEED_VERSION})...`);
    localStorage.setItem('tasks', JSON.stringify(EXAMPLE_TASKS));
    localStorage.setItem('tasks_seed_version', SEED_VERSION.toString());
  }
};
