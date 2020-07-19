import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Profile from './Profile';
import Note from './Note';
import TaskList from '../../task/components/TaskList';
import "../../feedback/routes/loaders/components/loaders/loaders.scss";

const Loader = () => (
  <div className="ball-grid-pulse">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const HEADER = {
  'Content-Type': 'application/json',
  "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
};

const TabContent2 = ( {notes} ) => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <Note notes={notes}/> </div>
      </QueueAnim>
    </article>
  </div>
)

const TabContent3 = () => (
  <div className="container-fluid pt-3">
    <TaskList />
  </div>
)

class Client extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    // get Client
    let clientId = props.location.pathname.replace('/app/client/', '');

    this.state = {
      notes: [],
      todos: [],
      clientId: clientId,
      client: {profile: {}},
      config: {},
      error: null,
      isLoaded: false,
      tabIndex: 0
    }
  }


  fetchClient = (clientId) => {
    if (this.props.location.state != undefined) {
      const { client, config } = this.props.location.state;
      if (client != null && config != null) {
        this.setState({
          isLoaded: true,
          client: client,
          config: config
        });
        return;
      }
    }

    fetch("https://api.cooby.co/clients/", {
      "method": "GET",
      mode: 'cors',
      headers: HEADER
    }).then(res => res.json())
      .then(
        (result) => {
          let client = result.clients.filter( client => client.profile.id === clientId )[0];
          console.log(client);
          this.setState({
            isLoaded: true,
            client: client,
            config: result.config
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
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

  fetchNotes = () => {
    fetch("https://api.cooby.co/clients/" + this.state.clientId + "/notes/", {
      "method": "GET",
      mode: 'cors',
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            notes: result.notes
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  };

  componentDidMount() {
    this.fetchClient(this.state.clientId);
    this.fetchNotes();
    this.fetchTasks();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ tabIndex: index });
  };

  render() {
    var handlers;
    if (this.props.location.state == undefined) {
      handlers = {};
    } else {
      handlers = this.props.location.state.handlers;
    }

    const { client, config, tabIndex, isLoaded } = this.state;

    const ClientWithTabs = () => (
      <section className="page-with-tabs">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="page-header-title"> {client.profile.name} </div>
          </div>

          <div key="2">
            <Tabs value={tabIndex} onChange={this.handleChange} className="page-tabs">
              <Tab label="基本資料" />
              <Tab label="會議記錄" />
              <Tab label="待辦事項" />
            </Tabs>
            <SwipeableViews
              index={tabIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <Profile profile={client.profile} config={config} handlers={handlers} />
              <TabContent2 notes={this.state.notes}/>
              <TabContent3 />
            </SwipeableViews>
          </div>
        </QueueAnim>
      </section>
    );

    const ClientWithTabsAndLoader = () => {
      if (isLoaded) {
        return <ClientWithTabs />
      } else {
        return (
          <section className="page">
            <QueueAnim type="bottom" className="ui-animate">
              <div key="1" className="loader-container">
                <Loader />
              </div>
            </QueueAnim>
          </section>
        )
      }
    };

    return(
      <ClientWithTabsAndLoader />
    );
  }
}

export default Client;
