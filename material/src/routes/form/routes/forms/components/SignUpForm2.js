import React from 'react';
import DEMO from 'constants/demoData';
import APPCONFIG from 'constants/appConfig';
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialIcon from 'components/MaterialIcon';

class NormalForm extends React.Component {
  state = {
    email: null,
    password: null,
    confirmed_passowrd: null,
    remember: true,
    redirect: null,
    error: null
  }

  handleChange = (name) => (event) => {
    this.setState({[name]: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let url = 'https://api.cooby.co/users/';
    fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    }).then(res => {
      if (res.ok) {
        return res.json().then(res => {
            this.setState({
              id: res.id,
              token: res.token,
              redirect: '#/app/client'
            });
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          });
      } else {
        this.setState({error: res.statusText});
      }
    });
  }

  handleClose = event => {
    this.setState({
      email: null,
      password: null,
      confirmed_passowrd: null,
      error: null
    });
  }
  render() {
    const {name, email, password, confirmed_passowrd, error} = this.state;

      return (
        <section className="form-v1-container">
          {
            error != null && (<Dialog
              open={error != null}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"註冊失敗"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  請嘗試不同的信箱，或稍後再試一次。
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  好
                </Button>
              </DialogActions>
            </Dialog>)
          }
          <h2>建立新的{APPCONFIG.brand}帳號</h2>
          <p className="lead col-lg-10 mx-lg-auto">輕鬆管理客戶關係</p>
          <form onSubmit={this.handleSubmit} className="form-v1">
            <div className="form-group">
              <div className="input-group-v1">
                <div className="input-group-icon">
                  <MaterialIcon icon="account_circle" />
                </div>
                <TextField
                  id="signup2-name"
                  label="姓名"
                  value={name}
                  fullWidth
                  onChange={this.handleChange('name')}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group-v1">
                <div className="input-group-icon">
                  <MaterialIcon icon="email" />
                </div>
                <TextField
                  id="signup2-email"
                  label="Email"
                  value={email}
                  onChange={this.handleChange('email')}
                  fullWidth
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group-v1">
                <div className="input-group-icon">
                  <MaterialIcon icon="lock" />
                </div>
                <TextField
                  id="signup2-password"
                  label="密碼"
                  value={password}
                  type="password"
                  onChange={this.handleChange('password')}
                  fullWidth
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group-v1">
                <div className="input-group-icon">
                  <MaterialIcon icon="lock" />
                </div>
                <TextField
                  id="signup2-password"
                  label="密碼確認"
                  onChange={this.handleChange('confirmed_passowrd')}
                  value={confirmed_passowrd}
                  type="password"
                  fullWidth
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    value="signup2-agreement"
                    color="primary"
                  />
                }
                label={<div>我已讀過<a href={DEMO.link}>用戶條款</a></div>}
              />
            </div>
            <div className="form-group">
              <Button variant="contained" color="primary" type="submit" className="btn-cta btn-block">
                註冊
              </Button>
            </div>
          </form>
          <p className="additional-info">已經有帳號了嗎?<a href={DEMO.login}>由此登入</a></p>
        </section>
      );

  }
}

export default withRouter(NormalForm);
