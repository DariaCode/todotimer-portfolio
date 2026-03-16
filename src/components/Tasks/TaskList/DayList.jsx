/* ----------------------------------------------------
React.js / Day List component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React from 'react';

import TaskItem from './TaskItem';
import { todayLocalDate, tomorrowLocalDate } from '../../../dateHelpers/dateHelpers';

// Material-UI components (https://mui.com/)
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function DayLists(props) {
  const list = props.tasks.map((task) => {
    return (
      <TaskItem key={task._id}
        taskId={task._id}
        title={task.title}
        priority={task.priority}
        date={task.date}
        complete={task.complete}
        repeat={task.end}
        userId={props.authUserId}
        creatorId={task.creator._id}
        onDetail={props.onViewDetail}
        onDelete={props.onDeleteTask}
        onEdit={props.onEditTask}
        onComplete={props.onCompleteTask} />
    );
  });

  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  const formatedDate = new Date(props.date).toLocaleDateString('en', options);

  let listTitle;

  switch (props.date) {
    case 'Overdue':
      listTitle = 'Overdue';
      break;
    case 'Complete':
      listTitle = 'Complete';
      break;
    case todayLocalDate:
      listTitle = 'Today';
      break;
    case tomorrowLocalDate:
      listTitle = 'Tomorrow';
      break;
    case 'null':
      listTitle = ' ';
      break;
    default:
      listTitle = formatedDate;
  };

  return (
    <Box>
      <List key="DayList" sx={{ padding: 1 }}>
        <Typography sx={{ padding: (theme) => theme.spacing(2, 1, 1, 1), color: 'text.secondary' }}>
          {listTitle}
        </Typography>
        {list}
      </List>
      <Divider />
    </Box>);
};
