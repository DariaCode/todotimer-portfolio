/* ----------------------------------------------------
React.js / Tasks page component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/auth-context';

import { styled } from '@mui/material/styles';
import { UI_SPACING_DEFAULT, UI_SPACING_LARGE } from '../utils/constants';
import { generateTaskId, parseRepeatData } from '../utils/taskUtils';
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

const TasksPage = () => {
  const context = useContext(AuthContext);

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(null);

  const titleElRef = useRef();
  const priorityElRef = useRef();
  const dateElRef = useRef();
  const dateRepeatElRef = useRef();

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

  const modalConfirmHandler = () => {
    setCreating(false);
    const title = titleElRef.current.value;
    const priority = +priorityElRef.current.value;
    const repeatData = parseRepeatData(dateRepeatElRef.current.value);

    let start = null;
    let end = null;
    let intervalK = null;
    let intervalN = null;

    if (repeatData) {
      ({ start, end, intervalK, intervalN } = repeatData);
    }

    if (title.trim().length === 0 || priority <= 0) {
      return;
    }

    const newTask = {
      _id: generateTaskId(),
      title,
      priority,
      date: (repeatData?.date || dateElRef.current.value) || null,
      complete: false,
      start: start || null,
      end: end || null,
      intervalK: intervalK || null,
      intervalN: intervalN || null,
      creator: { _id: 'local' },
    };

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    setTasks((prevTasks) => [...prevTasks, newTask]);
    titleElRef.current.value = '';
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setUpdating(false);
    setUpdatedTask(null);
  };

  const startEditTaskHandler = taskId => {
    setUpdating(true);
    setUpdatedTask(taskId);
  };

  const editTaskHandler = () => {
    setUpdating(false);
    const taskId = updatedTask;
    const title = titleElRef.current.value;
    const priority = +priorityElRef.current.value;
    const repeatData = parseRepeatData(dateRepeatElRef.current.value);

    let date = dateElRef.current.value;
    let start = null;
    let end = null;
    let intervalK = null;
    let intervalN = null;

    if (repeatData) {
      ({ start, end, intervalK, intervalN, date } = repeatData);
    }

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = savedTasks.findIndex((task) => task._id === taskId);
    if (taskIndex !== -1) {
      savedTasks[taskIndex] = {
        ...savedTasks[taskIndex],
        title,
        priority,
        date: date || null,
        start: start || null,
        end: end || null,
        intervalK: intervalK || null,
        intervalN: intervalN || null,
      };
    }
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    setTasks((prevTasks) => {
      const updatedTasksList = [...prevTasks];
      const idx = updatedTasksList.findIndex((task) => task._id === taskId);
      if (idx !== -1) {
        updatedTasksList[idx] = {
          ...updatedTasksList[idx],
          title,
          priority,
          date: date || null,
          start: start || null,
          end: end || null,
          intervalK: intervalK || null,
          intervalN: intervalN || null,
        };
      }
      return updatedTasksList;
    });
    setUpdatedTask(null);
  };

  const completeTaskHandler = (taskId) => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskIndex = savedTasks.findIndex(task => task._id === taskId);
    if (taskIndex !== -1) {
      savedTasks[taskIndex].complete = !savedTasks[taskIndex].complete;
    }
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    setTasks(prevTasks => {
      const updatedTasksList = [...prevTasks];
      const idx = updatedTasksList.findIndex(task => task._id === taskId);
      if (idx !== -1) {
        updatedTasksList[idx] = {
          ...updatedTasksList[idx],
          complete: !updatedTasksList[idx].complete,
        };
      }
      return updatedTasksList;
    });
  };

  const deleteTaskHandler = (taskId) => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
      .filter(task => task._id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
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
                            onClick={startCreateTaskHandler} />

                        {creating && <AddTask
                            onCancel={modalCancelHandler}
                            onConfirm={modalConfirmHandler}>
                            <AddTaskIconsBox>
                                <PriorityPopper ref={priorityElRef} />
                                <DatePicker ref={dateElRef} />
                                <RepeatTask ref={dateRepeatElRef} />
                            </AddTaskIconsBox>
                        </AddTask>}

                        {isLoading
                          ? <SpinnerBox>
                                <CircularProgress
                                    color='secondary' />
                            </SpinnerBox>
                          : <Lists
                                tasks={tasks}
                                authUserIdMain={context.userId}
                                onViewDetailMain={(_id) => { console.log('View detail:', _id); }}
                                onDeleteTaskMain={deleteTaskHandler}
                                onEditTaskMain={startEditTaskHandler}
                                onCompleteTaskMain={completeTaskHandler} />
                        }
                    </TaskViewBox>
                </Container>

                {updating && <EditTaskModal
                    onCancel={modalCancelHandler}
                    onConfirm={editTaskHandler}
                    confirmText='confirm'>
                    <TaskEditBox>
                        <TextField
                            id='outlined-basic-edit'
                            label='Edit task'
                            variant='outlined'
                            size='medium'
                            multiline
                            fullWidth
                            inputRef={titleElRef} />
                        <PriorityPopper ref={priorityElRef} />
                        <DatePicker ref={dateElRef} />
                        <RepeatTask ref={dateRepeatElRef} />
                        <Box>
                            <IconButton onClick={() => deleteTaskHandler(updatedTask)}>
                                <DeleteOutlineIcon color='secondary' />
                            </IconButton>
                        </Box>
                    </TaskEditBox>
                </EditTaskModal>}
            </RootBox>
        </React.Fragment>
  );
};

export default TasksPage;
