import React from 'react';
import { type Task } from '../../utils/taskUtils';
import { formatWithOrdinal, localDates } from '../../utils/dateUtils';
import { DAYS_IN_WEEK } from '../../utils/constants';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { format, parseISO } from 'date-fns';

interface TaskAreaChartProps {
  tasks: Task[];
}

/**
 * AreaChart component for task statistics.
 */
const TaskAreaChart: React.FC<TaskAreaChartProps> = ({ tasks }) => {
  const lists = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (task.date) {
      const formattedDate = format(parseISO(task.date), 'M/d/yyyy');
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(task);
    }
    return acc;
  }, {});

  const areaData = [];
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const dateStr = localDates[i];
    const tasksForDay = lists[dateStr] || [];
    const label = formatWithOrdinal(dateStr);

    if (tasksForDay.length === 0) {
      areaData.push({ date: label, complete: 0, incomplete: 0 });
    } else {
      const total = tasksForDay.length;
      const complete = tasksForDay.filter((task) => task.complete).length;
      const incomplete = total - complete;
      areaData.push({ date: label, complete, incomplete });
    }
  }

  return (
    <ResponsiveContainer width='95%' height={280}>
      <AreaChart data={areaData} margin={{ top: 30, right: 0, left: 5, bottom: 30 }}>
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Area type='monotoneX' dataKey='complete' stackId='1' stroke='#3B8BEB' fill='#3B8BEB' />
        <Area type='monotoneX' dataKey='incomplete' stackId='1' stroke='#FC3C7B' fill='#FC3C7B' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TaskAreaChart;
