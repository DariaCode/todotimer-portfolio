import React from 'react';
import { type Task } from '../../utils/taskUtils';
import { formatWithOrdinal, localDates } from '../../utils/dateUtils';
import { DAYS_IN_WEEK, ORDINAL_MOD_HUNDRED } from '../../utils/constants';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { format, parseISO } from 'date-fns';

interface TaskBarChartProps {
  tasks: Task[];
}

/**
 * BarChart component for task statistics.
 */
const TaskBarChart: React.FC<TaskBarChartProps> = ({ tasks }) => {
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

  const barData = [];
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const dateStr = localDates[i];
    const tasksForDay = lists[dateStr] || [];
    const label = formatWithOrdinal(dateStr);

    if (tasksForDay.length === 0) {
      barData.push({ date: label, complete: 0 });
    } else {
      const total = tasksForDay.length;
      const completeCount = tasksForDay.filter((task) => task.complete).length;
      const percentage = Math.floor((completeCount / total) * ORDINAL_MOD_HUNDRED);
      barData.push({ date: label, complete: percentage });
    }
  }

  return (
    <ResponsiveContainer width='95%' height={280}>
      <BarChart
        data={barData}
        barGap={2}
        margin={{ top: 30, right: 0, left: 5, bottom: 30 }}
        barSize={30}
      >
        <XAxis dataKey='date' scale='point' padding={{ left: 10, right: 10 }} />
        <YAxis label='%' />
        <Tooltip />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='complete' fill='#82b5f2' background={{ fill: '#fd76a2' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskBarChart;
