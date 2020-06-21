import React from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from 'components/MaterialIcon';
import QueueAnim from 'rc-queue-anim';
import TaskList from './TaskList';
import COMPONENTS from 'constants/uiComponents';
import APPCONFIG from 'constants/appConfig';

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}


// let sortedComponents = COMPONENTS.sort(compare).filter(el => !el.hideInOverview && !el.children);
// console.log(sortedComponents);

const Cover = () => (
  <section className="cover border-bottom">
    <div className="cover-bg-img d-none d-md-block" style={{backgroundImage: 'url(assets/images-demo/covers/leone-venter-559377-cut.jpg)'}}></div>
    <div className="container-fluid container-mw-xl">
      <div className="row">
        <div className="col-md-6 col-lg-5">
          <h1>管理你所有的待辦事項</h1>
          <p className="lead">{APPCONFIG.brand} 幫助你輕鬆管理待辦事項</p>
          <div className="divider divider-short divider-bold border-primary my-4"></div>
          <p>一如反掌</p>
        </div>
      </div>
    </div>
  </section>
);

const TaskListPage = () => {
  return(
    <div>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Cover /> </div>
      </QueueAnim>

      <section className="container-fluid page-dashboard no-breadcrumb">
        <QueueAnim type="bottom" className="ui-animate">
          <TaskList />
        </QueueAnim>
      </section>
    </div>
  )
}

export default TaskListPage;
