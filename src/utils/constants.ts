/**
 * Global Constants for TodoTimer Portfolio
 * Centralizing magic numbers and shared configuration.
 */

// Time Constants (in milliseconds)
export const SECOND_IN_MS = 1000;
export const MINUTE_IN_MS = 60000;
export const HOUR_IN_MS = 3600000;
export const DAY_IN_MS = 86400000;

// Date Logic Boundaries
export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;
export const QUARTER_BASE = 3;

// UI & Layout Constants
export const LIST_INDEX_STATISTICS = 3;
export const LIST_INDEX_SETTINGS = 5;

export const UI_GUTTER_LARGE = 3;
export const UI_SPACING_UNIT = 0.5;
export const UI_SPACING_DEFAULT = 2;
export const UI_SPACING_LARGE = 10;
export const UI_MAX_WIDTH_SIDEBAR = 360; // used in Auth/Responsive layouts
export const UI_GUTTER_BASE = 4.5; // used in task item spacing
export const UI_MENU_ITEM_GUTTER = 46; // used in task item

// Ordinal Logic
export const ORDINAL_MOD_TEN = 10;
export const ORDINAL_MOD_HUNDRED = 100;
export const THREE = 3;
export const ELEVEN = 11;
export const TWELVE = 12;
export const THIRTEEN = 13;
export const FOUR = 4;
export const RADIX_DEFAULT = 10;

// Feedback Timing
export const FEEDBACK_DURATION = 1500;
export const SHORT_FEEDBACK_DURATION = 1000;

// Task List Options
export const LIST_OPTION_ALL = 0;
export const LIST_OPTION_TODAY = 1;
export const LIST_OPTION_WEEK = 2;
export const LIST_OPTION_COMPLETED = 4;

// Task Category Constants
export const TASK_CATEGORY_COMPLETE = 'Complete';
export const TASK_CATEGORY_OVERDUE = 'Overdue';
export const TASK_CATEGORY_NULL = 'null';

// Priority Levels
export const PRIORITY_NORMAL = 1;
export const PRIORITY_LOW = 2;
export const PRIORITY_MEDIUM = 3;
export const PRIORITY_HIGH = 4;
