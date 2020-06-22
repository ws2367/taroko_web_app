import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class TaskList extends React.Component {
  state = {
    checked: [0],
    tasks: [],
    dates: [],
    error: null,
    isLoaded: false
  };
  //

  componentDidMount() {
    const sortDates = (tasks) => {
      let dates = tasks.map(task => task.due_date);
      let uniqueDates = [...new Set(dates)];
      uniqueDates.sort();
      return uniqueDates;
    };

    fetch("http://api.cooby.co/tasks/", {
      "method": "GET",
      mode: 'cors',
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
      }
    }).then(res => res.json())
      .then(
        (result) => {
          console.log("HELLO!!!!!");

          this.setState({
            isLoaded: true,
            tasks: result.tasks,
            dates: sortDates(result.tasks)
          });
          console.log(this.state);
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

  render() {
    const { classes } = this.props;
    const { dates, tasks } = this.state;

    return (
      <div className={classes.root}>
        {
          dates.map((date, index) => (
            <List
              component="nav"
              subheader={<ListSubheader component="div">{date == null ? "未預定" : date}</ListSubheader>}
            >
              {
                tasks.filter(task => task.due_date == date).map( (task, index) => (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    onClick={this.handleToggle(task.id)}
                    className={classes.listItem}
                  >
                    <Checkbox
                      checked={this.state.checked.indexOf(index) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={task.content} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
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
