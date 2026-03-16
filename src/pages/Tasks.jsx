/* ----------------------------------------------------
React.js / Tasks page component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../context/auth-context';


// Material-UI components (https://material-ui.com/)
import { withStyles } from '@material-ui/core/styles';
import Modal from '../components/Modal/EditTaskModal';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Lists from '../components/Tasks/TaskList/Lists'
import AddTask from '../components/Tasks/AddTask/AddTask';
import PriorityPopper from '../components/Tasks/AddTask/Popper/Popper';
import DatePicker from '../components/Tasks/AddTask/Pickers/DatePicker';
import RepeatTask from '../components/Tasks/AddTask/Repeat/Repeat'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// Style for Material-UI components
const styles = theme => ({
    root: {
        display: 'flex',
        paddingTop: '64px',
        flexDirection: 'column',
    },
    taskView: {
        maxWidth: '60vw',
        padding: theme.spacing(3, 1),
        [theme.breakpoints.down('md')]: {
            maxWidth: '100vw',
        },
    },
    addTaskIcons: {
        display: 'flex',
        flexDirection: 'row',
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(10),
    },
    taskEdit: {
        display: 'flex',
    },
});

const TasksPage = (props) => {
    const { classes } = props;
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
        let date = dateElRef.current.value;
        let dateRepeat = dateRepeatElRef.current.value.split(",");
        
        let start = null;
        let end = null;
        let intervalK = null;
        let intervalN = null;

        if (dateRepeat.length > 1) {
            start = new Date(dateRepeat[0]).toISOString();
            end = new Date(dateRepeat[1]).toISOString();
            intervalK = parseInt(dateRepeat[2]);
            intervalN = dateRepeat[3];
            date = start;
        }

        if (title.trim().length === 0 || priority <= 0) {
            return;
        }

        if (date.length === 0) {
            date = null;
        }

        const newTask = {
            _id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            title,
            priority,
            date: date || null,
            complete: false,
            start: start || null,
            end: end || null,
            intervalK: intervalK || null,
            intervalN: intervalN || null,
            creator: { _id: 'local' }
        };

        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        savedTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        
        setTasks(prevTasks => [...prevTasks, newTask]);
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
        let date = dateElRef.current.value;
        let dateRepeat = dateRepeatElRef.current.value.split(",");
        
        let start = null;
        let end = null;
        let intervalK = null;
        let intervalN = null;

        if (dateRepeat.length > 1) {
            start = new Date(dateRepeat[0]).toISOString();
            end = new Date(dateRepeat[1]).toISOString();
            intervalK = parseInt(dateRepeat[2]);
            intervalN = dateRepeat[3];
            date = start;
        }

        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = savedTasks.findIndex(task => task._id === taskId);
        if (taskIndex !== -1) {
            savedTasks[taskIndex] = { 
                ...savedTasks[taskIndex], 
                title, 
                priority, 
                date: date || null, 
                start: start || null, 
                end: end || null, 
                intervalK: intervalK || null, 
                intervalN: intervalN || null 
            };
        }
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        
        setTasks(prevTasks => {
            const updatedTasksList = [...prevTasks];
            const idx = updatedTasksList.findIndex(task => task._id === taskId);
            if (idx !== -1) {
                updatedTasksList[idx] = { 
                    ...updatedTasksList[idx], 
                    title, 
                    priority, 
                    date: date || null, 
                    start: start || null, 
                    end: end || null, 
                    intervalK: intervalK || null, 
                    intervalN: intervalN || null 
                };
            }
            return updatedTasksList;
        });
        setUpdatedTask(null);
    };

    const completeTaskHandler = taskId => {
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
                    complete: !updatedTasksList[idx].complete 
                };
            }
            return updatedTasksList;
        });
    };

    const deleteTaskHandler = taskId => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
            .filter(task => task._id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Container maxWidth="sm">
                    <div className={classes.taskView}>
                        <TextField
                            id="outlined-basic"
                            label="Add task"
                            variant="outlined"
                            size="medium"
                            multiline
                            fullWidth
                            inputRef={titleElRef}
                            onClick={startCreateTaskHandler} />

                        {creating && <AddTask
                            onCancel={modalCancelHandler}
                            onConfirm={modalConfirmHandler}>
                            <form className={classes.addTaskIcons}>
                                <PriorityPopper ref={priorityElRef} />
                                <DatePicker ref={dateElRef} />
                                <RepeatTask ref={dateRepeatElRef} />
                            </form>
                        </AddTask>}

                        {isLoading
                            ? <div className={classes.spinner}>
                                <CircularProgress
                                    color="secondary" />
                            </div>
                            : <Lists
                                tasks={tasks}
                                authUserIdMain={context.userId}
                                onViewDetailMain={() => {}} // Placeholder if needed
                                onDeleteTaskMain={deleteTaskHandler}
                                onEditTaskMain={startEditTaskHandler}
                                onCompleteTaskMain={completeTaskHandler} />
                        }
                    </div>
                </Container>

                {updating && <Modal
                    onCancel={modalCancelHandler}
                    onConfirm={editTaskHandler}
                    confirmText="confirm">
                    <form className={classes.taskEdit}>
                        <TextField
                            id="outlined-basic-edit"
                            label="Edit task"
                            variant="outlined"
                            size="medium"
                            multiline
                            fullWidth
                            inputRef={titleElRef} />
                        <PriorityPopper ref={priorityElRef} />
                        <DatePicker ref={dateElRef} />
                        <RepeatTask ref={dateRepeatElRef} />
                        <div>
                            <IconButton onClick={() => deleteTaskHandler(updatedTask)}>
                                <DeleteOutlineIcon color="secondary" />
                            </IconButton>
                        </div>
                    </form>
                </Modal>}
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(TasksPage);