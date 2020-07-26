import React from 'react';
import DEMO from 'constants/demoData';
import APPCONFIG from 'constants/appConfig';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialIcon from 'components/MaterialIcon';

class NormalForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e)
    // this.props.history.push(DEMO.home2);
  }
  render() {
    return (
      <section className="form-v1-container">
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
                fullWidth
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
