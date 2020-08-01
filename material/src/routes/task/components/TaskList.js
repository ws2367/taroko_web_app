import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TaskDrawer from './TaskDrawer';
import Chip from '@material-ui/core/Chip';
import {requestHeaders} from 'auth/Auth';



const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginBottom: theme.spacing.unit * 2
  },
  chip: {
    marginLeft: theme.spacing.unit / 4,
    marginRight: theme.spacing.unit / 4,
    backgroundColor: theme.palette.warning
  }
});

const UnstyledTaskListItem = ({classes, task, checked, handleTaskClick, handleComplete}) => (
  <ListItem
    key={task.id}
    dense
    divider
    button
    onClick={handleTaskClick(task)}
    className={classes.listItem}
  >
    <ListItemIcon>
    <Checkbox
      checked={checked.indexOf(task.id) !== -1}
      tabIndex={-1}
      disableRipple
      onClick={handleComplete(task.id)}
    />
    </ListItemIcon>
    <ListItemText primary={
      (<>
        {task.content}
        {task.priority === 1 && <Chip
          className={classes.chip}
          label="重要"
        />}
      </>)}
    />
    <ListItemSecondaryAction>
      <IconButton aria-label="Edit" onClick={handleTaskClick(task)}>
        <EditIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const TaskListItem = withStyles(styles)(UnstyledTaskListItem);



class TaskList extends React.Component {
  collectionEndpoint = (this.props.isUnderClient) ? 'https://api.cooby.co/clients/' + this.props.clientId + '/tasks/' : 'https://api.cooby.co/tasks/';

  state = {
    checked: [0],
    mode: 'create',
    tasks: [],
    dates: [],
    error: null,
    selectedTask: {},
    isLoaded: false,
    isOpen: false
  };
  //

  sortDates = (tasks) => {
    let dates = tasks.map(task => task.due_date);
    let uniqueDates = [...new Set(dates)];
    uniqueDates.sort();
    return uniqueDates;
  };

  // expect yyyy-mm-dd format
  isInPast = (dateStr) => {
    let parts = dateStr.split("-");
    let d1 = new Date(parts[0], (Number(parts[1]) - 1), parts[2]);
    let today = (new Date()).setHours(0,0,0,0);
    return d1.valueOf() < today.valueOf();
  }

  groupTasksByType = (tasks) => {
    let pastTasks    = tasks.filter(t => t.due_date && this.isInPast(t));
    let futureTasks  = tasks.filter(t => t.due_date && !this.isInPast(t));
    let undatedTasks = tasks.filter(t => !t.due_date);

    return {
      past: {tasks: pastTasks, dates: this.sortDates(pastTasks)},
      future: {tasks: pastTasks, dates: this.sortDates(futureTasks)},
      undated: {tasks: undatedTasks}
    };
  }

  componentDidMount() {
    fetch(this.collectionEndpoint, {
      "method": "GET",
      mode: 'cors',
      headers: requestHeaders()
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tasks: result.tasks,
            dates: this.sortDates(result.tasks)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleDeleteTask = taskId => {
    this.deleteFromServer(taskId);
  }

  deleteFromServer = taskId => {
    let url = 'https://api.cooby.co/tasks/' + taskId + '/';
    fetch(url, {
      "method": "DELETE",
      mode: 'cors',
      headers: requestHeaders()
    }).then(res => {
      if (res.ok) {
        let tasks = this.state.tasks;
        let index = tasks.findIndex(t => t.id === taskId);
        tasks.splice(index, 1);

        this.setState({
          tasks: tasks,
          dates: this.sortDates(tasks)
        });
      } else {
        res.json().then(error => {console.log(error)});
        }

        this.handleClose();
      });
  }

  handleComplete = taskId => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

    this.deleteFromServer(taskId);
  };

  handleCreateTaskClick = () => {
    this.setState({
      isOpen: true,
      mode: 'create',
      selectedTask: {},
    });
  }

  handleTaskClick = (task) => (event) => {
    this.setState({
      isOpen: true,
      mode: 'edit',
      selectedTask: task
    });
  }

  handleClose = () => {
    this.setState({isOpen: false});
  }

  handleSaveTask = (newTask) => {
    console.log(newTask);

    let endpoint = this.state.mode == "edit" ? 'https://api.cooby.co/tasks/' + newTask.id : this.collectionEndpoint;

    fetch(endpoint, {
      "method": ( this.state.mode == "edit" ? "put" : "post" ),
      mode: 'cors',
      headers: requestHeaders(),
      body: JSON.stringify(newTask)
    }).then(res => {
      if (res.ok && this.state.mode == "edit") {
        // put request returns empty string. can't call res.to_json()
        return new Promise((resolve, reject) => {resolve({})} );
      } else {
        return res.json();
      }
    }).then(
        (result) => {
          if (this.state.mode == "edit") {
            // edit mode
            var index = this.state.tasks.findIndex(t => t.id == newTask.id);
            if (index) {
                var oldTask = this.state.tasks[index];
                var tasks = this.state.tasks;
                tasks[index] = {...oldTask, ...newTask};
                this.setState({tasks: tasks, dates: this.sortDates(tasks)});
            }
          } else {
            // create mode
            this.setState({
              tasks: this.state.tasks.concat({
                id: result.id,
                ...newTask
              })
            });
          }
        },
        (error) => {
          console.log(error);
          this.setState({ error });
        }
    );
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    const { dates, tasks, selectedTask, isOpen, mode } = this.state;

    return (
      <>
          <TaskDrawer
            isOpen={isOpen}
            key={selectedTask.id}
            task={selectedTask}
            mode={mode}
            handleClose={this.handleClose}
            handleDeleteTask={this.handleDeleteTask}
            handleSaveTask={this.handleSaveTask}
          />
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleCreateTaskClick}>
            新增待辦事項
          </Button>
          <div className="box box-default mb-4">
            <div className="box-header">未來待辦事項</div>
            <div className="box-divider"></div>
            <div className="box-body">
              { // future tasks first
                dates.filter(d => d && !this.isInPast(d)).map((date, index1) => (
                  <List
                    component="nav"
                    subheader={<ListSubheader component="div">{date == null ? "未預定" : date}</ListSubheader>}
                  >
                    {
                      tasks.filter(task => task.due_date == date).map( (task, index2) => (
                        <TaskListItem
                          classes={classes}
                          task={task}
                          checked={this.state.checked}
                          handleTaskClick={this.handleTaskClick}
                          handleComplete={this.handleComplete}
                        />
                      ))
                    }
                  </List>
                ))
              }
              </div>
            </div>
            <div className="box box-default mb-4">
              <div className="box-header">逾期待辦事項</div>
              <div className="box-divider"></div>
              <div className="box-body">
                { // future tasks first
                  dates.filter(d => d && this.isInPast(d)).map((date, index1) => (
                    <List
                      component="nav"
                      subheader={<ListSubheader component="div">{date == null ? "未預定" : date}</ListSubheader>}
                    >
                      {
                        tasks.filter(task => task.due_date == date).map( (task, index2) => (
                          <TaskListItem
                            task={task}
                            checked={this.state.checked}
                            handleTaskClick={this.handleTaskClick}
                            handleComplete={this.handleComplete}
                          />
                        ))
                      }
                    </List>
                  ))
                }
                </div>
              </div>
              <div className="box box-default mb-4">
                <div className="box-header">未預定待辦事項</div>
                <div className="box-divider"></div>
                <div className="box-body">
                  <List
                    component="nav"
                  >
                    {
                      tasks.filter(task => !task.due_date).map( (task, index2) => (
                        <TaskListItem
                          classes={classes}
                          task={task}
                          checked={this.state.checked}
                          handleTaskClick={this.handleTaskClick}
                          handleComplete={this.handleComplete}
                        />
                      ))
                    }
                  </List>
                </div>
              </div>
      </>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskList);
