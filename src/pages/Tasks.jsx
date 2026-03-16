/* ----------------------------------------------------
React.js / Tasks page component

Updated: 05/06/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, {Component} from 'react';
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
        // paddingLeft: '260px',
        flexDirection: 'column',
    },
    taskView: {
        maxWidth: '60vw',
        padding: theme.spacing(3,1),
        [theme.breakpoints.down('md')]:{
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
class TasksPage extends Component {
    state = {
        creating: false,
        updating: false,
        tasks: [],
        isLoading: false,
        updatedTask: null
    };

    isActive = true;

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priorityElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.dateRepeatElRef = React.createRef();
        this.completeElRef = React.createRef();
    }

    // componentDidMount() executes when the page loads = is invoked immediately
    // after a component is mounted (inserted into the tree).
    componentDidMount() {
        this.fetchTasks();
    };

    startCreateTaskHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const title = this.titleElRef.current.value;
        const priority = +this.priorityElRef.current.value;
        let date = this.dateElRef.current.value;
        let dateRepeat = this
            .dateRepeatElRef
            .current
            .value
            .split(",");
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
        console.log(dateRepeat);
        // to check input some data isn't empty. trim()-remove whitespace from both
        // sides of a string.
        if (title.trim().length === 0 || priority <= 0) {
            return;
        };

        if (date.length === 0) {
            date = null;
        };

        // the task is an object with properties title: title, priority: priority, etc.
        const task = {
            title,
            priority,
            date,
            start,
            end,
            intervalK,
            intervalN
        };
        console.log("check if the task object is rigth: ", task)

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
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask]
        }));
        this.titleElRef.current.value = '';
    };

    modalCancelHandler = () => {
        this.setState({creating: false, updating: false, selectedTask: null});
    };

    fetchTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (this.isActive) {
            this.setState({tasks: savedTasks, isLoading: false});
        }
    };

    startEditTaskHandler = taskId => {
        this.setState({updating: true, updatedTask: taskId});
        console.log('updating state ',this.state.updating)
    };

    editTaskHandler = () => {
        this.setState({updating: false});
        const taskId = this.state.updatedTask;
        const title = this.titleElRef.current.value;
        const priority = +this.priorityElRef.current.value;
        let date = this.dateElRef.current.value;
        let dateRepeat = this
        .dateRepeatElRef
        .current
        .value
        .split(",");
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
            savedTasks[taskIndex] = { ...savedTasks[taskIndex], title, priority, date: date || null, start: start || null, end: end || null, intervalK: intervalK || null, intervalN: intervalN || null };
        }
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        this.setState(prevState => {
            const updatedTasks = [...prevState.tasks];
            const idx = updatedTasks.findIndex(task => task._id === taskId);
            if (idx !== -1) {
                updatedTasks[idx] = { ...updatedTasks[idx], title, priority, date: date || null, start: start || null, end: end || null, intervalK: intervalK || null, intervalN: intervalN || null };
            }
            return { tasks: updatedTasks, updatedTask: null };
        });
    };

    completeTaskHandler = taskId => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = savedTasks.findIndex(task => task._id === taskId);
        if (taskIndex !== -1) {
            savedTasks[taskIndex].complete = !savedTasks[taskIndex].complete;
        }
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        this.setState(prevState => {
            const updatedTasks = [...prevState.tasks];
            const idx = updatedTasks.findIndex(task => task._id === taskId);
            if (idx !== -1) {
                updatedTasks[idx] = { ...updatedTasks[idx], complete: !updatedTasks[idx].complete };
            }
            return { tasks: updatedTasks };
        });
    };

    deleteTaskHandler = taskId => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
            .filter(task => task._id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task._id !== taskId)
        }));
    };
    // componentWillUnmount() is invoked immediately before a component is unmounted
    // and destroyed. Perform any necessary cleanup in this method, such as
    // invalidating timers, canceling network requests, or cleaning up any
    // subscriptions that were created in componentDidMount().
    componentWillUnmount() {
        this.isActive = false;
    };

    render() {
        const { classes } = this.props;
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
                        inputRef={this.titleElRef}
                        onClick={this.startCreateTaskHandler}/>

                {this.state.creating && <AddTask
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}>
                    <form className={classes.addTaskIcons}>
                            <PriorityPopper ref={this.priorityElRef}/>
                            <DatePicker ref={this.dateElRef}/>
                            <RepeatTask ref={this.dateRepeatElRef}/>
                    </form>
                </AddTask>}

                {this.state.isLoading
                    ? <div className={classes.spinner}> 
                        <CircularProgress 
                        color="secondary" /> 
                      </div>
                    : <Lists
                        tasks={this.state.tasks}
                        authUserIdMain={this.context.userId}
                        onViewDetailMain={this.showDetailHandler}
                        onDeleteTaskMain={this.deleteTaskHandler}
                        onEditTaskMain={this.startEditTaskHandler}
                        onCompleteTaskMain={this.completeTaskHandler} />
                    }
                </div>
                </Container>

                {this.state.updating && <Modal
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.editTaskHandler}
                    confirmText="confirm">
                    <form className={classes.taskEdit}>
                    <TextField
                        id="outlined-basic"
                        label="Edit task"
                        variant="outlined"
                        size="medium"
                        multiline
                        fullWidth
                        inputRef={this.titleElRef}/>
                    <PriorityPopper ref={this.priorityElRef}/>
                    <DatePicker ref={this.dateElRef}/>
                    <RepeatTask ref={this.dateRepeatElRef}/>
                    <div>
                    <IconButton onClick={this.deleteTaskHandler.bind(this, this.state.updatedTask)}>
                        <DeleteOutlineIcon color="secondary"/>
                    </IconButton>
                    </div>
                    </form>
                </Modal>}
                </div>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(TasksPage);