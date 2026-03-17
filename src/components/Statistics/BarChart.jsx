/* ----------------------------------------------------
React.js / Statistics barchart component

Updated: 05/10/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

import { formatWithOrdinal, localDates } from '../../utils/dateUtils';

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

// eslint-disable-next-line require-jsdoc
export default function Overview(props) {
  console.log('barChart', props.tasks);

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
  for (let i = 0; i < 7; i++) {
    const dateStr = localDates[i];
    const tasksForDay = lists[dateStr] || [];

    // Use centralized helper for the label (e.g., 17th)
    const label = formatWithOrdinal(dateStr);

    if (tasksForDay.length === 0) {
      barData.push({ date: label, complete: 0 });
    } else {
      const total = tasksForDay.length;
      const completeCount = tasksForDay.filter(task => task.complete).length;
      const percentage = Math.floor((completeCount / total) * 100);
      barData.push({ date: label, complete: percentage });
    }
  }
  console.log('barData', barData);

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
