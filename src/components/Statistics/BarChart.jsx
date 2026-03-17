import { formatWithOrdinal, localDates } from '../../utils/dateUtils';
import { DAYS_IN_WEEK, ORDINAL_MOD_HUNDRED } from '../../utils/constants';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { format, parseISO } from 'date-fns';

/**
 * BarChart component for task statistics.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} The rendered BarChart.
 */
export default function Overview(props) {
  // Divide tasks according to their date and completed status.
  const lists = props.tasks.reduce((acc, task) => {
    if (task.date) {
      // Use consistent date-fns formatting for grouping
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

    // Use centralized helper for the label (e.g., 17th)
    const label = formatWithOrdinal(dateStr);

    if (tasksForDay.length === 0) {
      barData.push({ date: label, complete: 0 });
    } else {
      const total = tasksForDay.length;
      const completeCount = tasksForDay.filter(task => task.complete).length;
      const percentage = Math.floor((completeCount / total) * ORDINAL_MOD_HUNDRED);
      barData.push({ date: label, complete: percentage });
    }
  }

  return (
    <ResponsiveContainer width='95%' height={280}>
      <BarChart
        data={barData}
        barGap={2}
        margin={{
          top: 30,
          right: 0,
          left: 5,
          bottom: 30,
        }}
        barSize={30}>
        <XAxis
          dataKey='date'
          scale='point'
          padding={{
            left: 10,
            right: 10,
          }}/>
        <YAxis label='%'/>
        <Tooltip/>
        <CartesianGrid strokeDasharray='3 3'/>
        <Bar
          dataKey='complete'
          fill='#82b5f2'
          background={{
            fill: '#fd76a2',
          }}/>
      </BarChart>
    </ResponsiveContainer>);
}
