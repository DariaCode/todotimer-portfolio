import { todayDate } from './dateUtils';

export interface Task {
  _id: string;
  title: string;
  priority: number;
  date: string | null;
  complete: boolean;
  start: string | null;
  end: string | null;
  intervalK: number | null;
  intervalN: string | null;
  creator: { _id: string };
}

export interface TaskRepeatData {
  start: string | null;
  end: string | null;
  intervalK: number | null;
  intervalN: string | null;
  date: string | null;
}

/**
 * Parses the raw repeat data string from the UI.
 * @param rawData The comma-separated repeat data
 * @param radix Radix for parseInt
 * @returns Parsed repeat data or null
 */
export const parseRepeatData = (rawData: string, radix: number = 10): TaskRepeatData | null => {
  const parts = rawData.split(',');
  const MIN_PARTS = 2; // minimum to consider it repeat data

  if (parts.length < MIN_PARTS || !parts[0]) {
    return null;
  }

  try {
    const start = new Date(parts[0]).toISOString();
    const end = parts[1] ? new Date(parts[1]).toISOString() : null;
    const intervalK = parts[2] ? parseInt(parts[2], radix) : null;
    const intervalN = parts[3] || null;

    return {
      start,
      end,
      intervalK,
      intervalN,
      date: start,
    };
  } catch (err) {
    console.error('Error parsing repeat data:', err);
    return null;
  }
};

/**
 * Generates a unique task ID.
 * @returns A unique string
 */
export const generateTaskId = (): string => {
  const BASE_36 = 36;
  const SUBSTR_START = 2;
  return Date.now().toString(BASE_36) + Math.random().toString(BASE_36).substring(SUBSTR_START);
};

export type TaskGroups = Record<string, Task[]>;

/**
 * Categorizes tasks into groups based on their status and date.
 * @param tasks List of tasks
 * @returns Object with tasks grouped by category keys (e.g., 'Complete', 'Overdue', '2026-03-17')
 */
export const groupTasksByCategory = (tasks: Task[]): TaskGroups => {
  return tasks.reduce((groups, task) => {
    let category: string;

    if (task.complete) {
      category = 'Complete';
    } else if (task.date && task.date < todayDate) {
      category = 'Overdue';
    } else if (task.date) {
      // To change dates to local time zone.
      category = new Date(task.date).toLocaleDateString();
    } else {
      category = 'null';
    }

    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {} as TaskGroups);
};
