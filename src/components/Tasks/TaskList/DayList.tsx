import React from 'react';
import TaskItem from './TaskItem';
import { todayLocalDate, tomorrowLocalDate } from '../../../utils/dateUtils';
import { type Task } from '../../../utils/taskUtils';

// Material-UI components (https://mui.com/)
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

interface DayListProps {
  date: string;
  tasks: Task[];
  authUserId: string;
  onViewDetail: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

const DayLists: React.FC<DayListProps> = (props) => {
  const { tasks, authUserId, onViewDetail, onDeleteTask, onEditTask, onCompleteTask, date } = props;

  const listItems = tasks.map((task) => {
    return (
      <TaskItem
        key={task._id}
        taskId={task._id}
        title={task.title}
        priority={task.priority}
        date={task.date || ''}
        complete={task.complete}
        repeat={task.intervalK !== null}
        userId={authUserId}
        creatorId={task.creator._id}
        onDetail={onViewDetail}
        onDelete={onDeleteTask}
        onEdit={onEditTask}
        onComplete={onCompleteTask}
      />
    );
  });

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  const formattedDateString = new Date(date).toLocaleDateString('en', options);

  let listTitle: string;

  switch (date) {
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
      listTitle = formattedDateString;
  }

  return (
    <Box>
      <List key='DayList' sx={{ padding: 1 }}>
        <Typography
          sx={{
            padding: (theme) => theme.spacing(2, 1, 1, 1),
            color: 'text.secondary',
          }}
        >
          {listTitle}
        </Typography>
        {listItems}
      </List>
      <Divider />
    </Box>
  );
};

export default DayLists;
