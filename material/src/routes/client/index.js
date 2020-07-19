import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Button from '@material-ui/core/Button';

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




export default class ClientsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      error: null,
      isLoaded: false,
      openClientDrawer: false
    }

  }

  componentDidMount() {
    // fetch("https://api.cooby.co/clients/", {
    //   "method": "GET",
    //   mode: 'cors',
    //   "headers": {
    //     'Content-Type': 'application/json',
    //     "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
    //
    //   }
    // }).then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         clients: result.clients
    //       });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
  }

  toggleClientDrawer = (state) => () => {
    this.setState({openClientDrawer: state});
  }

  render() {
    const { match } = this.props;
    const { error, isLoaded, clients, openClientDrawer } = this.state;

    return (
        <div>
          <Switch>
            <Route path={`${match.path}/:clientId`} component={Client} />

            <Route path={match.path}>
              <div className="container-fluid no-breadcrumb page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <Button variant="contained" color="primary" className="btn-w-md" onClick={this.toggleClientDrawer(true)}>
                      新增客戶</Button>
                    <div className="divider" />
                    <div key="1"><StatBoxes1 /></div>
                    <div key="2">
                      <ClientList
                        clients={clients}
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
