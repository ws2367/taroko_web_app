import React from 'react';
import { Route } from 'react-router-dom';

import Login from './routes/Login';
import SignUp from './routes/SignUp';
import ForgotPassword from './routes/ForgotPassword';
import ForgotPasswordV2 from './routes/ForgotPasswordV2';
import './styles.scss';


const Page = ({ match }) => (
  <div>
    <Route path={`${match.url}/login`} component={Login}/>
    <Route path={`${match.url}/sign-up`} component={SignUp}/>
    <Route path={`${match.url}/forgot-password`} component={ForgotPassword}/>
  </div>
)

export default Page;
