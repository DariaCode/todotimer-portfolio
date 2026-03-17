import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/auth-context';

import { styled } from '@mui/material/styles';
import { UI_SPACING_DEFAULT, UI_SPACING_LARGE } from '../utils/constants';
import { type Task, generateTaskId, parseRepeatData } from '../utils/taskUtils';
import EditTaskModal from '../components/Modal/EditTaskModal';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Lists from '../components/Tasks/TaskList/Lists';
import AddTask from '../components/Tasks/AddTask/AddTask';
import PriorityPopper from '../components/Tasks/AddTask/Popper/Popper';
import DatePicker from '../components/Tasks/AddTask/Pickers/DatePicker';
import RepeatTask from '../components/Tasks/AddTask/Repeat/Repeat';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';

const RootBox = styled(Box)(() => ({
  display: 'flex',
  paddingTop: '64px',
  flexDirection: 'column',
}));

const TaskViewBox = styled(Box)(({ theme }) => ({
  maxWidth: '60vw',
  padding: theme.spacing(UI_SPACING_DEFAULT, 1),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100vw',
  },
}));

const AddTaskIconsBox = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

const SpinnerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.spacing(UI_SPACING_LARGE),
}));

const TaskEditBox = styled('form')(() => ({
  display: 'flex',
}));

const TasksPage: React.FC = () => {
  const context = useContext(AuthContext);

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<string | null>(null);

  const titleElRef = useRef<HTMLInputElement>(null);
  const priorityElRef = useRef<HTMLButtonElement>(null);
  const dateElRef = useRef<HTMLButtonElement>(null);
  const dateRepeatElRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let isActive = true;

    const fetchTasks = () => {
      setIsLoading(true);
      const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      if (isActive) {
        setTasks(savedTasks);
        setIsLoading(false);
      }
    };

    fetchTasks();

    return () => {
      isActive = false;
    };
  }, []);

  const startCreateTaskHandler = () => {
    setCreating(true);
  };

  /**
   * Extracts raw values from form refs.
   */
  const getRawFormData = () => ({
    title: titleElRef.current?.value || '',
    priority: +(priorityElRef.current?.value || 0),
    repeatValue: dateRepeatElRef.current?.value || '',
    dateValue: dateElRef.current?.value || '',
  });

  /**
   * Processes the form refs to create or update a task data object.
   * @returns {Object} Extracted task data
   */
  const getTaskData = () => {
    const { title, priority, repeatValue, dateValue } = getRawFormData();
    const repeat = parseRepeatData(repeatValue);

    const baseData = { title, priority };
    const repeatData = repeat
      ? {
          date: repeat.date,
          start: repeat.start,
          end: repeat.end,
          intervalK: repeat.intervalK,
          intervalN: repeat.intervalN,
        }
      : {
          date: dateValue || null,
          start: null,
          end: null,
          intervalK: null,
          intervalN: null,
        };

    return { ...baseData, ...repeatData };
  };

  /**
   * Handles task creation from the add task modal.
   */
  const modalConfirmHandler = () => {
    setCreating(false);
    const data = getTaskData();

    if (!data.title.trim() || data.priority <= 0) return;

    const newTask: Task = {
      ...data,
      _id: generateTaskId(),
      complete: false,
      creator: { _id: 'local' },
    };

    const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
    localStorage.setItem('tasks', JSON.stringify([...saved, newTask]));

    setTasks((prev) => [...prev, newTask]);
    if (titleElRef.current) {
      titleElRef.current.value = '';
    }
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setUpdating(false);
    setUpdatedTask(null);
  };

  const startEditTaskHandler = (taskId: string) => {
    setUpdating(true);
    setUpdatedTask(taskId);
  };

  /**
   * Handles task updates from the edit task modal.
   */
  const editTaskHandler = () => {
    if (!updatedTask) return;
    setUpdating(false);
    const data = getTaskData();

    const saved: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const idx = saved.findIndex((t) => t._id === updatedTask);

    if (idx !== -1) {
      saved[idx] = { ...saved[idx], ...data };
      localStorage.setItem('tasks', JSON.stringify(saved));
      setTasks((prev) => prev.map((t) => (t._id === updatedTask ? { ...t, ...data } : t)));
    }
    setUpdatedTask(null);
  };

  const completeTaskHandler = (taskId: string) => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = savedTasks.findIndex((task) => task._id === taskId);
    if (taskIndex !== -1) {
      savedTasks[taskIndex].complete = !savedTasks[taskIndex].complete;
    }
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    setTasks((prevTasks) => {
      const updatedTasksList = [...prevTasks];
      const idx = updatedTasksList.findIndex((task) => task._id === taskId);
      if (idx !== -1) {
        updatedTasksList[idx] = {
          ...updatedTasksList[idx],
          complete: !updatedTasksList[idx].complete,
        };
      }
      return updatedTasksList;
    });
  };

  const deleteTaskHandler = (taskId: string) => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]').filter(
      (task) => task._id !== taskId
    );
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <React.Fragment>
      <RootBox>
        <CssBaseline />
        <Container maxWidth='sm'>
          <TaskViewBox>
            <TextField
              id='outlined-basic'
              label='Add task'
              variant='outlined'
              size='medium'
              multiline
              fullWidth
              inputRef={titleElRef}
              onClick={startCreateTaskHandler}
            />

            {creating && (
              <AddTask onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
                <AddTaskIconsBox>
                  <PriorityPopper ref={priorityElRef} />
                  <DatePicker ref={dateElRef} />
                  <RepeatTask ref={dateRepeatElRef} />
                </AddTaskIconsBox>
              </AddTask>
            )}

            {isLoading ? (
              <SpinnerBox>
                <CircularProgress color='secondary' />
              </SpinnerBox>
            ) : (
              <Lists
                tasks={tasks}
                authUserIdMain={context.userId || ''}
                onViewDetailMain={(_id: string) => {
                  console.log('View detail:', _id);
                }}
                onDeleteTaskMain={deleteTaskHandler}
                onEditTaskMain={startEditTaskHandler}
                onCompleteTaskMain={completeTaskHandler}
              />
            )}
          </TaskViewBox>
        </Container>

        {updating && updatedTask && (
          <EditTaskModal
            onCancel={modalCancelHandler}
            onConfirm={editTaskHandler}
            confirmText='confirm'
          >
            <TaskEditBox>
              <TextField
                id='outlined-basic-edit'
                label='Edit task'
                variant='outlined'
                size='medium'
                multiline
                fullWidth
                inputRef={titleElRef}
              />
              <PriorityPopper ref={priorityElRef} />
              <DatePicker ref={dateElRef} />
              <RepeatTask ref={dateRepeatElRef} />
              <Box>
                <IconButton onClick={() => deleteTaskHandler(updatedTask)}>
                  <DeleteOutlineIcon color='secondary' />
                </IconButton>
              </Box>
            </TaskEditBox>
          </EditTaskModal>
        )}
      </RootBox>
    </React.Fragment>
  );
};

export default TasksPage;
