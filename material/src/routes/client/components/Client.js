import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Profile from './Profile';
import NoteList from './NoteList';
import TaskList from '../../task/components/TaskList';
import {requestHeaders} from 'auth/Auth';


class Client extends React.Component {
  constructor(props) {
    super(props);
    // get Client ID
    let clientId = this.props.location.pathname.replace('/app/client/', '');

    this.state = {
      clientId: clientId,
      name: null,
      error: null,
      isLoaded: false,
      tabIndex: 0,
      handlers: {updateClientName: this.updateClientName}
    }
  }

  updateClientName = (name) => {
    // only update client name
    this.setState({name: name});
  };


  fetchTasks = () => {
    fetch("https://api.cooby.co/clients/" + this.state.clientId + "/tasks/", {
      "method": "GET",
      mode: 'cors',
      headers: requestHeaders()
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            tasks: result.tasks
          });
        },
        (error) => {
          this.setState({
            error
          });
        });
  };


  componentDidMount() {
    this.fetchTasks();
  }

  handleTabChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleChangeIndex = index => {
    this.setState({ tabIndex: index });
  };

  render() {

    const { clientId, name, tabIndex, isLoaded, handlers } = this.state;


    const NoteTab = () => (
      <div className="container-fluid pt-3">
          <NoteList clientId={clientId}/>
      </div>
    )

    const TaskTab = () => (
      <div className="container-fluid pt-3">
        <TaskList clientId={clientId} isUnderClient={true}/>
      </div>
    )

    return (
      <section className="page-with-tabs">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="page-header-title"> {name || "未命名"} </div>
          </div>

          <div key="2">
            <Tabs value={tabIndex} onChange={this.handleTabChange} className="page-tabs">
              <Tab label="基本資料" />
              <Tab label="會議記錄" />
              <Tab label="待辦事項" />
            </Tabs>
            <SwipeableViews
              index={tabIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <Profile
                key={clientId + "-profile"}
                clientId={clientId}
                handlers={handlers}
              />
              <NoteTab key={clientId + "-note"}/>
              <TaskTab key={clientId + "-task"}/>
            </SwipeableViews>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

export default Client;
