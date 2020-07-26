import React from 'react';
import APPCONFIG from 'constants/appConfig';
import DEMO from 'constants/demoData';
import { withRouter, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialIcon from 'components/MaterialIcon';
import { Icon } from 'antd';
import AUTH from 'auth/Auth';

class NormalForm extends React.Component {

  state = {
    email: "",
    password: "",
    remember: true,
    error: null
  }

  handleChange = (name) => (event) => {
    if (name === 'remember') {
      this.setState({remember: !this.state.remember});
    } else {
      this.setState({[name]: event.target.value});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let url = 'https://api.cooby.co/login/';
    fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    }).then(res => {
      if (res.status == 401) {
        this.setState({error: 'unauthorized'});
      } else {
        return res.json().then(res => {
            this.setState({
              id: res.id,
              token: res.token
            });

            AUTH({userId: res.id, token: res.token});
            // AUTH.userId = res.id;
            // AUTH.token = res.token;

            this.props.history.push('/app/client');
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          });
      }
    });
  }

  handleClose = event => {
    this.setState({
      password: "",
      error: ""
    });
  }


  render() {
    const {email, password, remember, error} = this.state;
    if (error != null) {
      return (<Dialog
        open={error != null}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"登入資訊錯誤"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            請檢查你的Email或密碼，其中一項錯誤。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            好
          </Button>
        </DialogActions>
      </Dialog>)
    } else {
      return (

        <section className="form-v1-container">
          <h2>登入{APPCONFIG.brand}</h2>
          <p className="lead">歡迎回來！請登入你的{APPCONFIG.brand}帳號</p>
          <form onSubmit={this.handleSubmit} className="form-v1">
            <div className="form-group">
              <div className="input-group-v1">
                <div className="input-group-icon">
                  <MaterialIcon icon="email" />
                </div>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  onChange={this.handleChange('email')}
                  value={email}
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
                  id="password"
                  label="密碼"
                  value={password}
                  type="password"
                  onChange={this.handleChange('password')}
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
                    onChange={this.handleChange('remember')}
                    value="login2-remember"
                    color="primary"
                  />
                }
                label="下次登入時，記住我"
              />
            </div>
            <div className="form-group">
              <Button variant="contained" color="primary" type="submit" className="btn-cta btn-block">
                登入
              </Button>
            </div>
          </form>
          <p className="additional-info">還沒有帳號？<a href={DEMO.signUp}>由此註冊</a></p>
          <p className="additional-info">忘記密碼？<a href={DEMO.forgotPassword}>由此重設密碼</a></p>
        </section>
      );
    }
  }
}

export default withRouter(NormalForm);
