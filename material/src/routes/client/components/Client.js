import React from 'react';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { UITIMELINE } from 'constants/uiComponents'
import Profile from './Profile';
import Note from './Note';
import TaskList from '../../task/components/TaskList';

const EXAMPLEPAGE = UITIMELINE[1].path;


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
  constructor() {
    super();
    this.state = {
      notes: [],
      todos: [],
      error: null,
      isLoaded: false
    }
  }



  componentDidMount() {
    const { client } = this.props.location.state;
    fetch("https://api.cooby.co/clients/" + client.profile.id + "/notes/", {
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
            isLoaded: true,
            notes: result.notes
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { client, config, handlers } = this.props.location.state;
    const { value } = this.state;

    return(
      <section className="page-with-tabs">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="page-header-title"> {client.profile.name} </div>
          </div>

          <div key="2">
            <Tabs value={value} onChange={this.handleChange} className="page-tabs">
              <Tab label="基本資料" />
              <Tab label="會議記錄" />
              <Tab label="待辦事項" />
            </Tabs>
            <SwipeableViews
              index={value}
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
  }
}

export default Client;
