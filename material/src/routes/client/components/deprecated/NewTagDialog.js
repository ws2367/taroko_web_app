import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class NewTagDialog extends React.Component {
  state = {value: ""};

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }


  render() {
    const {value} = this.state;
    const {open, handleClose} = this.props;
    return (
      <div>
        <Dialog open={open} onClose={handleClose('save')} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">輸入新標籤名稱</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={value}
              id="new-tag"
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose('cancel')()} color="secondary">
              取消
            </Button>
            <Button onClick={handleClose('save')(value)} color="primary">
              新增
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default NewTagDialog;
