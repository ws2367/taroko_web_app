import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import OutlinedButton from 'components/OutlinedButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  divContainer: {
    width: '180px',
    margin: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '100px',
  },
  menu: {
    width: '100px',
  },
});

class TaskDrawer extends React.Component {
  constructor(props) {
    super(props);

    var task = props.task || {};

    this.state = {
      content: task.content,
      due_date: task.due_date,
      priority:  task.priority,
      reminder:  task.reminder
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSave = event => {
    const {content, due_date, priority, reminder} = this.state;
    this.props.handleSaveTask({
      ...this.props.task,
      content, due_date, priority, reminder
    });
  }

  handleDelete = (taskId) => (event) => {
    event.preventDefault();
    this.props.handleDeleteTask(taskId);
  }

  render() {
    const classes = styles();
    const { content, due_date, priority, reminder} = this.state;
    const { mode, isOpen, handleClose } = this.props;

    const config = {
      "task_priority": {"0":"一般", "1":"重要"},
        "task_status": {"0": "未完成", "1": "已完成"},
        "task_origin": {"0": "手動產生", "1": "自動產生"},
        "task_remind_at": {
            "0": {
                "label": "當天",
                "num_hours": "0"
            },
            "1": {
                "label": "前一天",
                "num_hours": "24"
            },
            "2": {
                "label": "前三天",
                "num_hours": "72"
            },
            "3": {
                "label": "前七天",
                "num_hours": "168"
            }
        }
    }

    return (
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
          <div style={classes.divContainer}>
          <Typography variant="title" gutterBottom>
            {mode === "create" ? "新增待辦事項" : "編輯待辦事項"}
          </Typography>
            <form className={classes.container} noValidate>
              <TextField
                required
                label="內容"
                className={classes.textField}
                value={content}
                onChange={this.handleChange('content')}
                margin="normal"
              />
              <TextField
                id="due_date"
                type='date'
                label="截止日期"
                value={due_date}
                className={classes.textField}
                onChange={this.handleChange('due_date')}
                margin="normal"
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">優先順序</FormLabel>
                <RadioGroup row aria-label="priority" name="priority" value={String(priority)} onChange={this.handleChange('priority')}>
                  {
                    Object.keys(config.task_priority).map( (key) => (
                      <FormControlLabel key={key} value={key} control={<Radio />} label={config.task_priority[key]} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
              <TextField
                id="reminder"
                select
                label="設定提醒"
                className={classes.textField}
                value={String(reminder)}
                onChange={this.handleChange('reminder')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {Object.keys(config.task_remind_at).map( k => (
                  <MenuItem key={k} value={k}>
                    {config.task_remind_at[k].label}
                  </MenuItem>
                ))}
              </TextField>
            </form>
            <div className="divider" />
              {mode === "edit" &&
                <Button color="primary" onClick={this.handleDelete(this.props.task.id)}>刪除</Button>
              }
              <OutlinedButton color="secondary" className="btn-w-sm" onClose={handleClose}>取消</OutlinedButton>
              <Button variant="contained" color="primary" className="btn-w-sm" onClick={this.handleSave}>儲存</Button>

          </div>
      </Drawer>
    )
  };
}

export default TaskDrawer;
