import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TaskDrawer from './TaskDrawer';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const HEADER = {
  'Content-Type': 'application/json',
  "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
};



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

  componentDidMount() {
    const sortDates = (tasks) => {
      let dates = tasks.map(task => task.due_date);
      let uniqueDates = [...new Set(dates)];
      uniqueDates.sort();
      return uniqueDates;
    };

    fetch(this.collectionEndpoint, {
      "method": "GET",
      mode: 'cors',
      headers: HEADER
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tasks: result.tasks,
            dates: sortDates(result.tasks)
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

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleCreateTaskClick = () => {
    this.setState({
      isOpen: true,
      mode: 'create',
      selectedTask: {},
    });
  }

  handleTaskClick = (task) => (event) => {
    console.log(task);
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
      headers: HEADER,
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
                this.setState({tasks: tasks});
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
    const { dates, tasks, selectedTask, isOpen } = this.state;

    return (
      <div className={classes.root}>
        <TaskDrawer
          isOpen={isOpen}
          key={selectedTask.id}
          task={selectedTask}
          handleClose={this.handleClose}
          handleSaveTask={this.handleSaveTask}
        />
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          className="btn-w-md"
          onClick={this.handleCreateTaskClick}>
          新增待辦事項
        </Button>
        {
          dates.map((date, index1) => (
            <List
              component="nav"
              subheader={<ListSubheader component="div">{date == null ? "未預定" : date}</ListSubheader>}
            >
              {
                tasks.filter(task => task.due_date == date).map( (task, index2) => (
                  <ListItem
                    key={task.id}
                    dense
                    button
                    onClick={this.handleToggle(task.id)}
                    className={classes.listItem}
                  >
                    <Checkbox
                      checked={this.state.checked.indexOf(task.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={task.content} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Edit" onClick={this.handleTaskClick(task)}>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          ))
        }

      </div>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TaskList1 = withStyles(styles)(TaskList);

const ListExample = () => (
  <section className="box box-default">
    <div className="box-header">待辦事項</div>
    <div className="box-body">
      <TaskList1 />
    </div>
  </section>
);

export default ListExample;
