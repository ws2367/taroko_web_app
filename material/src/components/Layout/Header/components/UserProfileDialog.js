import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedButton from 'components/OutlinedButton';

const LogoutConfirmDialog = ({open, handleClose}) => (
  <Dialog
    open={open}
    onClose={handleClose(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">用戶資訊</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        你確定要登出嗎？登出後，必須再次輸入帳號密碼才可以登入。
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <OutlinedButton onClick={handleClose(false)} color="secondary">
        不要
      </OutlinedButton>
      <Button variant='contained' onClick={handleClose(true)} color="primary" autoFocus>
        要
      </Button>
    </DialogActions>
  </Dialog>

)


export default LogoutConfirmDialog;
