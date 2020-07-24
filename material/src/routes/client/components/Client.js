import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Profile from './Profile';
import NoteList from './NoteList';
import TaskList from '../../task/components/TaskList';

const HEADER = {
  'Content-Type': 'application/json',
  "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
};


class Client extends React.Component {
  constructor(props) {
    super(props);
    // get Client ID
    let clientId = this.props.location.pathname.replace('/app/client/', '');

    this.state = {
      notes: [],
      todos: [],
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
      headers: HEADER
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

    const { clientId, name, tabIndex, isLoaded, handlers, notes } = this.state;


    const NoteTab = () => (
      <div className="container-fluid no-breadcrumb container-mw-md chapter">
        <article className="article">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1" className="mb-3"> <NoteList clientId={clientId}/> </div>
          </QueueAnim>
        </article>
      </div>
    )

    const TaskTab = () => (
      <div className="container-fluid pt-3">
        <TaskList />
      </div>
    )

    const ClientWithTabs = () => (
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
                clientId={clientId}
                handlers={handlers}
              />
              <NoteTab />
              <TaskTab clientId={this.state.clientId}/>
            </SwipeableViews>
          </div>
        </QueueAnim>
      </section>
    );

    return(
      <ClientWithTabs />
    );
  }
}

export default Client;
