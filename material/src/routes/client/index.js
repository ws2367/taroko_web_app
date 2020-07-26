import React from 'react';
import QueueAnim from 'rc-queue-anim';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Client from './components/Client';
import StatBoxes1 from './components/StatBoxes1';
  import StatBoxes2 from './components/StatBoxes2';
import ClientList from './components/ClientList';
import './components/styles.scss';
import {getAuthfromCookie} from 'auth/Auth';



export default class ClientsPage extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    if (!getAuthfromCookie()) {
      console.log('go login');
      this.props.history.push('/user/login');
    }
  }


  render() {
    const { match } = this.props;
    const { openClientDrawer } = this.state;

    return (
        <div>
          <Switch>
            <Route path={`${match.path}/:clientId`} component={Client} />

            <Route path={match.path}>
              <div className="container-fluid no-breadcrumb page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1"><StatBoxes1 /></div>
                    <div key="2">
                      <ClientList
                        toggleClientDrawer={this.toggleClientDrawer}
                        openClientDrawer={openClientDrawer}/>
                    </div>
                  </QueueAnim>
              </div>
            </Route>
          </Switch>
        </div>
    );
  }
}
