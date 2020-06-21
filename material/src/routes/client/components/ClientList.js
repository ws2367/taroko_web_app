import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import KPIsChart from './KPIsChart';
import Client from './Client';
import AquisitionChart from './AquisitionChart';
import StatBoxes1 from './StatBoxes1';
import StatBoxes2 from './StatBoxes2';
import ProjectTable from './ProjectTable';
import './styles.scss';

const Main = () => (
  <div className="row">
    <div className="col-xl-6">
      <div className="box box-default mb-4">
        <div className="box-body" style={{paddingTop: '2rem', paddingBottom: '.5rem'}}>
          <KPIsChart />
        </div>
      </div>
    </div>
    <div className="col-xl-6">
      <div className="box box-default mb-4">
        <div className="box-body">
          <AquisitionChart />
        </div>
      </div>
    </div>
  </div>
);

const ClientList = ({match}) => (
    <div>
      <Switch>
        <Route path={`${match.path}/:clientId`} component={Client} />
        <Route path={match.path}>
          <div className="container-fluid no-breadcrumb page-dashboard">
            <QueueAnim type="bottom" className="ui-animate">
              <div key="1"><ProjectTable /></div>
              <div key="2"><StatBoxes1 /></div>
              </QueueAnim>
          </div>
        </Route>
      </Switch>
    </div>
);

export default ClientList;
