import React from 'react';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { UITIMELINE } from 'constants/uiComponents'
import Profile from './Profile';

const EXAMPLEPAGE = UITIMELINE[1].path;

const TabContent1 = ( {profile} ) => (
  <div className="container-fluid">
    <Profile profile={profile} />
    <div className="callout callout-info">
      <p>Page with Tabs takes advantage of <code>Tabs</code> component API</p>
    </div>
    <div className="callout callout-success">
      <p>To see in action, check out <Link to={EXAMPLEPAGE}>Timeline page</Link></p>
    </div>
  </div>
)

const TabContent2 = () => (
  <div className="container-fluid container-mw-md">
    <div className="callout callout-warning">
      <p>You can change container max-width with <code>.container-mw-</code> utility class</p>
    </div>
  </div>
)

const TabContent3 = () => (
  <div className="container-fluid"><div className="article-title-style text-secondary">Blank 3</div></div>
)

class Client extends React.Component {

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
    const { client } = this.props.location.state;
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
              <TabContent1 profile={client.profile}/>
              <TabContent2 />
              <TabContent3 />
            </SwipeableViews>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

export default Client;
